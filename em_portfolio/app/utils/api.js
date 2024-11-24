function build_image_getter_url(level, filter_type, get_pinned) {

    const step1_url = `https://www.emmadannpersonal.com/api/portfolio-images?populate=*&pagination[pageSize]=${get_pinned ? '15' : '15'}&pagination[page]=${level}&sort=createdAt:desc`
    
    // Handle filter_type based on whether it's "*" or a specific value
    const filter_type_addition = filter_type 
        ? (filter_type === "*" 
            ? ``  // When filter_type is "*"
            : `filters[$and][0][art_type][art_type][$eq]=${filter_type}`) // For specific values
        : '';

    // Pinned filter becomes the second AND condition
    const pinned_filter = get_pinned 
        ? `filters[$and][1][pinned][$eq]=true`
        : `filters[$and][1][$or][0][pinned][$eq]=false&filters[$and][1][$or][1][pinned][$null]=true`;

    const final_url = step1_url + 
        (filter_type_addition ? `&${filter_type_addition}` : '') +
        (`&${pinned_filter}`);

    return final_url
}
export const get_portfolio_images = async (level, selected_themes=[], selected_mediums=[], get_pinned, callback) => {

    const url = build_image_getter_url(level, selected_themes=[], selected_mediums=[], get_pinned)

    fetch(url, 
        {
        headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => { response.json().then( data => callback(data) )})
    .catch(error => console.error('Error:', error));
}


export const get_strapi_videos_promise = async () => {

    try {
        const response = await fetch(`https://www.emmadannpersonal.com/api/video-links?populate=*`, {
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

export const get_page_data_promise = async (page) => {
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

export const get_youtube_data_promise = async (page) => {
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${process.env.YOUTUBE_UPLOADS_PLAYLIST_ID}&key=${process.env.YOUTUBE_API_KEY}`, {
            next: { revalidate: 300 }, 
        });
        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const get_portfolio_images_promise = async (level, filter_type, get_pinned, callback) => {
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