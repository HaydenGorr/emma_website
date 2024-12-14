import { strapi_video_pages } from "./interfaces/videos";
// Define all_standard_types array
import { all_standard_types } from "../interfaces";

function build_image_getter_url(
    level: number | string,
    filter_type: string[],
    get_pinned: Boolean,
    get_null: Boolean
): string {
    console.log("build_image_getter_url filter_type:", filter_type);


    const pageSize = '15'; // Assuming pageSize is always 15
    const step1_url = `https://www.emmadannpersonal.com/api/portfolio-images?populate=*&pagination[pageSize]=${pageSize}&pagination[page]=${level}&sort=createdAt:desc`;

    let final_url = step1_url;

    if (get_null) {
        final_url += `&filters[$and][2][art_type][work_type][$null]=true`;
    }else {
        if (filter_type.length > 0 && filter_type[0] !== "*") {
            filter_type.forEach((type, index) => {
                const encodedType = encodeURIComponent(type);
                final_url += `&filters[$and][0][$or][${index}][art_type][work_type][$eq]=${encodedType}`;
            });
        }
    }


    // Handle pinned filter
    if (get_pinned) {
        final_url += `&filters[$and][1][pinned][$eq]=true`;
    } else {
        final_url += `&filters[$and][1][$or][0][pinned][$eq]=false&filters[$and][1][$or][1][pinned][$null]=true`;
    }

    return final_url;
}

export const get_full_article = async (id, callback) => {

    const url = `https://www.emmadannpersonal.com/api/articles/${id}?populate=*`;

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        callback(data)
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export const get_articles_meta = async (level=1, callback) => {


    const pageSize = '15'; // Assuming pageSize is always 15
    const url = `https://www.emmadannpersonal.com/api/articles?fields[0]=title&fields[1]=description&fields[2]=updatedAt&populate=images`;
    // const url = `https://www.emmadannpersonal.com/api/articles?populate=*`;

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log("articles", data)
        callback(data)
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export const get_strapi_videos_promise = async (page: strapi_video_pages) => {

    var add_string = ""

    if (page == strapi_video_pages.animation_reel_page) {
        add_string = "?filters[Animation_Reel][$eq]=true"
    }
    else if (page == strapi_video_pages.stop_motion_animation_page) {
        add_string = "?filters[Stop_Motion_Animation][$eq]=true"
    }

    console.log("tier", `https://www.emmadannpersonal.com/api/video-links${add_string}&populate=*`)

    try {
        const response = await fetch(`https://www.emmadannpersonal.com/api/video-links${add_string}&populate=*`, {
            headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export const get_page_data = async (page, callback) => {
    fetch(`https://www.emmadannpersonal.com/api/${page}?populate=*`, 
        {
        headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => callback(data.data))
    .catch(error => console.error('Error:', error));
}

export const get_page_data_promise = async (page: string) => {
    try {
        const response = await fetch(`https://www.emmadannpersonal.com/api/${page}?populate=*`, {
            headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const get_youtube_data_promise = async (playlist_ID:string) => {
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlist_ID}&key=${process.env.YOUTUBE_API_KEY}`, {
            next: { revalidate: 300 }, 
        });
        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const get_portfolio_images_promise = async (level:string|number, filter_type: string[], get_pinned:Boolean, should_fetch_null_images:Boolean) => {

    console.log("get_portfolio_images_promise", filter_type)
    
    const url = build_image_getter_url(level, filter_type, get_pinned, should_fetch_null_images)

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
    
}