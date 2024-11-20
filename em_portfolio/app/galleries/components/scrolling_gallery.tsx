'use client';
import { useEffect, useState, useRef } from "react";
import Masonry from 'react-masonry-css';
import GalleryImageContainer from "../components/gallery_image_container";
import { animated, useSpring} from '@react-spring/web'
import Title from "../../components/title"

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

interface image_object {
	[id: number]: ImageProps 
}

enum gallery_size {
	small,
	medium,
	large,
	none
}

interface props {

	colBreakpoints: {
		default?: number;
		[key: number]: number;
	}
	fetch_images_callback: (
		loadingLevel: number,
		setter: (fetchedItems: image_object, maxPages: number) => void
	) => void;
	className?: string;
	title: string
}



export default function ScrollingGallery( {title, colBreakpoints, className, fetch_images_callback} : props ) {

const [fetched_images, set_fetched_images] = useState<image_object>({});

const scrollLimitRef = useRef(0);
const loadingLevelRef = useRef(1); // The current page we have loaded. Will incriment
const maxloadingLevelRef = useRef(1); // The current page we have loaded. Will incriment. 1 is initial value
const fetchingRef = useRef(false); // The current page we have loaded. Will incriment

const grab_images_lambda = () => {
	fetch_images_callback(loadingLevelRef.current, (fetchedItems: image_object, max_pages:number) => {
		set_fetched_images((prevImages: image_object) => {
			maxloadingLevelRef.current = max_pages
			return {...fetchedItems, ...prevImages };
		});
	});
  };
  

  useEffect(()=>{
  }, [fetched_images])

// Load new images when scroll reaches 75% of screen
const handlescroll = () => {

    const scrollheight = window.scrollY + window.innerHeight;
	const scroll_decimal = scrollheight / document.documentElement.scrollHeight

	console.log(
		loadingLevelRef.current < maxloadingLevelRef.current,
		!fetchingRef.current,
		scrollheight > scrollLimitRef.current,
		scroll_decimal >= 0.75
	)

    if (
		loadingLevelRef.current < maxloadingLevelRef.current && // Are there any more image loads left to do?	
		!fetchingRef.current &&  // Are we currently fetching images? 
		scrollheight > scrollLimitRef.current && // Are we past the buffer zone set during the last load
		scroll_decimal >= 0.75 // Have we scrolled 75% of the page?
    ) {
		loadingLevelRef.current = loadingLevelRef.current + 1
		grab_images_lambda()
		scrollLimitRef.current = document.documentElement.scrollHeight * 0.75;
    }
};

useEffect(() => {

	grab_images_lambda()

	window.addEventListener('scroll', handlescroll, { passive: true });
	return () => {
		window.removeEventListener('scroll', handlescroll);
	};

}, []);

return (
	<div className={`h-full flex flex-col w-full relative overflow-hidden hide-scroll ${className}`}>
		<div>
			<div className="w-full flex justify-center">
				<Title delay={500} className={"md:text-3xl sm:text-2xl text-3xl my-8 lg:my-8 pb-6"} text={title}/>
			</div>
			<Masonry
				breakpointCols={colBreakpoints}
				className="my-masonry-grid flex justify-center w-full pl-3">

				{Object.values(fetched_images).reverse().map((val, index) => (
				<animated.div key={val.id} className="w-full flex items-center px-8 pb-16 h-fit relative">
					<GalleryImageContainer {...val} setRef={()=>{}} onClick={()=>{}}/>
				</animated.div>
				))}
				
			</Masonry>
		</div>
	</div>
	);
}
