import strings from '../../string_consts.json'
import Image from 'next/image';
import { animated, useSpring } from '@react-spring/web';
import { useEffect, useState, useRef } from 'react';
import FullDisplay from './full_display';
import GalleryImageContainer from './gallery_image_container';

interface props {
title: string;
description: string;
medium: string;
theme: string;
date: Date;
image_urls: {
	size_display: string;
	size_full: string;
},
aspect_ratio: number,
width: number,
setRef: (element: HTMLImageElement | null) => void
onClick: ()=> void
}

export default function PinnedGalleryImageContainer({title, description, image_urls, aspect_ratio, width, setRef, onClick}: props) {

return (

	<div className='w-full h-full relative'>
		<Image className={"absolute top-0 right-0 z-50 -translate-y-2 translate-x-2 h-7 w-7"} src={"/icons/pinned.png"} width={20} height={20} alt="pinned image"></Image>
		<GalleryImageContainer title={title} description={description} image_urls={image_urls} aspect_ratio={aspect_ratio} width={width} setRef={setRef} onClick={onClick}/>
	</div>

);
}
