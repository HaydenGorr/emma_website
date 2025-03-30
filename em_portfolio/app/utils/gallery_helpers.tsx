import { getFullImageUrl, getDisplayImageUrl } from "../utils/getimageurl";
import { get_portfolio_images_promise } from "../utils/api";
import { gallery_type_enum, all_standard_types } from "../interfaces";

export interface ImageProps {
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
	type: image_type|null;
}

export interface image_object {
	[id: number]: ImageProps 
}

export interface image_type {
	work_type: "none" | "digital" | "sculpture" | "drawing" | "doll" | "makeup"
}

export enum image_type_enum {
	"none",
	"digital",
	"sculpture",
	"drawing"
}

export interface porfolio_return_type {
	data:ImageProps[];
	max_page:number;
	total:number;
}

const process_image_fetch_request = (result_data):ImageProps[]  => {
	var processed_images:ImageProps[] = []

	for (let image_obj of result_data) {
		const id = image_obj.medium_theme?.id || image_obj.i-1 || null
		if (!id) continue

		try{
			processed_images.push({
				id: id, // for some reasing the correct image id is in medium_theme
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
				type: image_obj?.art_type?.work_type || null,
			})
		}
		catch {
			continue
		}
	}

	return processed_images
}

export const get_images = async (gallery_type: gallery_type_enum, level:number|string, filter_type:string, get_pinned:Boolean ): Promise<porfolio_return_type> => {
	var should_fetch_null_images = false
	var normalised_filter = []

	if (gallery_type == gallery_type_enum.doll) normalised_filter = ["doll"]
	else if (gallery_type == gallery_type_enum.graphic_design_and_packaging) normalised_filter = [gallery_type_enum.graphic_design_and_packaging]
	else if (gallery_type == gallery_type_enum.standard) {
		if (filter_type == "") {
			normalised_filter = all_standard_types.map((val)=>{return val})
			should_fetch_null_images = true
		}
		else normalised_filter = [filter_type]
	}

	const result = await get_portfolio_images_promise(level, normalised_filter, get_pinned, should_fetch_null_images)
	console.log("woosh",  result)
	return {data: process_image_fetch_request(result.data), max_page:result.meta.pagination.pageCount, total:result.meta.pagination.total}
}