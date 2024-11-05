import { get_page_data_promise } from './utils/api'
import Image from 'next/image';
import { parse_api_richtext } from './utils/richtext';
import Markdown from 'react-markdown';
import Home_bars from './home_components/home_bars';
import Home_chips from './home_components/home_chips';

export const revalidate = 3600

export default async function Home() {

	const set_vars = async () => {
        const response = await get_page_data_promise("landingpage")
        const cv_response = await get_page_data_promise("emma-cv")

        return {
            visited_before: 1,
            greeting: response.data.greeting,
            your_name: response.data.your_name,
            desc: parse_api_richtext(response.data.description[0].children),
            insta_link: response.data.instagram_link,
            contact_email: response.data.contact_email,
            image_src: response.data.profile_pic.url,
            visit_again_message: response.data.visit_again_message || response.data.greeting || "Hey. I'm",
            emma_cv_link: `${process.env.NEXT_PUBLIC_BASE_URL}/${cv_response.data.cv_file.url}`
        }
	}

	const pageData = await set_vars()
		

	// const [visited_before, set_visited_before] = useState(0);

	// const [greeting, set_greeting] = useState("")
	// const [your_name, set_your_name] = useState("")
	// const [desc, set_desc] = useState("")
	// const [insta_link, set_insta_link] = useState("")
	// const [contact_email, set_contact_email] = useState("")
	// const [image_src, set_image_src] = useState("")
	// const [visit_again_message, set_visit_again_message] = useState("")

	// const [emma_cv_link, set_emma_cv_link] = useState("")

	// Animate the stripes
	// const [animate1.current, set_animate1.current] = useState(false)
	// const [animate2.current, set_animate2.current] = useState(false)
	// const [animate3.current, set_animate3.current] = useState(false)

	// const animate1 = useRef(false)
	// const animate2 = useRef(false)
	// const animate3 = useRef(false)

	// // // Animate the text
	// const name_animate = useRef(false)
	// const desc_animate = useRef(false)
	// const buttons_animate = useRef(false)

	// const [name_animate, set_name_animate] = useState(false)
	// const [desc_animate.current, set_desc_animate.current] = useState(false)
	// const [buttons_animate.current, set_buttons_animate.current] = useState(false)

	// const [isSmallScreen, setIsSmallScreen] = useState(false);

	// useEffect(() => {
	// // Define the lg breakpoint (1024px)
	// const lgBreakpoint = 1024;

	// // Function to check screen size
	// const handleResize = () => {
	// 	setIsSmallScreen(window.innerWidth < lgBreakpoint);
	// };

	// // Run on initial load
	// handleResize();

	// // Add event listener to check for screen size changes
	// window.addEventListener('resize', handleResize);

	// // Clean up the event listener when the component unmounts
	// return () => window.removeEventListener('resize', handleResize);
	// }, []);

	// useEffect(() => {
	// set_visited_before(has_visited_before() + 1)
	// register_visit()

	// return () => {
	// 	set_animate1.current(true)
	// }
	// }, []);

	// useEffect(() => {
	// get_page_data("landingpage", (data) => {
	// 	set_your_name(data.your_name)
	// 	set_greeting(data.greeting)
	// 	set_insta_link(data.instagram_link)
	// 	set_contact_email(data.contact_email)
	// 	set_desc(parse_api_richtext(data.description[0].children))
	// 	set_image_src(data.profile_pic.url)
	// 	set_visit_again_message(data.visit_again_message || data.greeting || "Hey. I'm")
	// })
	// get_page_data("emma-cv", (data) => {
	// 	set_emma_cv_link(`${process.env.NEXT_PUBLIC_BASE_URL}/${data.cv_file.url}`)
	// 	console.log("`${NEXT_PUBLIC_BASE_URL}/${data.cv_file.url}`", `${process.env.NEXT_PUBLIC_BASE_URL}/${data.cv_file.url}`)
	// })
	// }, []);

	// useEffect(() => {

	// const animation_time = 500
	// const delays = [1400, 1600, 1800]

	// setTimeout(() => {
	// 	set_name_animate.current(true)
	// }, delays[0])

	// setTimeout(() => {
	// 	set_desc_animate.current(true)
	// }, delays[1])

	// setTimeout(() => {
	// 	set_buttons_animate.current(true)
	// }, delays[2])

	// }, []);

	// useEffect(() => {
	// const animation_start = [0, 200, 400]

	// setTimeout(() => {
	// 	set_animate1.current(true)
	// }, animation_start[0])

	// setTimeout(() => {
	// 	set_animate2.current(true)
	// }, animation_start[1])

	// setTimeout(() => {
	// 	set_animate3.current(true)
	// }, animation_start[2])

	// }, []);

	{/** Animate out */}
	const fade_out = () => {
	set_animate1.current(false)
	set_animate2.current(false)
	set_animate3.current(false)

	set_name_animate.current(false)
	set_desc_animate.current(false)
	set_buttons_animate.current(false)
	};

	// Bar animate
	// const NameSprings = useSpring({
	// from: { x: -100, opacity: 0 },
	// to: name_animate.current
	// 	? [{ x: 0, opacity: 1 }]
	// 	: { x: -100, opacity: 0 }
	// });

	// const DescSprings = useSpring({
	// from: { x: -100, opacity: 0 },
	// to: desc_animate.current
	// 	? [{ x: 0, opacity: 1 }]
	// 	: { x: -100, opacity: 0 }
	// });

	// const ButtonsSprings = useSpring({
	// from: { x: -100, opacity: 0 },
	// to: buttons_animate.current
	// 	? [{ x: 0, opacity: 1 }]
	// 	: { x: -100, opacity: 0 }
	// });

	// const profil_picSprings = useSpring({
	// from: { opacity: 0 },
	// to: animate1.current
	// 	? [{ opacity: 1 }]
	// 	: { opacity: 0 }
	// });

	// const animate_awaySprings = useSpring({
	// from: { opacity: 1 },
	// to: animate1.current
	// 	? [{ opacity: 0 }]
	// 	: { }
	// });

return (
	<div className="h-full flex flex-col overflow-hidden relative">
		<div className={`h-full flex items-center text-center w-full justify-center px-4 lg:px-32 lg:pr-64 flex-col lg:flex-row`}>

			{/** LEFT SIDE */}
			<div className='left-side flex flex-col justify-start items-start order-3 lg:order-1 pb-32 lg:pb-0 z-50'>

			<div className={`font-header text-blue-smoke-800 my-8`} style={{  }}>
				<h1 className='lg:text-left text-center'><span className='text-lg text-blue-smoke-700'>{pageData.visited_before > 1 ? visit_again_message : pageData.greeting}</span> <span className='md:text-6xl sm:text-5xl text-4xl font-extrabold'>{pageData.your_name}</span></h1>
			</div>

			<div className={`text-lg lg:text-left text-center lg:mx-0 mx-auto mb-12 max-w-96`} style={{ }}>
				<Markdown>{pageData.desc}</Markdown>
			</div>

			{/** Social links */}
			<div>
				<Home_chips/>
			</div>
			

		</div>

		<div className='lg:max-w-96 lg:flex-grow order-2'></div>


		{/** RIGHT SIDE */}
		<div className='right-side flex items-center justify-center order-1 lg:order-3'>

			<div className='z-40 absolute flex rotate-45 space-x-10'>
				<Home_bars/>
			</div>

			<div className={`lg:w-56 lg:h-56 w-40 h-40 relative aspect-square rounded-full overflow-hidden z-40 shadow-strong`} style={{  }}>
				<Image
				src={`${process.env.NEXT_PUBLIC_BASE_URL}/${pageData.image_src}`}
				alt={'Square Image'}
				fill
				className="object-cover object-[-15%_10%]"
				/>
			</div>

		</div>


		</div>
	</div>
	);
}
