'use client'
import { useSpring, animated } from '@react-spring/web';

export default function AnimatedBar({ colour, delay, angle, adjusted_length=0 }) {
  const springs = useSpring({
    from: { height: 0, opacity: 0 }, // Use number value
    to: { height: 180, opacity: 1 }, // 15rem = 240px (assuming base font size of 16px)
    config: { tension: 50, friction: 10, mass: 1 },
    delay: delay
  });

  return (
    <animated.div
      className={`${colour} w-10 ${angle} origin-top`}
      style={{
        ...springs,
        height: springs.height.to(h => `${h+adjusted_length}px`) // Convert number to pixel value
      }}
    />
  );
}