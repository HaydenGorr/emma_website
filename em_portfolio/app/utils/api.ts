import { strapi_video_pages } from "./interfaces/videos";
function ensureArray<T>(input: T | T[]): T[] {
    return Array.isArray(input) ? input : [input];
}
function build_image_getter_url(
    level: number | string,
    filter_type: string | string[],
    get_pinned: Boolean
): string {
    console.log("Original filter_type:", filter_type);

    // Normalize filter_type to always be an array
    const filters: string[] = ensureArray(filter_type);
    console.log("Normalized filters:", filters);

    const pageSize = '15'; // Assuming pageSize is always 15
    const step1_url = `https://www.emmadannpersonal.com/api/portfolio-images?populate=*&pagination[pageSize]=${pageSize}&pagination[page]=${level}&sort=createdAt:desc`;

    let final_url = step1_url;

    // Handle multiple filter types using $or
    if (filters.length > 0 && filters[0] !== "*") {
        filters.forEach((type, index) => {
            const encodedType = encodeURIComponent(type);
            final_url += `&filters[$and][0][$or][${index}][art_type][work_type][$eq]=${encodedType}`;
        });
    }

    // Handle pinned filter
    if (get_pinned) {
        final_url += `&filters[$and][1][pinned][$eq]=true`;
    } else {
        final_url += `&filters[$and][1][$or][0][pinned][$eq]=false&filters[$and][1][$or][1][pinned][$null]=true`;
    }

    return final_url;
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

export const get_portfolio_images_promise = async (level:string|number, filter_type: string[], get_pinned:Boolean) => {

    
    const url = build_image_getter_url(level, filter_type, get_pinned)

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