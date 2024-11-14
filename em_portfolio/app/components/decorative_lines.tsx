'use client'
import { useSpring, animated } from '@react-spring/web';
import { Direction } from '../utils/enums';

interface DecorativeLinesProps {
    delay?: number;
    angle?: string;
    height?: string[];
    direction?: Direction;
  }

export default function DecorativeLines({ delay=200, angle="", height=["190vh", "190vh", "190vh"], direction}: DecorativeLinesProps) {
    const springs1 = useSpring({
        from: { height: "0vh", opacity:0 },
        to: { height: height[0], opacity:1 },
        config: { tension: 50, friction: 10, mass: 1},
        delay: 0
    });
    const springs2 = useSpring({
        from: { height: "0vh", opacity:0 },
        to: { height: height[1], opacity:1 },
        config: { tension: 50, friction: 10, mass: 1},
        delay: delay
    });
    const springs3 = useSpring({
        from: {  height: "0vh", opacity:0.2 },
        to: { height: height[2], opacity:1 },
        config: { tension: 50, friction: 10, mass: 1},
        delay: delay*2
    });

    const getDirectionClasses = () => {
        switch (direction) {
            case Direction.left:
                return 'left-0 origin-top-left';
            case Direction.centre:
                return 'left-1/2 -translate-x-1/2 origin-top-left';
            case Direction.right:
                return 'right-0 origin-top-right';
            default:
                return 'left-0 origin-top-left';
        }
    };

    return (
        <div className={`fixed flex space-x-8 ${angle} ${getDirectionClasses()} top-0 left-0`}>
            <animated.div
                className={`bg-sweet-corn-400 w-10`}
                style={{...springs1}}
            />
            <animated.div
                className={`bg-pancho-400 w-10`}
                style={{...springs2}}
            />
            <animated.div
                className={`bg-perfume-400 w-10`}
                style={{...springs3}}
            />
        </div>

    );
}
