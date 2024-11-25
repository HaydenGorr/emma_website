import { VideoLink_strapi, youtubeVideo } from "./interfaces/videos";
import { get_strapi_videos_promise } from "./api";
import { strapi_video_pages } from "./interfaces/videos";

export const parse_video_response = (youtube_api_videos: any, video_links: VideoLink_strapi[]): youtubeVideo[] => {
        
    /**
     * takes videos from the strapi api and filters for videos that
     * have keep_at_top set to true
     * 
     * These are then mapped to video objects and sorted by date
     * 
     * At the bottom of this function these videos are inserted at
     * the head of the entire video array
     */
    var keep_at_top_videos: youtubeVideo[] = video_links
    .filter((vid: VideoLink_strapi) => {
        return vid.keep_at_top
    })
    .map((val: VideoLink_strapi): youtubeVideo => {
        return {
            title: val.title,
            description: val.desc,
            vid_id: getYoutubeIDFromUrl(val.link),
            date: new Date(val.date),
            keep_at_top: val.keep_at_top,
        }
    })
    .sort((vid_a: youtubeVideo, vid_b: youtubeVideo) => {
        return vid_b.date.getTime() - vid_a.date.getTime()
    });

    /**
     * Filter out kept_at_top videos from strapi api videos
     */        
    var providedYoutubeVideos: youtubeVideo[] = video_links
    .filter((vid: VideoLink_strapi) => {
        return !vid.keep_at_top
    })
    .map((val: VideoLink_strapi): youtubeVideo => {
        return {
            title: val.title,
            description: val.desc,
            vid_id: getYoutubeIDFromUrl(val.link),
            date: new Date(val.date),
            keep_at_top: val.keep_at_top,
        }
    });

    /**
     * Filter out all videos in strapi.
     * 
     * Strapi listed videos take precedence because they can be
     * set to kept_at_top and have custom titles and descriptions
     */
    var youtubeAPIVideos: youtubeVideo[] = youtube_api_videos
    .filter((yt_vid: any) => {
        return ![...keep_at_top_videos, ...providedYoutubeVideos].some(item => item.vid_id == yt_vid.snippet.resourceId.videoId);
    })
    .map((val: any):youtubeVideo => {
        return {
            title: val.snippet.title,
            description: val.snippet.description,
            vid_id: val.snippet.resourceId.videoId,
            date: new Date(val.snippet.publishedAt),
            keep_at_top: false
        }
    })

    var merged_videos: youtubeVideo[] = [...providedYoutubeVideos, ...youtubeAPIVideos]
    .sort((vid_a: youtubeVideo, vid_b: youtubeVideo) => {
        return vid_b.date.getTime() - vid_a.date.getTime()
    })

    return [...keep_at_top_videos , ...merged_videos]
}

export const getVideosFromStrapi = async (page: strapi_video_pages): Promise<VideoLink_strapi[]> => {

    const data = await get_strapi_videos_promise(page)

    return (
        data.data.map((val):VideoLink_strapi =>{
            return {
                desc: val.description,
                link: val.video_link,
                title: val.Title,
                date: new Date(val.date),
                keep_at_top: val.keep_at_top
            }
        })
    )
}

const getYoutubeIDFromUrl = (url) => {
    const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}