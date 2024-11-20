function build_image_getter_url(level, selected_themes=[], selected_mediums=[], get_pinned) {
    
    console.log("l st, sm, gp", level, selected_themes, selected_mediums, get_pinned)

    const step1_url = `https://www.emmadannpersonal.com/api/portfolio-images?populate=*&pagination[pageSize]=${get_pinned ? '20' : '20'}&pagination[page]=${level}&sort=createdAt:desc`
    
    const theme_addition = selected_themes.map((val, index) => {
        return `filters[$and][0][$or][${index}][medium_theme][theme][$eq]=${val}`;
    }).join('&');
    
    const medium_addition = selected_mediums.map((val, index) => {
        return `filters[$and][1][$or][${index}][medium_theme][medium][$eq]=${val}`;
    }).join('&');

    // Add the pinned filter as another AND condition
    const pinned_filter = get_pinned 
    ? `filters[$and][2][pinned][$eq]=true`
    : `filters[$and][2][$or][0][pinned][$eq]=false&filters[$and][2][$or][1][pinned][$null]=true`;

    const final_url = step1_url + (theme_addition ? `&${theme_addition}` : '') + (medium_addition ? `&${medium_addition}` : '') + (`&${pinned_filter}`)

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

export const get_portfolio_images_promise = async (level, selected_themes=[], selected_mediums=[], get_pinned, callback) => {

    const url = build_image_getter_url(level, selected_themes, selected_mediums, get_pinned)

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