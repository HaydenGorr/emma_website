import { useSpring, animated } from '@react-spring/web'
import { useState } from 'react'
import Image from 'next/image'

export default function Chips({ name, type, link, bg_colour, text_colour }) {

    const getOnClick = (type, link) => {
        if (type == "link") return () => {window.open(link, '_blank', 'noopener,noreferrer')}
        else if (type == "email") return () => window.location.href = `mailto:${link}`
    }

  return (
    <div className={`${bg_colour} ${text_colour} px-2 py-0.5 text-sm rounded-lg flex cursor-pointer mx-4`} onClick={getOnClick(type, link)}>
        <p className="m-0 whitespace-nowrap hover:">{name}</p>
        <div className="h-5 w-5 relative m-0 opacity-60 ml-2">
            <Image src={"/icons/cursor.png"} fill className="object-cover m-0"/>
        </div>
    </div>
  )

}