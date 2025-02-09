import strings from '../../string_consts.json'
import Image from 'next/image';
import { animated, useSpring } from '@react-spring/web';
import { useEffect, useState, useRef } from 'react';
import FullDisplay from './full_display';
import { image_type } from '../../utils/gallery_helpers';

interface props {
title: string;
description: string;
image_urls: {
	size_display: string;
	size_full: string;
},
aspect_ratio: number,
width: number,
type: image_type|null,
id: number,
onClick: ()=> void
}

export default function GalleryImageContainer({title, description, image_urls, aspect_ratio, width, id, type, onClick=()=>{}}: props) {

const infoBoxRef = useRef(null)
const imageRef = useRef(null)

const [fadeIn, setFadeIn] = useState(false);
const [infoBoxHeight, setInfoBoxHeight] = useState("0px");

const [focus, set_focus] = useState(false)
const [mouseover, set_mouseover] = useState(false)
const [expand, set_expand] = useState(false)

const springs = useSpring({
	// from: { scale: 0.9, y: -100, opacity: 0, height: "0px", marginBottom: "0px" },
	// to: {
	// scale: focus ? 1 : 0.9,
	// y: focus ? 0 : -100,
	// opacity: focus ? 1 : 0,
	// height: focus ? infoBoxHeight : "0px",
	// marginBottom: focus ? "16px" : "0px",
	// },
	// config: { tension: 100, friction: 12, mass: 1 },
});

const containerHover = useSpring({
	from: { scale: 1, opacity:1, transform: 'translateY(1rem)'},
	to: fadeIn ? { scale: mouseover ? 1.03 : 1, opacity: 1, transform: 'translateY(0rem)'  }
	: { scale: 1, opacity:1, transform: 'translateY(1rem)'},
	delay: 100
});

const hide_loading = useSpring({
	from: { Opacity:0, Scale: 0.9 },
	to: fadeIn ? { Scale: 1, Opacity:1 }
	: { Opacity:0, Scale: 0.9 },
	delay: 0
});

useEffect(() => {
	// console.log(type)
	// Update the height when focus changes
	if (focus && infoBoxRef.current) {
	setInfoBoxHeight(`${infoBoxRef.current.scrollHeight + 16}px`);
	} else {
	setInfoBoxHeight("0px");
	}
}, [focus])

return (

	<animated.div className={`w-full rounded-lg overflow-visible cursor-pointer z-50 relative piccy`}
		onClick={() => set_focus(!focus)}
		onMouseOver={() => set_mouseover(true)} onMouseOut={() => set_mouseover(false)}
		style={{...containerHover}}>
		<div>
			<Image
				// ref={(elem) => { setRef(elem); }}
				className={`rounded-lg shadow-strong w-full absolute ${fadeIn ? "visible" : "invisible"}`}
				src={image_urls?.size_display || ''}
				alt={description}
				width={1200}
				height={800}
				priority={true}
				onClick={() => {set_expand(true); onClick()}}
				onLoad={() => setFadeIn(true)}
			/>
			
			<animated.div className={`bg-zinc-400 rounded-lg shadow-strong w-full ${fadeIn ? "" : "animate-pulse"}`}
			style={{
				aspectRatio: aspect_ratio,
				background: '#64748b',
				borderRadius: '8px',
				...hide_loading,
			}}/>

			{!type && <div className='bg-red-500/80 z-50 bottom-2 right-2 absolute px-4 rounded-full font-bold'>
				{`missing type ${id}`}
				</div>}

		</div>

	</animated.div>

);
}
