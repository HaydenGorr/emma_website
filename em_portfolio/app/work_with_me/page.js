'use client'
import Image from "next/image";
import { get_page_data } from "../utils/api";
import { animated, useSpring} from '@react-spring/web'
import { useEffect, useState } from "react";
import Chips from "./components/chips";
import Markdown from "react-markdown";
import { stringify_strapi_richtext } from "../utils/richtext";
import { getSmallestImageUrl } from '../utils/getimageurl';
import ContactFormNew from "./components/contact_form";

// export const revalidate = Number(process.env.REVALIDATE);

export default function WorkWithMe() {

    const [openContactForm, set_openContactForm] = useState(false)

    const [emma_header, set_emma_header] = useState("")
    const [emma_section, set_emma_section] = useState("")
    const [hayden_header, set_hayden_header] = useState("")
    const [hayden_section, set_hayden_section] = useState("")
    const [emma_links, set_emma_links] = useState([])
    const [hayden_links, set_hayden_links] = useState([])
    const [image_src, set_image_src] = useState("")
    
    useEffect(() => {
  
        get_page_data("work-with-me-page", (data) => {
            set_emma_header(data.emma_header)
            set_emma_section(stringify_strapi_richtext(data.emma_section))
            set_hayden_header(data.hayden_header)
            set_hayden_section(stringify_strapi_richtext(data.hayden_section))
            set_image_src(getSmallestImageUrl({Image: data.image}))

            set_emma_links(data.emma_links)
            set_hayden_links(data.hayden_links)
        })
    
      }, []);

    const get_animation_with_delay = (delay) => {
        var page_animation = {
            from: {opacity: 0, y: 30,},
            to: {opacity: 1, y: 0},
            config: { friction: 30, mass: 2 }
        }
        page_animation.delay = delay
        return page_animation
    }

    const imageSpring = useSpring({
		from: { scale: 0.9, opacity: 0},
		to: { scale: 1, opacity: 1},
		config: { tension: 0, friction: 12, mass: 1 },
	  });
    const e_section = useSpring(get_animation_with_delay(100))
    const e_section2 = useSpring(get_animation_with_delay(200))
    const e_section3 = useSpring(get_animation_with_delay(300))
    const h_section = useSpring(get_animation_with_delay(400))
    const h_section2 = useSpring(get_animation_with_delay(500))
    const h_section3 = useSpring(get_animation_with_delay(600))

    return (
        <div className={`h-full w-full items-center flex flex-col ${image_src ? "" : "hidden"}`}>
            <animated.div className={`w-40 h-40 my-20 shadow-strong relative aspect-square rounded-lg overflow-hidden z-40 bg-green-500`}
            style={{...imageSpring}}>
                <Image
                src={`${process.env.NEXT_PUBLIC_BASE_URL}/${image_src}`}
                alt={'Square Image'}
                fill
                className="object-cover"
                />
            </animated.div>

            <div className="max-w-prose w-full self-center space-y-4 prose pb-24 z-40">

                {/** EMMA'S SECTION */}
                <animated.div className="bg-perfume-300 p-4 rounded-lg text-perfume-800 font-bold border-2 border-perfume-400 mx-4"
                style={{...e_section}}>
                    <div className="flex items-center justify-between">
                        {emma_header}
                        <button className="font-medium text-xs bg-perfume-400 py-1 px-2 rounded-full flex items-center" onClick={()=> {set_openContactForm(!openContactForm)}}>
                            {"quick contact"}
                            <Image src={"/icons/cursor.png"} width={20} height={20} className="object-cover m-0 ml-1"/>
                        </button>
                    </div>

                    {openContactForm && <ContactFormNew className={"mt-4"}></ContactFormNew>}

                </animated.div>

                <animated.div className="flex max-w-full overflow-scroll" style={e_section2}>
                    {/* <button className="bg-perfume-200 px-2 py-0.5 text-sm rounded-lg text-perfume-600">quick contact</button> */}
                    {emma_links.map((chip, index) => {
                        return (
                            <div className="mx-4" key={index}>
                                <Chips {...chip} bg_colour={"bg-perfume-100"} text_colour={"text-perfume-500"}/>
                            </div>
                        )
                    })}
                </animated.div>

                <animated.div className="h-fit w-full relative pb-20 px-4 "
                style={e_section3}>
                    <Markdown>{emma_section}</Markdown>
                </animated.div>



                {/** HAYDEN'S SECTION */}
                <animated.div className="bg-pancho-200 p-4 rounded-lg text-pancho-600 font-bold border-2 border-pancho-300 mx-4 flex justify-between items-center"
                style={h_section}>
                    {hayden_header}
                    {/* <button className="font-medium text-xs bg-pancho-300 py-1 px-2 rounded-full flex items-center">
                        {"quick contact"}
                        <Image src={"/icons/cursor.png"} width={20} height={20} className="object-cover m-0 ml-1"/>
                    </button> */}
                </animated.div>

                <animated.div className="flex max-w-full overflow-scroll" style={h_section2}>
                {hayden_links.map((chip, index) => {
                    return (
                        <div className="mx-4" key={index}>
                            <Chips {...chip} bg_colour={"bg-pancho-100"} text_colour={"text-pancho-500"} />
                        </div>
                    )
                })}
                </animated.div>

                <animated.div className="h-fit w-full relative px-4 "
                style={h_section3}>
                    <Markdown>{hayden_section}</Markdown>
                </animated.div>

            </div>
        </div>
    );
}