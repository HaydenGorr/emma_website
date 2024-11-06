'use client'
import { useSpring, animated } from '@react-spring/web';

export default function AnimatedBar({ colour, delay, angle, direction }) {
  const springs = useSpring({
    from: {  height: "0vh" },
    to: { height: "190vw" },
    config: { tension: 50, friction: 10, mass: 1},
    delay: delay
  });

  return (
    <animated.div
      className={`${colour} h-144 w-10 ${angle} ${direction == "right" ? "origin-top-left" : "origin-top-right"}`}
      style={{...springs}}
    />
  );
}
