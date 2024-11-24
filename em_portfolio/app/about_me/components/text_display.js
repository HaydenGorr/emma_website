'use client'
import { useSpring, animated } from '@react-spring/web';
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Text_Display({ delay, text, index }) {
const springs = useSpring({
	from: { opacity: 0, },
	to: { opacity: 1 },
	config: { tension: 50, friction: 10, mass: 1 },
	delay: delay
});

const getSpring = (index) => {
	return useSpring({
		from: { opacity: 0, transform: 'translateY(1rem)' },
		to: { opacity: 1, transform: 'translateY(0rem)' }, 
		config: { tension: 50, friction: 10, mass: 1 },
		delay: delay*index
	})
}

return (
	<animated.div style={{ ...getSpring(index) }} >

		<Markdown className="prose prose-stone" remarkPlugins={[remarkGfm]}>{text}</Markdown>

	</animated.div>
);
}