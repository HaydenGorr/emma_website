import { parse_api_richtext } from './utils/richtext';
import { get_page_data_promise } from './utils/api'
import HomePageDynamic from './home_components/home';
import { getSmallestImageUrl } from './utils/getimageurl';

export const revalidate = 120

export default async function Home() {
	const set_vars = async () => {
        try{
            const response = await get_page_data_promise("landingpage")
            const cv_response = await get_page_data_promise("emma-cv")
            return {
                visited_before: 1,
                greeting: response.data.greeting,
                your_name: response.data.your_name,
                desc: parse_api_richtext(response.data.description[0].children),
                insta_link: response.data.instagram_link,
                contact_email: response.data.contact_email,
                image_src: getSmallestImageUrl({Image:response.data.profile_pic}),
                visit_again_message: response.data.visit_again_message || response.data.greeting || "Hey. I'm",
                emma_cv_link: `${process.env.NEXT_PUBLIC_BASE_URL}/${cv_response.data.cv_file.url}`
            }
        }
        catch (error) {
            return {
                visited_before: 1,
                greeting: "Hi",
                your_name: "",
                desc: " ",
                insta_link: "",
                contact_email: "",
                image_src: "",
                visit_again_message: "Hi",
                emma_cv_link: ``
            }
        }
    }
        

	const pageData = await set_vars()

return (
	<HomePageDynamic {...pageData} />
    );
}
