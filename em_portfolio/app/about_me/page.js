import { get_page_data_promise } from "../utils/api";
import { stringify_strapi_richtext } from "../utils/richtext";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import AnimatedBar from "./components/animated_bar";

export const revalidate = 300

export default async function About() {
    const getPageData = async () => {
        const res = await get_page_data_promise("about-me-page")
            
        return stringify_strapi_richtext(res.data.main_text)
    }
    
    const main_text = await getPageData();

    return (
        <div className="w-full relative items-center mt-24 flex flex-col mb-32">

            <div className="absolute flex space-x-8 -translate-y-24 z-10">
                <AnimatedBar colour={'bg-sweet-corn-400'} delay={0} angle={"rotate-0"}/>
                <AnimatedBar colour={'bg-pancho-400'} delay={200} angle={"rotate-0"} adjusted_length={40}/>
                <AnimatedBar colour={'bg-perfume-400'} delay={400} angle={"rotate-0"}/>
            </div>
            
	        <p className='md:text-5xl sm:text-5xl text-4xl font-extrabold font-header pb-12 lg:pb-20 z-50'>About me</p>

            <div className="max-w-prose px-4 z-50">
                <Markdown className="prose prose-stone" remarkPlugins={[remarkGfm]}>{main_text}</Markdown>
            </div>
            
        </div>
    );
}
