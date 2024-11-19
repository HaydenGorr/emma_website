'use client'
import { useEffect, useState } from "react";
import { get_page_data } from '../utils/api'
import Image from 'next/image';
import { parse_api_richtext } from '../utils/richtext';
import Markdown from 'react-markdown';
import { animated, useSpring} from '@react-spring/web'
import AnimatedBar from '../components/animated_bar';
import { register_visit, has_visited_before } from "../utils/register_a_visit";
import Chips from '../work_with_me/components/chips';

export default function HomePageDynamic({ visited_before, greeting, your_name, desc, insta_link, contact_email, image_src, visit_again_message, emma_cv_link}) {

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
      return () => {
        set_animate1(true)
      }
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
        {greeting&&<div className={`h-full flex items-center text-center w-full lg:justify-center lg:mt-0 mt-12 px-4 lg:px-32 lg:pr-64 flex-col lg:flex-row`}>

            {/** LEFT SIDE */}
            {your_name && <div className='lg:left-side flex flex-col justify-start lg:items-start order-3 lg:order-1 lg:pb-0 z-50'>
              
            <animated.div className={`font-header text-blue-smoke-800 my-8`} style={{ ...NameSprings }}>
                <h1 className='lg:text-left text-center'><span className='text-lg text-blue-smoke-700'>{visited_before > 1 ? visit_again_message : greeting}</span> <span className='md:text-6xl sm:text-5xl text-4xl font-extrabold'>{your_name}</span></h1>
            </animated.div>

            <animated.div className={`sm:text-lg lg:text-left text-base text-center lg:mx-0 mx-auto mb-12 max-w-96`} style={{ ...DescSprings }}>
                <Markdown>{desc}</Markdown>
            </animated.div>

            {/** Social links */}
            <animated.div className={`flex w-fit justify-center space-x-4 self-center lg:self-start font-bold`} style={{ ...ButtonsSprings }}>
                <Chips name="email" type="email" link={contact_email} bg_colour="bg-matisse-600" text_colour="text-matisse-100"/>
                <Chips name="instagram" type="link" link={insta_link} bg_colour="bg-hibiscus-700" text_colour="text-hibiscus-100"/>
                <Chips name="download CV" type="link" link={emma_cv_link} bg_colour="bg-magic-mint-200" text_colour="text-magic-mint-50"/>
            </animated.div>

            </div>}

        <div className='lg:max-w-96 lg:flex-grow order-2'/>

        {/** RIGHT SIDE */}
        <div className='right-side flex items-center justify-center order-1 lg:order-3'>

            <div className='z-40 absolute flex rotate-45 space-x-10'>
                <AnimatedBar animate={animate1} colour={'bg-matisse-600'} large_bars={isSmallScreen}/>
                <AnimatedBar animate={animate2} colour={'bg-hibiscus-700'} large_bars={isSmallScreen}/>
                <AnimatedBar animate={animate3} colour={'bg-magic-mint-200'} large_bars={isSmallScreen}/>
            </div>

            {image_src && <animated.div className={`lg:w-56 lg:h-56 w-40 h-40 relative aspect-square rounded-full overflow-hidden z-40 shadow-strong mt-8 lg:pt-0`} style={{ ...profil_picSprings }}>
                <Image
                src={`${process.env.NEXT_PUBLIC_BASE_URL}/${image_src}`}
                alt={'Square Image'}
                width={150}
                height={150}
                className="object-cover object-[-15%_10%]"
                />
            </animated.div>}

        </div>


      </div>}
    </div>
    );
}
