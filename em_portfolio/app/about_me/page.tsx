import { get_page_data_promise } from "../utils/api";
import { stringify_strapi_richtext } from "../utils/richtext";
import Text_Display from './components/text_display'
import Title from "../components/title";

export const revalidate = 300

export default async function About() {
    const getPageData = async () => {
        const res = await get_page_data_promise("about-me-page")
        return stringify_strapi_richtext(res.data.main_text)
    }
    
    const main_text = await getPageData();

    return (
        <div className="w-full relative items-center flex flex-col">
            
            <Title text={"About me"}/>

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
