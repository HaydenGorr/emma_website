import { get_page_data_promise } from "../utils/api";
import { stringify_strapi_richtext } from "../utils/richtext";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import AnimatedBar from "./components/animated_bar";
import DecorativeLines from '../components/decorative_lines'
import { Direction } from '../utils/enums';
import Text_Display from './components/text_display'

export const revalidate = 300

export default async function About() {
    const getPageData = async () => {
        const res = await get_page_data_promise("about-me-page")
        const iwmfodf = stringify_strapi_richtext(res.data.main_text)
        console.log("cabcab", iwmfodf)
        console.log("rubrub", iwmfodf.split("\n\n"))
        return stringify_strapi_richtext(res.data.main_text)
    }
    
    const main_text = await getPageData();

    return (
        <div className="w-full relative items-center mt-24 flex flex-col mb-32">

            <div className="ml-14"><DecorativeLines height={["11vh", "14vh", "11vh"]} direction={Direction.centre}/></div>
            
	        <p className='md:text-5xl sm:text-5xl text-4xl font-extrabold pb-12 lg:pb-20 z-50'>About me</p>

            <div className="max-w-prose px-4 z-50 space-y-4">

                {main_text.split("\n\n").map((val, index) => {
                    return (
                        <Text_Display text={val} index={index} delay={80}/>
                    )
                })}
                
            </div>
            
        </div>
    );
}
