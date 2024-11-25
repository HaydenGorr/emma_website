import YoutubeStats from "../animation_reel/components/youtube_stats";
import { get_youtube_data_promise } from "../utils/api";
import Title from "../components/title";
import Chips from "../animation_reel/components/chips"
import { get_page_data_promise, get_strapi_videos_promise } from "../utils/api";
import ChannelDisplay from "../animation_reel/components/channel_display";
import { parse_video_response, getVideosFromStrapi } from "../utils/videos";
import { youtubeVideo, VideoLink_strapi, strapi_video_pages } from "../utils/interfaces/videos";

export const revalidate = 120

export default async function AnimationReel() {

    const {channel_name, channel_description, channel_link, playlist_ID} = await (async () => {
        const res = await get_page_data_promise("video-page");
        return res.data;
    })();
    const video_links:VideoLink_strapi[] = await getVideosFromStrapi(strapi_video_pages.stop_motion_animation_page);
    const data: youtubeVideo[] = parse_video_response(await get_youtube_data_promise(playlist_ID), video_links)

    return (
        <div className="overflow-hidden flex flex-col">
            <div className="self-center">
                <Title text={"Animation Reel"}></Title>
            </div>

            <ChannelDisplay channel_name={channel_name} channel_link={channel_link} channel_description={channel_description}/>

            <div className="z-40">
                <YoutubeStats videos={data}></YoutubeStats>
            </div>
            
        </div>
    );
}