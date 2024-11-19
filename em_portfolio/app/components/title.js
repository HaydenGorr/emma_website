'use client'
import { animated, useSpring } from "@react-spring/web"
import { twMerge } from "tailwind-merge";

export default function Title({ text, className="", delay=0 }) {

	const springs = useSpring({
		from: { scale: 0.9, opacity: 0},
		to: { scale: 1, opacity: 1},
		config: { tension: 100, friction: 12, mass: 1 },
		delay: delay
	  });

return (
	<animated.div
	className={twMerge(`z-50 my-24 lg:my-20 h-fit w-fit rounded-3xl md:text-6xl sm:text-5xl text-4xl font-extrabold`, className)}
	style={{...springs}}>
		<p className=''>{text}</p>
	</animated.div>
)
}