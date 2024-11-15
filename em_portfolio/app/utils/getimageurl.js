




export const getDisplayImageUrl = (image_obj) => {
    if ((image_obj?.Image?.formats?.medium?.url)) return image_obj.Image.formats.medium.url
    if ((image_obj?.Image?.formats?.large?.url)) return image_obj.Image.formats.large.url
    if ((image_obj?.Image?.formats?.small?.url)) return image_obj.Image.formats.small.url
    if ((image_obj?.Image?.formats?.thumbnail?.url)) return image_obj.Image.formats.thumbnail.url
    
    return ''
}

export const getFullImageUrl = (image_obj) => {
    if ((image_obj?.Image?.formats?.large?.url)) return image_obj.Image.formats.large.url
    if ((image_obj?.Image?.formats?.medium?.url)) return image_obj.Image.formats.medium.url
    if ((image_obj?.Image?.formats?.small?.url)) return image_obj.Image.formats.small.url
    if ((image_obj?.Image?.formats?.thumbnail?.url)) return image_obj.Image.formats.thumbnail.url
    return ''
}

export const getSmallestImageUrl = (image_obj) => {
    if ((image_obj?.Image?.formats?.small?.url)) return image_obj.Image.formats.small.url
    if ((image_obj?.Image?.formats?.thumbnail?.url)) return image_obj.Image.formats.thumbnail.url
    if ((image_obj?.Image?.formats?.medium?.url)) return image_obj.Image.formats.medium.url
    if ((image_obj?.Image?.formats?.large?.url)) return image_obj.Image.formats.large.url
    return ''
}