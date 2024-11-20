import { getFullImageUrl, getDisplayImageUrl } from "../utils/getimageurl";
import { get_portfolio_images_promise } from "../utils/api";

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
}

export interface image_object {
	[id: number]: ImageProps 
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
			})
		}
		catch {
			continue
		}

		
	}

	return processed_images
}

export const get_images = async (level, filter_themes: string[], filter_mediums:string[], get_pinned:Boolean ): Promise<porfolio_return_type> => {
	const result = await get_portfolio_images_promise(level, filter_themes, filter_mediums, get_pinned)
	return {data: process_image_fetch_request(result.data), max_page:result.meta.pagination.pageCount, total:result.meta.pagination.total}
}

// export const FetchImages = (inloadingLevel=loadingLevelRef.current) => {

// 	fetchingRef.current = true

// 	const isFirstLoad = inloadingLevel === 1;

// 	get_portfolio_images(inloadingLevel, themes_for_searching.current, mediums_for_searching.current, false, (res) => {
// 		if (isFirstLoad) maxloadingLevelRef.current = res.meta.pagination.pageCount

// 		var formattedImages:image_object = process_image_fetch_request(res.data)

// 		set_images((prevImages: image_object) => {
// 			const finalArray = isFirstLoad ? {} : {...prevImages};
// 			return {...finalArray, ...formattedImages};
// 		});

// 		set_loading(false)
// 	});

// 	fetchingRef.current = false
// }