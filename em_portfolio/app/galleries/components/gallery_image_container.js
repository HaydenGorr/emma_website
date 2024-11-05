import strings from '../../string_consts.json'
import Image from 'next/image';
import { animated, useSpring } from '@react-spring/web';
import { useEffect, useState, useRef } from 'react';
import InfoBox from './infoBox';
import ErrorBox from './errorbox';

export default function GalleryImageContainer({title, date, description, medium, theme, image_urls, showdesc, show_description_callback}) {

  const infoBoxRef = useRef(null)

  const [empty_info_box, set_empty_info_box] = useState()

  useEffect(() => {
    set_empty_info_box(title == "No title available" && description == "No description available")
  }, [title, description])


  const [focus, set_focus] = useState(false)
  const [mouseover, set_mouseover] = useState(false)

  const containerHover = useSpring({
    from: { scale: 1 },
    to: { scale: mouseover ? 1.03 : 1 }
  });


  return (

<animated.div className={`w-full rounded-lg overflow-visible cursor-pointer z-30 flex flex-col`}
    onClick={() => set_focus(!focus)}
    onMouseOver={() => set_mouseover(true)} onMouseOut={() => set_mouseover(false)}
    style={{...containerHover}}>

    
    <Image
        className="w-full rounded-lg shadow-strong z-50 "
        width={1000}
        height={1000}
        src={image_urls?.size_display || ''}
        alt={description}
        layout="responsive"
        style={{ zIndex: 50 }}
        onClick={() => { show_description_callback() }}
    />
    

    {!empty_info_box && <InfoBox show={focus} title={title} desc={description}></InfoBox>}
    {empty_info_box && <div className='z-50 -translate-y-24 w-full flex justify-center mb-11'><ErrorBox show={focus} set_show={set_focus}/></div>}

    {/* {!empty_info_box && <animated.div
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
    </animated.div>}

    {empty_info_box && <animated.div
        className="mt-2 bg-pancho-300 text-pancho-900 p-4 rounded-lg relative justify-between w-fit self-center "
        style={{ ...springs, zIndex: 30, transformOrigin: "top" }}
        ref={infoBoxRef}
        >
      <div>
        asd
      </div>
    </animated.div>} */}

</animated.div>

  );
}
