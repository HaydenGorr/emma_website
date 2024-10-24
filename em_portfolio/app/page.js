'use client'
import strings from './string_consts.json'
import { useEffect, useState } from "react";
import { get_page_data } from './utils/api'
import Image from 'next/image';
import { parse_api_richtext } from './utils/richtext';
import Markdown from 'react-markdown';
import { animated, useSpring} from '@react-spring/web'
import AnimatedBar from './components/animated_bar';
import OpenLink from './components/modals/open_link';
import { register_visit, has_visited_before } from "./utils/register_a_visit";

export default function Home() {
    const [visited_before, set_visited_before] = useState(false);

    const [greeting, set_greeting] = useState("")
    const [your_name, set_your_name] = useState("")
    const [desc, set_desc] = useState("")
    const [insta_link, set_insta_link] = useState("")
    const [contact_email, set_contact_email] = useState("")
    const [image_src, set_image_src] = useState("")
  
    // Animate the stripes
    const [animate1, set_animate1] = useState(false)
    const [animate2, set_animate2] = useState(false)
    const [animate3, set_animate3] = useState(false)
  
    // Animate the text
    const [name_animate, set_name_animate] = useState(false)
    const [desc_animate, set_desc_animate] = useState(false)
    const [buttons_animate, set_buttons_animate] = useState(false)
  
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
      // Define the lg breakpoint (1024px)
      const lgBreakpoint = 1024;
  
      // Function to check screen size
      const handleResize = () => {
        setIsSmallScreen(window.innerWidth < lgBreakpoint);
      };
  
      // Run on initial load
      handleResize();
  
      // Add event listener to check for screen size changes
      window.addEventListener('resize', handleResize);
  
      // Clean up the event listener when the component unmounts
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
      set_visited_before(has_visited_before())
      register_visit()
    }, []);
  
    useEffect(() => {
      get_page_data("landingpage", (data) => {
        set_your_name(data.your_name)
        set_greeting(data.greeting)
        set_insta_link(data.instagram_link)
        set_contact_email(data.contact_email)
        set_desc(parse_api_richtext(data.description[0].children))
        set_image_src(data.profile_pic.url)
        console.log(data)
      })
    }, []);
  
    useEffect(() => {
  
      const animation_time = 500
      const delays = [1400, 1600, 1800]
  
      setTimeout(() => {
        set_name_animate(true)
      }, delays[0])
  
      setTimeout(() => {
        set_desc_animate(true)
      }, delays[1])
  
      setTimeout(() => {
        set_buttons_animate(true)
      }, delays[2])
  
    }, []);
  
    useEffect(() => {
      const animation_start = [0, 200, 400]
  
      setTimeout(() => {
        set_animate1(true)
      }, animation_start[0])
  
      setTimeout(() => {
        set_animate2(true)
      }, animation_start[1])
  
      setTimeout(() => {
        set_animate3(true)
      }, animation_start[2])
  
    }, []);
  
    {/** Animate out */}
    const fade_out = () => {
      set_animate1(false)
      set_animate2(false)
      set_animate3(false)
  
      set_name_animate(false)
      set_desc_animate(false)
      set_buttons_animate(false)
    };
  
    // Bar animate
    const NameSprings = useSpring({
      from: { x: -100, opacity: 0 },
      to: name_animate
        ? [{ x: 0, opacity: 1 }]
        : { x: -100, opacity: 0 }
    });
  
    const DescSprings = useSpring({
      from: { x: -100, opacity: 0 },
      to: desc_animate
        ? [{ x: 0, opacity: 1 }]
        : { x: -100, opacity: 0 }
    });
  
    const ButtonsSprings = useSpring({
      from: { x: -100, opacity: 0 },
      to: buttons_animate
        ? [{ x: 0, opacity: 1 }]
        : { x: -100, opacity: 0 }
    });
  
    const profil_picSprings = useSpring({
      from: { opacity: 0 },
      to: animate1
        ? [{ opacity: 1 }]
        : { opacity: 0 }
    });
  
    const animate_awaySprings = useSpring({
      from: { opacity: 1 },
      to: animate1
        ? [{ opacity: 0 }]
        : { }
    });

return (
    <div className="h-full flex flex-col overflow-hidden relative">
        <div className={`h-full flex items-center text-center w-full justify-center px-4 lg:px-32 lg:pr-64 flex-col lg:flex-row`}>

            {/** LEFT SIDE */}
            {your_name && <div className='left-side flex flex-col justify-start items-start order-3 lg:order-1 pb-32 lg:pb-0 z-50'>

            <animated.div className={`font-header text-blue-smoke-800 my-8`} style={{ ...NameSprings }}>
                <h1 className='lg:text-left text-center'><span className='text-lg text-blue-smoke-700'>{visited_before ? 'Hi again, I\'m still' : greeting}</span> <span className='md:text-6xl sm:text-5xl text-4xl font-extrabold'>{your_name}</span></h1>
            </animated.div>

            <animated.div className={`text-lg lg:text-left text-center lg:mx-0 mx-auto mb-12 max-w-96`} style={{ ...DescSprings }}>
                <Markdown>{desc}</Markdown>
            </animated.div>

            {/** Social links */}
            <animated.div className={`flex lg:flex-col lg:space-y-4 lg:space-x-0 space-x-4 w-full justify-center`} style={{ ...ButtonsSprings }}>

                <button className='bg-blue-smoke-200 py-1 px-4 rounded-full flex w-fit items-center'>
                <Image
                    src={"/icons/insta.png"}
                    width={15}
                    height={15}
                    className="z-40 mr-1">
                </Image>
                instagram
                </button>
                <button className='bg-blue-smoke-200 pt-1 px-4 rounded-full flex w-fit items-center'
                onClick={() => window.location.href = 'mailto:emm.personal4@gmail.com'}>
                <Image
                    src={"/icons/email.png"}
                    width={15}
                    height={15}
                    className="z-40 mr-1">
                </Image>
                email
                </button>

            </animated.div>

            </div>}

        <div className='lg:max-w-96 lg:flex-grow order-2'></div>


        {/** RIGHT SIDE */}
        <div className='right-side flex items-center justify-center order-1 lg:order-3'>

            <div className='z-40 absolute flex rotate-45 space-x-10'>
                <AnimatedBar animate={animate1} colour={'bg-sweet-corn-400'} large_bars={isSmallScreen}/>
                <AnimatedBar animate={animate2} colour={'bg-pancho-400'} large_bars={isSmallScreen}/>
                <AnimatedBar animate={animate3} colour={'bg-perfume-400'} large_bars={isSmallScreen}/>
            </div>

            {image_src && <animated.div className={`lg:w-56 lg:h-56 w-40 h-40 relative aspect-square rounded-full overflow-hidden z-40`} style={{ ...profil_picSprings }}>
                <Image
                src={`${process.env.NEXT_PUBLIC_BASE_URL}/${image_src}`}
                alt={'Square Image'}
                fill
                className="object-cover object-[-15%_10%]"
                />
            </animated.div>}

        </div>


</div>
    </div>
    );
}
