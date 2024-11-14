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

export default function Galleries() {

const Themes_chips = ["Christianity", "Femininity", "Gender Neutralism", "Experimentalism", "Realism"]
const Medium_chips = ["painting", "drawing", "sculpture", "digital", "print", "mixed"]
const [selected_themes, set_selected_theme] = useState([]); // For filtering
const [selected_mediums, set_selected_medium] = useState([]); // For filtering

const [images, set_images] = useState([]);
const [showdesc, set_showdesc] = useState(null);
const [loading, set_loading] = useState(true);

// const [loadingLevel, set_loadingLevel] = useState(1);

const scrollLimitRef = useRef(0);
const loadingLevelRef = useRef(1); // The current page we have loaded. Will incriment
const maxloadingLevelRef = useRef(1); // The current page we have loaded. Will incriment. 1 is initial value
const fetchingRef = useRef(false); // The current page we have loaded. Will incriment

/** Used to show images once they've loaded
 * The loaded state var won't do because it toggled on load
 * But we want to animate the transition, so using loaded
 * will make the gui snap from loading to loaded states
 */
const [show_images, set_show_images] = useState(false); 

const springs = useSpring({
	from: { opacity: 0 },
	to: show_images ? { opacity: 1 } : { opacity: 0 },
	config: { duration: 500 }
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
	  scroll_decimal >= 0.75 && // Have we scrolled 75% of the page?
	  loadingLevelRef.current < maxloadingLevelRef.current // Are there any more image loads left to do?
    ) {
		const newLoadingLevel = loadingLevelRef.current + 1;
        FetchImages(newLoadingLevel, selected_themes, selected_mediums);
		loadingLevelRef.current = newLoadingLevel
		scrollLimitRef.current = document.documentElement.scrollHeight;
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

useEffect(() => {
	FetchImages()
}, [selected_themes, selected_mediums]);

const adjust_filter = (themes=null, mediums=null) => {
	if (themes) {set_selected_theme(themes)}
	if (mediums) {set_selected_medium(mediums)}
	loadingLevelRef.current = 1
	scrollLimitRef.current = 0
}

const FetchImages = (inloadingLevel=loadingLevelRef.current, inselected_themes=selected_themes, inselected_mediums=selected_mediums) => {

	fetchingRef.current = true

	const isFirstLoad = inloadingLevel === 1;

	get_portfolio_images(inloadingLevel, inselected_themes, inselected_mediums, (res) => {
		if (isFirstLoad) maxloadingLevelRef.current = res.meta.pagination.pageCount

		var formattedImages = []

		for (let image_obj of res.data) {
		formattedImages.push({
			title: image_obj?.Title || 'No title available',
			date: image_obj?.updatedAt || 'No date available',
			description: image_obj?.description || 'No description available',
			medium: image_obj?.medium_theme?.medium || 'uncategorised',
			theme: image_obj?.medium_theme?.theme || 'uncategorised',
			image_urls: {
			size_display: `${process.env.NEXT_PUBLIC_BASE_URL}/${getDisplayImageUrl(image_obj)}`,
			size_full: `${process.env.NEXT_PUBLIC_BASE_URL}/${getFullImageUrl(image_obj)}`
			}
		})
		}

		set_images((prevImages) => {
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

return (
	<div className="h-full flex flex-col w-full items-center overflow-y-scroll relative overflow-hidden hide-scroll -translate-y-">

	<p className='md:text-5xl sm:text-5xl text-4xl font-extrabold py-20 lg:py-20 z-50'>Gallery</p>

	<div className="filters flex flex-col space-y-8 text-lg font-medium max-w-prose w-full px-4 z-50 ">
		{!show_images && <animated.div style={{...loadingSpring}} className="space-y-8">
		<ImageSkeleton h={"h-16"}></ImageSkeleton>
		<ImageSkeleton h={"h-16"}></ImageSkeleton>
		</animated.div>}

		{show_images && <div style={{...springs}} className="space-y-8">
			<MediumFilter chips={Medium_chips} adjust_filter={(data) => {adjust_filter(null, data)}} selected_items={selected_mediums} bg_clour={"bg-pancho-300"} unselected={"bg-pancho-200"} selected={"bg-pancho-400"}/>
			<MediumFilter chips={Themes_chips} adjust_filter={(data) => {adjust_filter(data)}} selected_items={selected_themes} bg_clour={"bg-perfume-300"} unselected={"bg-perfume-200"} selected={"bg-perfume-400"}/>
		</div>}

	</div>

	<div className="pb-36 hide-scroll pt-20 w-full z-50" style={{maxWidth: '80rem'}}>
		<Masonry
			breakpointCols={breakpointColumnsObj}
			className="my-masonry-grid flex justify-center w-full pl-3">
			{show_images ? images.map((val, index) => (
			<animated.div key={index} className="w-full flex items-center px-8 pb-4" style={{...springs}}>
				<GalleryImageContainer {...val} show_description_callback={set_showdesc} showdesc={showdesc == index} />
			</animated.div>
			)) :
			
			[1,2,3,4,5,6].map((val, index) => (
			<animated.div key={index} className="w-full flex items-center justify-center px-8 pb-16"
			style={{...loadingSpring}}>
				<ImageSkeleton  h={"h-80"} />
			</animated.div>
			))

			}
		</Masonry>
	</div>
	</div>
);
}
