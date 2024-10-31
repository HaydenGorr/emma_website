import { useSpring, animated } from '@react-spring/web';

export default function AnimatedBar({ colour, delay, angle, direction }) {
  const springs = useSpring({
    from: {  height: "0vh" },
    to: { height: "160vw" },
    config: { tension: 50, friction: 10, mass: 1},
    delay: delay
  });

  return (
    <div>
        
    </div>
  );
}
