'use client';
import { useEffect, useState, useRef, use } from "react";
import Image from "next/image";
import { get_portfolio_images } from "../utils/api";
import Masonry from 'react-masonry-css';
import GalleryImageContainer from "./components/gallery_image_container";
import { animated, useSpring} from '@react-spring/web'
import SearchChip from "./components/search_chip";
import MediumFilter from "./components/medium_filter";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import ImageSkeleton from "../components/image_skeleton";
import { getFullImageUrl, getDisplayImageUrl } from "../utils/getimageurl";
import Title from "../components/title"
import FullDisplay from './components/full_display'

interface ImageProps {
	id: number;
	title: string;
	date: Date;
	description: string;
	medium: string;
	theme: string;
	image_urls: {
		size_display: string;
		size_full: string;
	},
	aspect_ratio: number;
	width: number;
}

export default function Galleries() {

const Themes_chips = ["Christianity", "Femininity", "Gender Neutralism", "Experimentalism", "Realism"]
const Medium_chips = ["painting", "drawing", "sculpture", "digital", "print", "mixed"]
const [selected_themes, set_selected_theme] = useState([]); // For filtering
const [selected_mediums, set_selected_medium] = useState([]); // For filtering

const [images, set_images] = useState<ImageProps[]>([]);
const [showdesc, set_showdesc] = useState(null);
const [loading, set_loading] = useState(true);
const [expand, set_expand] = useState<number>(-1); 

// const [loadingLevel, set_loadingLevel] = useState(1);

const scrollLimitRef = useRef(0);
const loadingLevelRef = useRef(1); // The current page we have loaded. Will incriment
const maxloadingLevelRef = useRef(1); // The current page we have loaded. Will incriment. 1 is initial value
const fetchingRef = useRef(false); // The current page we have loaded. Will incriment
const themes_for_searching = useRef<string[]>([]); // The current page we have loaded. Will incriment
const mediums_for_searching = useRef<string[]>([]); // The current page we have loaded. Will incriment

const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

/** Used to show images once they've loaded
 * The loaded state var won't do because it toggled on load
 * But we want to animate the transition, so using loaded
 * will make the gui snap from loading to loaded states
 */
const [show_images, set_show_images] = useState(false); 

const springs = useSpring({
	from: { opacity: 0 },
	to: show_images ? { opacity: 1 } : { opacity: 0 },
	config: { duration: 500 },
  });  

const loadingSpring = useSpring({
	from: { opacity: 1 },
	to: !loading ? { opacity: 0 } : { opacity: 1 },
	config: { duration: 500 }
});

// Load new images when scroll reaches 75% of screen
const handlescroll = () => {

    const scrollheight = window.scrollY + window.innerHeight;
	const scroll_decimal = scrollheight / document.documentElement.scrollHeight

    if (
      !fetchingRef.current &&  // Are we currently fetching images? 
	  scrollheight > scrollLimitRef.current && // Are we past the buffer zone set during the last load
	  scroll_decimal >= 0.50 && // Have we scrolled 75% of the page?
	  loadingLevelRef.current < maxloadingLevelRef.current // Are there any more image loads left to do?
    ) {
		const newLoadingLevel = loadingLevelRef.current + 1;
        FetchImages(newLoadingLevel);
		loadingLevelRef.current = newLoadingLevel
		scrollLimitRef.current = document.documentElement.scrollHeight * 0.75;
    }
};

useEffect(() => {

	if (loading) return

	// Fade in the images
	setTimeout(() => {
		set_show_images(true)
	}, 500)

}, [loading]);

useEffect(() => {

	FetchImages()

	// Attach the scroll handler
	window.addEventListener('scroll', handlescroll, { passive: true });
	return () => {
		window.removeEventListener('scroll', handlescroll);
	};

}, []);

// useEffect(() => {
// 	console.log("changed")
// 	loadingLevelRef.current = 1
// 	scrollLimitRef.current = 0
// 	FetchImages()
// }, [selected_themes, selected_mediums]);

const adjust_filter = (themes:string[]=[], mediums:string[]=[]) => {
	if (themes) {set_selected_theme(themes)}
	if (mediums) {set_selected_medium(mediums)}

	themes_for_searching.current = themes || [];
	mediums_for_searching.current = mediums || [];

	loadingLevelRef.current = 1
	scrollLimitRef.current = 0
	FetchImages()
}

const FetchImages = (inloadingLevel=loadingLevelRef.current) => {

	fetchingRef.current = true

	const isFirstLoad = inloadingLevel === 1;


	console.log("yep ", themes_for_searching, mediums_for_searching)

	get_portfolio_images(inloadingLevel, themes_for_searching.current, mediums_for_searching.current, (res) => {
		if (isFirstLoad) maxloadingLevelRef.current = res.meta.pagination.pageCount

		var formattedImages:ImageProps[] = []

		console.log(res.data)

		for (let image_obj of res.data) {
			formattedImages.push({
				id: 2,
				title: image_obj?.Title || 'No title available',
				date: image_obj?.updatedAt || 'No date available',
				description: image_obj?.description || 'No description available',
				medium: image_obj?.medium_theme?.medium || 'uncategorised',
				theme: image_obj?.medium_theme?.theme || 'uncategorised',
				image_urls: {
					size_display: `${process.env.NEXT_PUBLIC_BASE_URL}/${getDisplayImageUrl(image_obj)}`,
					size_full: `${process.env.NEXT_PUBLIC_BASE_URL}/${getFullImageUrl(image_obj)}`
				},
				aspect_ratio: image_obj.Image.width/image_obj.Image.height,
				width: image_obj.Image.width
			})
		}

		set_images((prevImages: ImageProps[]) => {
			const finalArray = isFirstLoad ? [] : [...prevImages];
			return [...finalArray, ...formattedImages];
		});

		set_loading(false)
	});
	fetchingRef.current = false
}

// For the masonry gallery
const breakpointColumnsObj = {
	default: 3,
	1100: 2,
	700: 1
};

const setImageRef = (index: number, elem:HTMLImageElement) => {
    if (elem) {
      imageRefs.current[index] = elem;
    }
};

return (
	<div className="h-full flex flex-col w-full items-center overflow-y-scroll relative overflow-hidden hide-scroll">

		{expand > -1 && <FullDisplay 
			close={() => { set_expand(-1) }}
			url={images[expand].image_urls.size_full}
			already_loaded={imageRefs.current[expand].complete}
			title={images[expand].title}
			description={images[expand].description}
			medium={images[expand].medium}
			theme={images[expand].theme}
			old_url={images[expand].image_urls.size_display}/>}
	
		<Title text={"Gallery"}/>

		<div className="filters flex flex-col space-y-8 text-lg font-medium max-w-prose w-full px-4 z-50 ">
			<animated.div style={springs} className="space-y-8">
				<MediumFilter chips={Medium_chips} adjust_filter={(data) => {adjust_filter(null, data)}} border_colour={"border-pancho-400"} selected_items={selected_mediums} bg_clour={"bg-pancho-300"} unselected={"bg-pancho-200"} selected={"bg-pancho-400"}/>
				<MediumFilter chips={Themes_chips} adjust_filter={(data) => {adjust_filter(data)}} border_colour={"border-perfume-400"} selected_items={selected_themes} bg_clour={"bg-perfume-300"} unselected={"bg-perfume-200"} selected={"bg-perfume-400"}/>
			</animated.div>

		</div>

		<div className="hide-scroll pt-20 w-full z-50" style={{maxWidth: '80rem'}}>
			<Masonry
				breakpointCols={breakpointColumnsObj}
				className="my-masonry-grid flex justify-center w-full pl-3">
				{images.map((val, index) => (
				<animated.div key={val.id} className="w-full flex items-center px-8 pb-16 h-fit relative" style={{...springs}}>
					<GalleryImageContainer {...val} 
					setRef={(elem) => setImageRef(index, elem)}
					onClick={() => { set_expand(index) }}/>
				</animated.div>
				))}
			</Masonry>
		</div>
	</div>
);
}
