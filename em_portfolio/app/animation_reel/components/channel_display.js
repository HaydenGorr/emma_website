'use client'
import Chips from './chips'
import { animated, useSpring } from '@react-spring/web'
import Markdown from 'react-markdown';

export default function ChannelDisplay({ channel_name, channel_link, channel_description }) {

	const springs = useSpring({
		from: { scale: 0.9, opacity: 0},
		to: { scale: 1, opacity: 1},
		config: { tension: 100, friction: 12, mass: 1 },
        delay: 100 // To space it from the title animating in
    });

    return (
        <animated.div style={springs} className="self-center flex flex-col items-center mb-12 px-4">
            <Chips text={channel_name} link={channel_link}></Chips>
            <Markdown className="max-w-prose z-50 mt-4 whitespace-pre-line">{channel_description}</Markdown>
        </animated.div>
    )

}