'use client'
import { useSpring, animated } from '@react-spring/web';
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from 'next/image';

export default function ArticleContainer({ className }) {
const springs = useSpring({
	from: { opacity: 0, },
	to: { opacity: 1 },
	config: { tension: 50, friction: 10, mass: 1 },
	delay: 0
});


return (
	<animated.div className={`${className} w-full bg-fuchsia-100 h-fit rounded-lg flex flex-col p-4 relative`} style={{ ...springs }} >

		<div className='font-bold text-xl pb-2'>
			The title of the article
		</div>
		<div className='text-base mb-4 max-h-32 overflow-y-ellipsis'>
			This is the description of the article. You should summarise the content here.  You should summarise the content here.  You should summarise the content here.  You should summarise the content here.  You should summarise the content here.  You should summarise the content here.  You should summarise the content here.  You should summarise the content here.  You should summarise the content here. Typing more random stuff. Typing more random stuff. Typing more random stuff. Typing more random stuff. Typing more random stuff. Typing more random stuff. Typing more random stuff.
		</div>

		<Image className="absolute bottom-2 right-2" width={20} height={20} alt="" src={"/icons/cursor.png"}></Image>

	</animated.div>
);
}