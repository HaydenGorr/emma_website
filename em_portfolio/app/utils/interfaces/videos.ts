export interface youtubeVideo {
    title: string;
    description: string;
    vid_id: string
    date: Date
    keep_at_top: Boolean
}

export interface VideoLink_strapi {
    desc: string;
    link: string;
    title: string;
    date: Date
    keep_at_top: Boolean
}

export enum strapi_video_pages {
    stop_motion_animation_page,
    animation_reel_page
}