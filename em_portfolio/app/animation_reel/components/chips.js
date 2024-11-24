'use client'
import { useState } from 'react'
import Image from 'next/image'

export default function Chips({ text, link }) {
    const [hovered, setHovered] = useState(false)

    return (
        <div className={`bg-hibiscus-300 text-hibiscus-900 px-2 py-0.5 text-sm rounded-lg flex cursor-pointer`} 
        onClick={() => {window.open(link, '_blank', 'noopener,noreferrer')} }
        onMouseOver={() => setHovered(true)} 
        onMouseOut={() => setHovered(false)}>
            <p className="m-0 whitespace-nowrap text-xl">{text}</p>
            <div className="h-5 w-5 relative m-0 opacity-60 ml-2 self-center">
                <Image src={"/icons/cursor.png"} fill className="object-cover m-0"/>
            </div>
        </div>
    )

}