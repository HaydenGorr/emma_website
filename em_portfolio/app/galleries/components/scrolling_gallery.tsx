'use client';
import { useEffect, useState, useRef } from "react";
import Masonry from 'react-masonry-css';
import GalleryImageContainer from "../components/gallery_image_container";
import { animated } from '@react-spring/web'
import Title from "../../components/title"
import { ImageProps } from '../../utils/gallery_helpers'
import { gallery_type_enum } from "../../interfaces";

interface props {

	colBreakpoints: {
		default?: number;
		[key: number]: number;
	}
	fetch_images_callback: (
		loadingLevel: number,
		setter: (fetchedItems: ImageProps[], maxPages: number) => void
	) => void;
	className?: string;
	title: string;
	gallery_type: gallery_type_enum;
	on_img_click?: (image_obj: ImageProps) => void;
	perform_refresh: Boolean;
}



export default function ScrollingGallery( {title, gallery_type, colBreakpoints, className, perform_refresh, fetch_images_callback, on_img_click=() =>{}} : props ) {

const [fetched_images, set_fetched_images] = useState<ImageProps[]>([]);

const scrollLimitRef = useRef(0);
const loadingLevelRef = useRef(1); // The current page we have loaded. Will incriment
const maxloadingLevelRef = useRef(1); // The current page we have loaded. Will incriment. 1 is initial value
const fetchingRef = useRef(false); // The current page we have loaded. Will incriment

const clearImagesFlag = useRef(false); // The current page we have loaded. Will incriment
const containerRef = useRef(null); // The current page we have loaded. Will incriment

const grab_images_lambda = () => { 
	fetchingRef.current = true
	fetch_images_callback(loadingLevelRef.current, (fetchedItems: ImageProps[], max_pages: number) => {
		set_fetched_images((prevImages: ImageProps[]) => {

			maxloadingLevelRef.current = max_pages
			var return_val = []
			if (clearImagesFlag.current){
				clearImagesFlag.current = false
				return_val = [...fetchedItems]
			}else {
				return_val = [...prevImages, ...fetchedItems ];
			}
			fetchingRef.current = false

			return return_val
		});
	});
};

useEffect(()=>{
clearImagesFlag.current = true
loadingLevelRef.current = 1
grab_images_lambda()
}, [perform_refresh])

// useEffect(()=>{
// 	console.log(fetched_images.length)
// 	}, [fetched_images])

// Load new images when scroll reaches 75% of screen
const handlescroll = () => {
    const scrollheight = window.scrollY + window.innerHeight;
	const distance_down = containerRef.current?.getBoundingClientRect().top
	const scroll_decimal = scrollheight / (containerRef.current?.offsetHeight + distance_down)
	scrollLimitRef.current = (containerRef.current?.offsetHeight * 0.75) + distance_down;

	// console.log(loadingLevelRef.current < maxloadingLevelRef.current,
	// 	!fetchingRef.current,
	// 	scrollheight > scrollLimitRef.current,
	// 	scroll_decimal >= 0.75)

    if (
		loadingLevelRef.current < maxloadingLevelRef.current && // Are there any more image loads left to do?	
		!fetchingRef.current &&  // Are we currently fetching images? 
		scrollheight > scrollLimitRef.current && // Are we past the buffer zone set during the last load
		scroll_decimal >= 0.75 // Have we scrolled 75% of the page?
    ) {
		loadingLevelRef.current = loadingLevelRef.current + 1
		grab_images_lambda()
    }
};

useEffect(() => {

	window.addEventListener('scroll', handlescroll, { passive: true });
	return () => {
		window.removeEventListener('scroll', handlescroll);
	};

}, []);

return (
	<div className={`h-full flex flex-col w-full relative overflow-hidden hide-scroll ${className}`}>
		{fetched_images.length > 0 && <div ref={containerRef}>
			<div className="w-full flex justify-center">
				<Title delay={500} className={"md:text-3xl sm:text-2xl text-3xl my-8 lg:my-8 pb-6"} text={title}/>
			</div>
			<Masonry
				breakpointCols={colBreakpoints}
				className="my-masonry-grid flex justify-center w-full pl-3">

				{fetched_images.map((val, index) => (
				<animated.div key={val.id} className="w-full flex items-center px-8 pb-16 h-fit relative">
					<GalleryImageContainer {...val} onClick={()=> (on_img_click(val))}/>
				</animated.div>
				))}
				
			</Masonry>
		</div>}
	</div>
	);
}
