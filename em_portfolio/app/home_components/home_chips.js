'use client'
import Chips from "../work_with_me/components/chips";
import { animated, useSpring } from "@react-spring/web";


const ButtonsSprings = useSpring({
from: { x: -100, opacity: 0 },
to: buttons_animate.current
	? [{ x: 0, opacity: 1 }]
	: { x: -100, opacity: 0 }
});

export default function Home_chips() {
  return (
    <animated.div className={`flex w-fit justify-center space-x-4 self-center lg:self-start font-black`} style={{ ...ButtonsSprings }}>
        <Chips name="email" type="email" link={contact_email} bg_colour="bg-blue-smoke-200" text_colour="text-blue-smoke-800"/>
        <Chips name="instagram" type="link" link={insta_link} bg_colour="bg-blue-smoke-200" text_colour="text-blue-smoke-800"/>
        <Chips name="download CV" type="link" link={emma_cv_link} bg_colour="bg-blue-smoke-200" text_colour="text-blue-smoke-800"/>
    </animated.div>
  );
}
