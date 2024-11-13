import YoutubeStats from "./youtube_stats";
import { get_youtube_data_promise } from "../utils/api";

export const revalidate = 60

interface youtubeVideoList {
    title: string;
    description: string;
    vid_id: string
    date: Date
}

export default async function Videos() {

    const parse_video_response = (data: any): youtubeVideoList[] => {

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

    const data: youtubeVideoList[] = parse_video_response(await get_youtube_data_promise())

    return (
        <div className="">
            <div className="w-full flex flex-col my-16 items-center z-50">
                <h1 className="self-center font-bold text-5xl mb-8 z-50 ">@emmtobeseen</h1>
                <p className="max-w-prose z-50">My youtube channel for videos about doll making</p>
            </div>
            <div className="z-40">
                <YoutubeStats videos={data}></YoutubeStats>
            </div>
            
        </div>
    );
}