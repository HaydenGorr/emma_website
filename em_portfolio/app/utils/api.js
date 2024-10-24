

export const get_portfolio_images = async (callback) => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/portfolio-images?populate=*&pagination[pageSize]=1000`, 
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


export const get_page_data = async (page, callback) => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${page}?populate=profile_pic`, 
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