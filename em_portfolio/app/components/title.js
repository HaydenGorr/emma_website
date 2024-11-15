'use client'
import { animated, useSpring } from "@react-spring/web"

export default function Title({ text }) {

	const springs = useSpring({
		from: { scale: 0.9, opacity: 0},
		to: { scale: 1, opacity: 1},
		config: { tension: 100, friction: 12, mass: 1 },
	  });

return (
	<animated.div
	className="z-50 my-24 lg:my-20 h-fit w-fit rounded-3xl"
	style={{...springs}}>
		<p className='md:text-6xl sm:text-5xl text-4xl font-extrabold'>{text}</p>
	</animated.div>
)
}