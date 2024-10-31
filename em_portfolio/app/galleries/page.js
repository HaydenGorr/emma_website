'use client';
import { useEffect, useState, useRef, use } from "react";
import Image from "next/image";
import { get_portfolio_images } from "../utils/api";
import Masonry from 'react-masonry-css';
import GalleryImageContainer from "./components/gallery_image_container";
import { animated, useSpring} from '@react-spring/web'
import SearchChip from "./components/search_chip";
import AnimatedBar from './components/animated_bar';
import MediumFilter from "./components/medium_filter";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import ImageSkeleton from "../components/image_skeleton";
import { getFullImageUrl, getDisplayImageUrl } from "../utils/getimageurl";

export default function Galleries() {

const Themes_chips = ["Christianity", "Femininity", "Gender Neutralism", "Experimentalism", "Realism"]
const Medium_chips = ["painting", "drawing", "sculpture", "digital", "print", "mixed"]
const [selected_themes, set_selected_theme] = useState([]);
const [selected_mediums, set_selected_medium] = useState([]);

const [images, set_images] = useState([]);
const [showdesc, set_showdesc] = useState(null);
const [loading, set_loading] = useState(true);

// const [loadingLevel, set_loadingLevel] = useState(1);

const scrollLimitRef = useRef(0);
const loadingLevelRef = useRef(1);

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

const springs2 = useSpring({
	from: { opacity: 0.5 },
	to: !loading ? { opacity: 1 } : { opacity: 0.5 },
});

const loadingSpring = useSpring({
	from: { opacity: 1 },
	to: !loading ? { opacity: 0 } : { opacity: 1 },
	config: { duration: 500 }
});

// const handlescroll = () => { 
// 	const scrollheight = (window.scrollY + window.innerHeight)

// 	console.log(scrollheight - scrollLimit)

// 	if (scrollheight > scrollLimit && (scrollheight / document.documentElement.scrollHeight) >= 0.75){
// 		set_loadingLevel(loadingLevel+1)
// 		set_scrollLimit(document.documentElement.scrollHeight)
// 		FetchImages(loadingLevel+1)
// 	}
// }

const handlescroll = () => {
    const scrollheight = window.scrollY + window.innerHeight;
	console.log(scrollLimitRef.current)
    if (
      scrollheight > scrollLimitRef.current &&
      scrollheight / document.documentElement.scrollHeight >= 0.75
    ) {
		const newLoadingLevel = loadingLevelRef.current + 1;
        FetchImages(newLoadingLevel);
		loadingLevelRef.current = newLoadingLevel
		scrollLimitRef.current = document.documentElement.scrollHeight;
    }
  };

useEffect(() => {

	if (loading) return

	setTimeout(() => {
	set_show_images(true)
	}, 500)

}, [loading]);

useEffect(() => {
	window.addEventListener('scroll', handlescroll, { passive: true });

	FetchImages()

	return () => {
		window.removeEventListener('scroll', handlescroll);
	};
}, [])

const adjust_filter = (themes=null, mediums=null) => {
	if (themes) {set_selected_theme(themes)}
	if (mediums) {set_selected_medium(mediums)}
	loadingLevelRef.current = 1
	scrollLimitRef.current = 0
	console.log("sugar")
	FetchImages(1, themes ? themes : selected_themes, mediums ? mediums : selected_mediums)
}

const FetchImages = (inloadingLevel=loadingLevelRef.current, inselected_themes=selected_themes, inselected_mediums=selected_mediums) => {

	console.log(inloadingLevel, inselected_themes, inselected_mediums)

	// if (inloadingLevel < 2) set_loading(true)
	get_portfolio_images(inloadingLevel, inselected_themes, inselected_mediums, (data) => {

		var formattedImages = []

		for (let image_obj of data) {
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

		set_images([...inloadingLevel==1 ? [] : images, ...formattedImages]);
		set_loading(false)
		console.log("loading false")
	});
}




// useEffect(() => {

//   console.log("optimise", selected_themes, selected_mediums)

//   set_loadingLevel(1)
//   set_scrollLimit(0)
//   get_portfolio_images(loadingLevel, selected_themes, selected_mediums, (data) => {

//     var formattedImages = []
//     for (let image_obj of data) {
//       formattedImages.push({
//         title: image_obj?.Title || 'No title available',
//         date: image_obj?.updatedAt || 'No date available',
//         description: image_obj?.description || 'No description available',
//         medium: image_obj?.medium_theme?.medium || 'uncategorised',
//         theme: image_obj?.medium_theme?.theme || 'uncategorised',
//         image_urls: {
//           size_display: `${process.env.NEXT_PUBLIC_BASE_URL}/${getDisplayImageUrl(image_obj)}`,
//           size_full: `${process.env.NEXT_PUBLIC_BASE_URL}/${getFullImageUrl(image_obj)}`
//         }
//       })
//     }

//     set_images([...formattedImages]);
//     set_loading(false)
//   });
// }, [selected_mediums, selected_themes]);

const breakpointColumnsObj = {
	default: 3,
	1100: 2,
	700: 1
};

const set_clicked_image = (index) =>{
	show_description_callback(!showdesc ? index : null)
}

const [newBars, setnewBars] = useState(false);

useEffect(() => {
	const handleScroll = () => {
	const currentScrollY = window.scrollY;

	if (currentScrollY >= 300) {
		setnewBars(true)
	}
	};

	window.addEventListener("scroll", handleScroll);

	return () => {
	window.removeEventListener("scroll", handleScroll);
	};
}, []);

return (
	<div className="h-full flex flex-col w-full items-center overflow-y-scroll relative overflow-hidden hide-scroll">

	<div className="absolute flex space-x-16 -translate-x-40">
		<AnimatedBar colour="bg-sweet-corn-400" delay={0} angle={"-rotate-45"} direction={"right"}/>
		<AnimatedBar colour="bg-pancho-400" delay={200} angle={"-rotate-45"} direction={"right"}/>
		<AnimatedBar colour="bg-perfume-400" delay={400} angle={"-rotate-45"} direction={"right"}/>
	</div>

	<p className='md:text-5xl sm:text-5xl text-4xl font-extrabold font-header py-20 lg:py-20 sticky '>Gallery</p>

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
			<animated.div key={index} className="w-full flex items-center px-8 pb-16" style={{...springs}}>
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
