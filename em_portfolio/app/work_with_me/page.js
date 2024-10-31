'use client'
// import { useEffect, useState } from "react";
import Image from "next/image";
import { get_page_data } from "../utils/api";
import { animated, useSpring} from '@react-spring/web'
import { useEffect, useState } from "react";
import Chips from "./components/chips";
import { parse_api_richtext } from "../utils/richtext";
import Markdown from "react-markdown";
import AnimatedBar from "../galleries/components/animated_bar";

// export const revalidate = Number(process.env.REVALIDATE);

export default function WorkWithMe() {

    const [emma_header, set_emma_header] = useState("")
    const [emma_section, set_emma_section] = useState("")
    const [hayden_header, set_hayden_header] = useState("")
    const [hayden_section, set_hayden_section] = useState("")
    const [emma_links, set_emma_links] = useState([])
    const [hayden_links, set_hayden_links] = useState([])
    const [image_src, set_image_src] = useState("")


    // const [em_email, set_em_email] = useState("")
    // const [hg_email, set_hg_email] = useState("")
    // const [hg_insta, set_hg_insta] = useState("")
    // const [em_insta, set_em_insta] = useState("")


    useEffect(() => {
  
        get_page_data("work-with-me-page", (data) => {
            console.log(data)
            set_emma_header(data.emma_header)
            set_emma_section(parse_api_richtext(data.emma_section[0].children))
            set_hayden_header(data.hayden_header)
            set_hayden_section(parse_api_richtext(data.hayden_section[0].children))
            set_image_src(data.image.url)

            set_emma_links(data.emma_links)
            set_hayden_links(data.hayden_links)

            // set_em_email(data.em_email)
            // set_hg_email(data.hg_email)
            // set_hg_insta(data.hg_insta)
            // set_em_insta(data.em_insta)
        })
    
      }, []);

    const get_animation_with_delay = (delay) => {
        var page_animation = {
            from: {opacity: 0, y: -30,},
            to: {opacity: 1, y: 0},
            config: { friction: 30, mass: 2 }
        }
        page_animation.delay = delay
        return page_animation
    }

    const imageSpring = useSpring(get_animation_with_delay(0))
    const e_section = useSpring(get_animation_with_delay(100))
    const e_section2 = useSpring(get_animation_with_delay(200))
    const e_section3 = useSpring(get_animation_with_delay(300))
    const h_section = useSpring(get_animation_with_delay(400))
    const h_section2 = useSpring(get_animation_with_delay(500))
    const h_section3 = useSpring(get_animation_with_delay(600))

    return (
        <div className={`h-full flex w-full items-center flex-col ${image_src ? "" : "hidden"}`}>

            <div className="absolute flex space-x-16 -translate-x-12 -translate-y-12">
                <AnimatedBar colour={'bg-sweet-corn-400'} delay={0} angle={"rotate-45"} direction="right"/>
                <AnimatedBar colour={'bg-pancho-400'} delay={100} angle={"rotate-45"} direction="right"/>
                <AnimatedBar colour={'bg-perfume-400'} delay={200} angle={"rotate-45"} direction="right"/>
            </div>

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
                style={e_section}>
                    {emma_header}
                </animated.div>

                <animated.div className="flex max-w-full overflow-scroll" style={e_section2}>
                    {emma_links.map((chip, index) => {
                        return (
                            <div className="mx-4">
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
                <animated.div className="bg-pancho-200 p-4 rounded-lg text-pancho-500 font-bold border-2 border-pancho-300 mx-4"
                style={h_section}>
                    {hayden_header}
                </animated.div>

                <animated.div className="flex max-w-full overflow-scroll" style={h_section2}>
                {hayden_links.map((chip, index) => {
                    return (
                        <div className="mx-4">
                            <Chips {...chip} bg_colour={"bg-pancho-100"} text_colour={"text-pancho-500"}/>
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