import strings from '../../string_consts.json'
import Image from 'next/image';
import { animated, useSpring } from '@react-spring/web';
import { useEffect, useState, useRef } from 'react';
import FullDisplay from './full_display';

interface props {
  title: string;
  description: string;
  medium: string;
  theme: string;
  date: Date;
  image_urls: {
    size_display: string;
    size_full: string;
  }
  setRef: (element: HTMLImageElement | null) => void
  onClick: ()=> void
}

export default function GalleryImageContainer({title, date, description, medium, theme, image_urls, setRef, onClick}: props) {

  const infoBoxRef = useRef(null)
  const imageRef = useRef(null)

  const [fadeIn, setFadeIn] = useState(false);
  const [infoBoxHeight, setInfoBoxHeight] = useState("0px");

  const [focus, set_focus] = useState(false)
  const [mouseover, set_mouseover] = useState(false)
  const [expand, set_expand] = useState(false)

  const springs = useSpring({
    from: { scale: 0.9, y: -100, opacity: 0, height: "0px", marginBottom: "0px" },
    to: {
      scale: focus ? 1 : 0.9,
      y: focus ? 0 : -100,
      opacity: focus ? 1 : 0,
      height: focus ? infoBoxHeight : "0px",
      marginBottom: focus ? "16px" : "0px",
    },
    config: { tension: 100, friction: 12, mass: 1 },
  });

  const containerHover = useSpring({
    from: { scale: 1, opacity:0, transform: 'translateY(1rem)'},
    to: fadeIn ? { scale: mouseover ? 1.03 : 1, opacity: 1, transform: 'translateY(0rem)'  }
    : { scale: 1, opacity:0, transform: 'translateY(1rem)'},
    delay: 100
  });
  
  useEffect(() => {
    // Update the height when focus changes
    if (focus && infoBoxRef.current) {
      setInfoBoxHeight(`${infoBoxRef.current.scrollHeight + 16}px`);
    } else {
      setInfoBoxHeight("0px");
    }
  }, [focus])

  return (

    <animated.div className={`w-full rounded-lg overflow-visible cursor-pointer z-50`}
        onClick={() => set_focus(!focus)}
        onMouseOver={() => set_mouseover(true)} onMouseOut={() => set_mouseover(false)}
        style={{...containerHover}}>

        {/* <Image
          ref={(elem) => { setRef(elem); }}
          className="rounded-lg shadow-strong w-full"
          src={image_urls?.size_display || ''}
          alt={description}
          width={1200}
          height={800}
          priority={true}
          onClick={() => {set_expand(true); onClick()}}
          onLoad={() => setFadeIn(true)}
        /> */}

        <div ref={(elem) => { setRef(elem); }}>
          <img
            className="rounded-lg shadow-strong w-full"
            src={image_urls?.size_display || ''}
            alt={description}
            onClick={() => {set_expand(true); onClick()}}
            onLoad={() => setFadeIn(true)}/>
        </div>
        
        
        {/* <animated.div
            className="mt-2 bg-pancho-300 text-pancho-900 p-4 rounded-lg relative flex flex-col justify-between"
            style={{ ...springs, zIndex: 30, transformOrigin: "top" }}
            ref={infoBoxRef}
            >
            <div className='font-semibold pb-2'>
                {title}
            </div>
            <div>
                {description}
            </div>
        </animated.div> */}
    </animated.div>

  );
}
