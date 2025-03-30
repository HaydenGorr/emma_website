'use client';
import { useState, useRef, useEffect } from "react";
import { animated, useSpring} from '@react-spring/web'
import MediumFilter from "../components/medium_filter";
import Title from "../../components/title"
import FullDisplay from '../components/full_display'
import SizeButton from "../components/size_button";
import ScrollingGallery from "../components/scrolling_gallery";
import { get_images } from "../../utils/gallery_helpers";
import {porfolio_return_type, ImageProps} from '../../utils/gallery_helpers';
import { gallery_type_enum, all_standard_types } from "../../interfaces";

enum gallery_size {
	small,
	medium,
	large,
	none
}

export default function DisplayPage({ gallery_type }) {

const standard_gallery_sort_chips = ["Digital", "Sculpture", "Drawing"] 

const [selected_sort_chip, set_sort_chip] = useState(""); // For filtering

const [selected_image, set_selected_image] = useState<ImageProps|null>(null);
const [perform_refresh, set_perform_refresh] = useState(true);

const [user_pref_gallery_size, set_user_pref_gallery_size] = useState<gallery_size>(gallery_size.large); 

/**
 * This useRef is empty to reflect no specified filter on page load
 * 
 * If the user has selected an alternative gallery like dolls or makeup
 * then the doll or makeup filter is applied
 * 
 * GALLERY: STANDARD
 * 
 */
const sort_chip_for_searching = useRef<string>("");

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
	from: { opacity: 0 },
	to: show_images ? { opacity: 1 } : { opacity: 0 },
	config: { duration: 500 }
});

const adjust_filter = ( sort:string ) => {

	if (gallery_type != gallery_type_enum.standard) return

	if (sort !== null) {
		const set_val: string = sort_chip_for_searching.current == sort.toLowerCase() ? "" : sort.toLowerCase()

		set_sort_chip(set_val)
		sort_chip_for_searching.current = set_val
	}

	set_perform_refresh(!perform_refresh)
}

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

const get_page_title = ()=>{
	switch(gallery_type){
		case (gallery_type_enum.doll):
			return "Doll"
		case (gallery_type_enum.graphic_design_and_packaging):
			return "Graphic Design and Packaging"
		case (gallery_type_enum.standard):
			return ""
		default:
			return ""
	}
}

/**
 * This is used to overwrite the filter for get_images() if the gallery
 * iss not standard
 */
const get_filters_for_gallery_type = (): string =>{
	switch(gallery_type){
		case (gallery_type_enum.doll):
			return "doll"
		case (gallery_type_enum.graphic_design_and_packaging):
			return "graphic_design_and_packaging"
		case (gallery_type_enum.standard):
			return sort_chip_for_searching.current
		default:
			return sort_chip_for_searching.current
	}
}

return (

	<div className="w-full flex flex-col items-center justify-center">
		{selected_image !== null && <FullDisplay 
			close={() => { set_selected_image(null) }}
			url={selected_image.image_urls.size_full}
			already_loaded={false}
			title={selected_image.title}
			description={selected_image.description}
			medium={selected_image.medium}
			theme={selected_image.theme}
			old_url={selected_image.image_urls.size_display}/>}

		<Title text={`${get_page_title()} Gallery`}/>

		{gallery_type == gallery_type_enum.standard && <div className="filters flex flex-col space-y-8 text-lg font-medium max-w-prose w-full px-4 z-50 ">
			<animated.div style={springs} className="space-y-8">
				<MediumFilter 
					chips={standard_gallery_sort_chips}
					adjust_filter={(data: string) => {adjust_filter( data )}}
					border_colour={"bg-dusk-blue-400"}
					selected_item={selected_sort_chip}
					bg_clour={"bg-baby-blue-300"}
					unselected={"bg-dusk-blue-400"}
					selected={"bg-dusk-blue-400"}/>
			</animated.div>		
		</div>}

		<animated.div className="w-full flex items-center justify-center z-50 my-8 space-x-4" style={springs}>
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

		<animated.div className="w-full h-full flex justify-center z-50" style={loadingSpring}>
			<ScrollingGallery
				on_img_click={(image_obj: ImageProps|null) => set_selected_image(image_obj)}
				title={`${selected_sort_chip.charAt(0).toUpperCase() + selected_sort_chip.slice(1)} Pinned`}
				className={"max-w-[80rem]"}
				colBreakpoints={getColumnBreakpoints()}
				perform_refresh={perform_refresh}
				gallery_type={gallery_type}
				fetch_images_callback={ async (loadingLevel, callback) => {
					const new_images:porfolio_return_type = await get_images(
						gallery_type,
						loadingLevel,
						get_filters_for_gallery_type(),
						true)
					set_show_images(true)
					callback(new_images.data, new_images.max_page)
				}}
			/>
		</animated.div>

		<animated.div className="w-full h-full flex justify-center z-50" style={loadingSpring}>
			<ScrollingGallery
				on_img_click={(image_obj: ImageProps|null) => set_selected_image(image_obj)}
				title="Rest of Gallery"
				className={"max-w-[80rem]"}
				gallery_type={gallery_type}
				colBreakpoints={getColumnBreakpoints()}
				perform_refresh={perform_refresh}
				fetch_images_callback={ async (loadingLevel, callback) => {
					const new_images:porfolio_return_type = await get_images(
						gallery_type,
						loadingLevel,
						get_filters_for_gallery_type(),
						false)
					set_show_images(true)
					callback(new_images.data, new_images.max_page)
				}}
			/>
		</animated.div>
	</div>
);
}
