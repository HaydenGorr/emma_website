'use client'
import strings from '../string_consts.json'
import { useEffect, useState } from "react";
import { get_page_data } from '../utils/api'
import Image from 'next/image';
import { parse_api_richtext } from '../utils/richtext';
import Markdown from 'react-markdown';
import { animated, useSpring} from '@react-spring/web'
import AnimatedBar from './animated_bar';
import OpenLink from './modals/open_link';

export default function Main_page_header() {

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

  
  useEffect(() => {

    get_page_data("landingpage", (data) => {
      console.log("crumpet")
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
    <div className={`h-full flex items-center text-center w-full justify-center px-32 pr-64 flex-col lg:flex-row`}>
      {/** LEFT SIDE */}
      {your_name && <div className='left-side flex flex-col justify-start items-start order-3 lg:order-1'>

        <animated.div className={`font-header text-blue-smoke-800 my-8`} style={{ ...NameSprings }}>
          <h1><span className='text-lg text-blue-smoke-700'>{greeting}</span> <span className='text-6xl font-extrabold'>{your_name}</span></h1>
        </animated.div>

        <animated.div className={`text-lg text-left mb-12 max-w-96`} style={{ ...DescSprings }}>
          <Markdown>{desc}</Markdown>
        </animated.div>

        {/** Social links */}
        <animated.div className={`flex flex-col space-y-4`} style={{ ...ButtonsSprings }}>

          <button className='bg-blue-smoke-200 py-1 px-4 rounded-full flex w-fit items-center'>
            <Image
                src={"/icons/insta.png"}
                width={15}
                height={15}
                className="z-40 mr-1">
            </Image>
            instagram
          </button>
          <button className='bg-blue-smoke-200 pt-1 px-4 rounded-full flex w-fit items-center'>
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

      <div className='md:max-w-96 md:flex-grow order-2'></div>


      {/** RIGHT SIDE */}
      <div className='right-side flex items-center justify-center order-1 lg:order-3'>

        <div className='z-40 absolute flex rotate-45 space-x-10'>
          <AnimatedBar animate={animate1} colour={'bg-sweet-corn-400'}/>
          <AnimatedBar animate={animate2} colour={'bg-pancho-400'}/>
          <AnimatedBar animate={animate3} colour={'bg-perfume-400'}/>
        </div>

        {image_src && <animated.div className={`w-56 h-56 relative aspect-square rounded-full overflow-hidden z-40`} style={{ ...profil_picSprings }}>
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/${image_src}`}
            alt={'Square Image'}
            fill
            className="object-cover object-[-15%_10%]"
          />
        </animated.div>}

      </div>


    </div>
  );
}