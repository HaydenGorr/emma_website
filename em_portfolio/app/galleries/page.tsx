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
import PinnedGalleryImageContainer from "./components/pinned_gallery_image_container";
import SizeButton from "./components/size_button";

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
	pinned: boolean;
}

enum gallery_size {
	small,
	medium,
	large,
	none
}

export default function Galleries() {

const Themes_chips = ["Christianity", "Femininity", "Gender Neutralism", "Experimentalism", "Realism"]
const Medium_chips = ["painting", "drawing", "sculpture", "digital", "print", "mixed"]
const [selected_themes, set_selected_theme] = useState([]); // For filtering
const [selected_mediums, set_selected_medium] = useState([]); // For filtering

const [images, set_images] = useState<ImageProps[]>([]);
const [pinned_images, set_pinned_images] = useState<ImageProps[]>([]);
const [loading, set_loading] = useState(true);
const [expand, set_expand] = useState<number>(-1); 

const [user_pref_gallery_size, set_user_pref_gallery_size] = useState<gallery_size>(gallery_size.large); 
const [gallery_size_hover, set_gallery_size_hover] = useState<gallery_size>(gallery_size.none); 

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

  const size_button_springs = useSpring({
	from: { scale: 1 },
	to: show_images ? { opacity: 1.03 } : { opacity: 0 },
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

	FetchPinnedImages()
	FetchImages()

	// Attach the scroll handler
	window.addEventListener('scroll', handlescroll, { passive: true });
	return () => {
		window.removeEventListener('scroll', handlescroll);
	};

}, []);

const adjust_filter = (themes:string[]=[], mediums:string[]=[]) => {
	if (themes) {set_selected_theme(themes)}
	if (mediums) {set_selected_medium(mediums)}

	themes_for_searching.current = themes || [];
	mediums_for_searching.current = mediums || [];

	loadingLevelRef.current = 1
	scrollLimitRef.current = 0
	FetchPinnedImages();
	FetchImages()
}

const process_image_fetch_request = (result_data)  => {
	var formattedImages:ImageProps[] = []
	for (let image_obj of result_data) {
		formattedImages.push({
			id: image_obj.medium_theme?.id, // for some reasing the correct image id is in medium_theme
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
			width: image_obj.Image.width,
			pinned: image_obj.pinned == true,
		})
	}
	return formattedImages
}

const FetchPinnedImages = () => {
	get_portfolio_images(1, themes_for_searching.current, mediums_for_searching.current, true, (res) => {
		set_pinned_images(process_image_fetch_request(res.data));
	});
}

const FetchImages = (inloadingLevel=loadingLevelRef.current) => {

	fetchingRef.current = true

	const isFirstLoad = inloadingLevel === 1;

	get_portfolio_images(inloadingLevel, themes_for_searching.current, mediums_for_searching.current, false, (res) => {
		if (isFirstLoad) maxloadingLevelRef.current = res.meta.pagination.pageCount

		var formattedImages:ImageProps[] = process_image_fetch_request(res.data)

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

const getColumnBreakpoints = () => {
	switch (user_pref_gallery_size) {
		case gallery_size.large:
			return {
				default: 3,
				1100: 2,
				700: 1
			};
		case gallery_size.medium:
			return {
				default: 4,
				1100: 3,
				700: 2
			};
		case gallery_size.small:
			return {
				default: 5,
				1100: 4,
				700: 3
			};
		default:
			return {
				default: 3,
				1100: 2,
				700: 1
			};
	}
}

const setImageRef = (index: number, elem:HTMLImageElement) => {
    if (elem) {
      imageRefs.current[index] = elem;
    }
};

const getgallerySizebutton = (size: gallery_size) => {
	// const image = size == gallery_size.large ? "l" : size == gallery_size.medium ? "m" : "s"
	// const colour = size == gallery_size.large ? "bg-matisse-200" : size == gallery_size.medium ? "bg-hibiscus-200" : "bg-magic-mint-200"
	// return (
	// 	<animated.button 
	// 		style={}
	// 		className={`${colour} p-4 h-12 w-12 flex justify-center rounded-full ${user_pref_gallery_size == size ? "shadow-strong": "shadow-sm"}`}
	// 		onClick={ () => set_user_pref_gallery_size(size)}
	// 		onMouseOver={()=>{set_gallery_size_hover(size)}}
	// 		onMouseOut={()=>{set_gallery_size_hover(size)}}>
	// 			<Image className="self-center" src={`/icons/${image}.png`} width={20} height={20} alt=""></Image>
	// 	</animated.button>
	// )
}

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

		<animated.div className="w-full flex items-center justify-center z-50 my-8 space-x-4" style={springs}>
			{/* {getgallerySizebutton(gallery_size.large)}
			{getgallerySizebutton(gallery_size.medium)}
			{getgallerySizebutton(gallery_size.small)} */}
			<SizeButton
				onClick={()=>{set_user_pref_gallery_size(gallery_size.large)}}
				size={gallery_size.large}
				isSelected={user_pref_gallery_size==gallery_size.large}/>
			<SizeButton
				onClick={()=>{set_user_pref_gallery_size(gallery_size.medium)}}
				size={gallery_size.medium}
				isSelected={user_pref_gallery_size==gallery_size.medium}/>
			<SizeButton
				onClick={()=>{set_user_pref_gallery_size(gallery_size.small)}}
				size={gallery_size.small}
				isSelected={user_pref_gallery_size==gallery_size.small}/>
		</animated.div>

		{!loading && images.length > 0 && <div className="hide-scroll pt-20 w-full z-50" style={{maxWidth: '80rem'}}>
			
			<div>
				<div className="w-full flex justify-center">
					<Title delay={500} className={"md:text-3xl sm:text-2xl text-3xl my-8 lg:my-8 pb-6"} text={"Pinned"}/>
				</div>
				<Masonry
					breakpointCols={getColumnBreakpoints()}
					className="my-masonry-grid flex justify-center w-full pl-3">
					{pinned_images.map((val, index) => (
					<animated.div key={val.id} className="w-full flex items-center px-8 pb-16 h-fit relative" style={{...springs}}>
						<PinnedGalleryImageContainer {...val} 
						setRef={(elem) => setImageRef(index, elem)}
						onClick={() => { set_expand(index) }}/>
					</animated.div>
					))}
				</Masonry>
			</div>

			{/** rest of gallery */}
			{pinned_images.length > 0 && <div className="w-full flex justify-center">
				<Title delay={500} className={"md:text-3xl sm:text-2xl text-3xl my-8 lg:my-8 pb-6"} text={"rest of gallery"}/>
			</div>}
			<Masonry
				breakpointCols={getColumnBreakpoints()}
				className="my-masonry-grid flex justify-center w-full pl-3">
				{images.map((val, index) => (
				<animated.div key={val.id} className="w-full flex items-center px-8 pb-16 h-fit relative" style={{...springs}}>
					<GalleryImageContainer {...val} 
					setRef={(elem) => setImageRef(index, elem)}
					onClick={() => { set_expand(index) }}/>
				</animated.div>
				))}
			</Masonry>
		</div>}
	</div>
);
}
