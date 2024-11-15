import YoutubeStats from "./youtube_stats";
import { get_youtube_data_promise } from "../utils/api";
import Title from "../components/title";
import Chips from "./components/chips"
import { get_page_data_promise } from "../utils/api";

export const revalidate = 60

interface youtubeVideoList {
    title: string;
    description: string;
    vid_id: string
    date: Date
}

interface VideoLink {
    desc: string;
    link: string;
    title: string;
}

export default async function Videos() {

    const parse_video_response = (data: any, video_links: VideoLink): youtubeVideoList[] => {

        // return [{
        //         title: "val.snippet.title",
        //         description: "val.snippet.description",
        //         vid_id: "wAbO6gjTSEQ",
        //         date: new Date("28/10/24"),
        //     },{
        //         title: "val.snippet.title",
        //         description: "val.snippet.description",
        //         vid_id: "wAbO6gjTSEQ",
        //         date: new Date("28/10/24"),
        //     },{
        //         title: "val.snippet.title",
        //         description: "val.snippet.description",
        //         vid_id: "wAbO6gjTSEQ",
        //         date: new Date("28/10/24"),
        //     },{
        //         title: "val.snippet.title",
        //         description: "val.snippet.description",
        //         vid_id: "wAbO6gjTSEQ",
        //         date: new Date("28/10/24"),
        //     },{
        //         title: "val.snippet.title",
        //         description: "val.snippet.description",
        //         vid_id: "wAbO6gjTSEQ",
        //         date: new Date("28/10/24"),
        //     }]

        return data.map((val: any) => {
            return {
                title: val.snippet.title,
                description: val.snippet.description,
                vid_id: val.snippet.resourceId.videoId,
                date: new Date(val.snippet.publishedAt),
            }
        })
    }

    const getDataFromStrapi = async () => {

        const data = await get_page_data_promise("video-page")

        return data.data
    }

    const {channel_name, channel_description, channel_link, video_links} = await getDataFromStrapi()
    const data: youtubeVideoList[] = parse_video_response(await get_youtube_data_promise(), video_links)

    return (
        <div className=" overflow-hidden flex flex-col">
            <div className="self-center flex flex-col items-center mb-12">
                <Title text={"My Videos"}></Title>
                <Chips text={channel_name} link={channel_link}></Chips>
                <p className="max-w-prose z-50 mt-4">{channel_description}</p>
            </div>

            <div className="z-40">
                <YoutubeStats videos={data} additional_video_links={video_links}></YoutubeStats>
            </div>
            
        </div>
    );
}