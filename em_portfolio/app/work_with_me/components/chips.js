import { useSpring, animated } from '@react-spring/web'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Chips({ name, type, link, bg_colour, text_colour }) {

  const getOnClick = (type, link) => {
      if (type == "link") return () => {window.open(link, '_blank', 'noopener,noreferrer')}
      else if (type == "email") return () => window.location.href = `mailto:${link}`
      else if (type == "download") return () => window.location.href = link
  }

  const [hovered, setHovered] = useState(false)

  const wiggleSpring = useSpring({
    from: { transform: 'rotate(0deg)' },
    to: hovered ? [
      { transform: 'rotate(-4deg)' },
      { transform: 'rotate(4deg)' },
      { transform: 'rotate(-4deg)' },
      { transform: 'rotate(3deg)' },
      { transform: 'rotate(0deg)' },
    ] : { transform: 'rotate(0deg)' },
    config: { duration: 70 },
  });

  const growSpring = useSpring({
    from: { scale: 1 },
    to: hovered ? { scale: 1.1 } : { scale: 1 },
    config: { duration: 80 },
  });

  useEffect( () => {

  }, [hovered])

  return (
    <animated.div className={`${bg_colour} ${text_colour} px-2 py-0.5 text-sm rounded-lg flex cursor-pointer`} onClick={getOnClick(type, link)} onMouseOver={() => setHovered(true)} onMouseOut={() => setHovered(false)}
    style={{...growSpring}}>
        <p className="m-0 whitespace-nowrap hover:">{name}</p>
        <div className="h-5 w-5 relative m-0 opacity-60 ml-2">
            <Image alt={"cursor image"} src={"/icons/cursor.png"} width={20} height={20} className="object-cover m-0"/>
        </div>
    </animated.div>
  )

}