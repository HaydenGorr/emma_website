'use client';
import { useEffect, useState, useRef, use } from "react";
import { get_portfolio_images } from "../../utils/api";
import Masonry from 'react-masonry-css';
import GalleryImageContainer from "../components/gallery_image_container";
import { animated, useSpring} from '@react-spring/web'
import MediumFilter from "../components/medium_filter";
import { getFullImageUrl, getDisplayImageUrl } from "../../utils/getimageurl";
import Title from "../../components/title"
import FullDisplay from '../components/full_display'
import PinnedGalleryImageContainer from "../components/pinned_gallery_image_container";
import SizeButton from "../components/size_button";
import ScrollingGallery from "../components/scrolling_gallery";
import { get_images } from "../../utils/gallery_helpers";
import {porfolio_return_type, image_object, ImageProps} from '../../utils/gallery_helpers';

interface asdwd {
	[id: number]: HTMLImageElement | null 
}

enum gallery_size {
	small,
	medium,
	large,
	none
}

export default function DisplayPage() {

const Themes_chips = ["Christianity", "Femininity", "Gender Neutralism", "Experimentalism", "Realism"]
const Medium_chips = ["painting", "drawing", "sculpture", "digital", "print", "mixed"]
const [selected_themes, set_selected_theme] = useState([]); // For filtering
const [selected_mediums, set_selected_medium] = useState([]); // For filtering

const [selected_image, set_selected_image] = useState<ImageProps|null>(null);
const [perform_refresh, set_perform_refresh] = useState(true);

const [user_pref_gallery_size, set_user_pref_gallery_size] = useState<gallery_size>(gallery_size.large); 

const themes_for_searching = useRef<string[]>([]); // The current page we have loaded. Will incriment
const mediums_for_searching = useRef<string[]>([]); // The current page we have loaded. Will incriment

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

const adjust_filter = (themes:string[], mediums:string[]) => {

	if (themes !== null) {
		set_selected_theme(themes)
		themes_for_searching.current = themes
	}
	if (mediums !== null) {
		set_selected_medium(mediums)
		mediums_for_searching.current = mediums
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

		<Title text={"Gallery"}/>

		<div className="filters flex flex-col space-y-8 text-lg font-medium max-w-prose w-full px-4 z-50 ">
			<animated.div style={springs} className="space-y-8">
				<MediumFilter chips={Medium_chips} adjust_filter={(data: string[]) => {adjust_filter(null, data)}} border_colour={"border-pancho-400"} selected_items={selected_mediums} bg_clour={"bg-pancho-300"} unselected={"bg-pancho-200"} selected={"bg-pancho-400"}/>
				<MediumFilter chips={Themes_chips} adjust_filter={(data: string[]) => {adjust_filter(data, null)}} border_colour={"border-perfume-400"} selected_items={selected_themes} bg_clour={"bg-perfume-300"} unselected={"bg-perfume-200"} selected={"bg-perfume-400"}/>
			</animated.div>		
		</div>

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
				title="Pinned"
				className={"max-w-[80rem]"}
				colBreakpoints={getColumnBreakpoints()}
				perform_refresh={perform_refresh}
				fetch_images_callback={ async (loadingLevel, callback) => {
					const new_images:porfolio_return_type = await get_images(
						loadingLevel,
						themes_for_searching.current,
						mediums_for_searching.current,
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
				colBreakpoints={getColumnBreakpoints()}
				perform_refresh={perform_refresh}
				fetch_images_callback={ async (loadingLevel, callback) => {
					const new_images:porfolio_return_type = await get_images(
						loadingLevel,
						themes_for_searching.current,
						mediums_for_searching.current,
						false)
					set_show_images(true)
					callback(new_images.data, new_images.max_page)
				}}
			/>
		</animated.div>
	</div>
);
}
