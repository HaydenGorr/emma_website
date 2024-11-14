'use client'
import { useSpring, animated, useSpringRef, SpringRef } from '@react-spring/web';
import { Direction } from '../utils/enums';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef} from 'react';

interface DecorativeLinesProps {
    delay?: number;
    angle?: string;
    height?: string[];
    direction?: Direction;
}

interface lineConfig {
    height: string[],
    delay: number,
    direction: Direction,
    angle: string,
    colours: string[],
}

export default function DecorativeLines({ delay=200, angle="", height=["190vh", "190vh", "190vh"], direction}: DecorativeLinesProps) {

    const springRef1 = useSpringRef();
    const springRef2 = useSpringRef();
    const springRef3 = useSpringRef();
    const springRefs = useRef([springRef1, springRef2, springRef3]);

    const pathname = usePathname();

    const [config, setConfig] = useState<lineConfig>({
        height:["0rem", "0rem", "0rem"],
        delay:200,
        direction: Direction.left,
        angle: "-rotate-45",
        colours: ["bg-sweet-corn-400", "bg-pancho-400", "bg-perfume-400"]
    });

    useEffect(() => {
        const getConfigForPath = (path) => {
          switch (path) {
            case '/':
              return {
                height:["0rem", "0rem", "0rem"],
                delay:200,
                direction: Direction.left,
                angle: "-rotate-45",
                colours: ["bg-sweet-corn-400", "bg-pancho-400", "bg-perfume-400"],
              };
            case '/about_me':
                return {
                    height:["9rem", "13rem", "9rem"],
                    delay:200,
                    direction: Direction.centre,
                    angle: "",
                    colours: ["bg-sweet-corn-400", "bg-pancho-400", "bg-perfume-400"],
                };
            case '/galleries':
                return {
                    height:["190vh", "190vh", "190vh"],
                    delay:200,
                    direction: Direction.right,
                    angle: "rotate-45",
                    colours: ["bg-sweet-corn-400", "bg-pancho-400", "bg-perfume-400"],
            };
            case '/videos':
                return {
                    height:["0vh", "0vh", "0vh"],
                    delay:200,
                    direction: Direction.right,
                    angle: "rotate-2",
                    colours: ["bg-sweet-corn-400", "bg-pancho-400", "bg-perfume-400"],
                };
            case '/work_with_me':
                return {
                    height:["0vh", "0vh", "0vh"],
                    delay:200,
                    direction: Direction.left,
                    angle: "rotate-2",
                    colours: ["bg-sweet-corn-400", "bg-pancho-400", "bg-perfume-400"],
                };
            default:
              return {
                height:["0vh", "0vh", "0vh"],
                delay:200,
                direction: Direction.left,
                angle: "-rotate-45",
                colours: ["bg-sweet-corn-400", "bg-pancho-400", "bg-perfume-400"],
              };
          }
        };
        
        const nextConfig = getConfigForPath(pathname)

        setConfig(nextConfig);
        resetAllAnimations(nextConfig);
      }, [pathname]);

    const getSpringConfig = (index) => {
        return {
            from: {  height: "0rem", opacity:0 },
            to: { height: config.height[2], opacity:1 },
            config: { tension: 50, friction: 10, mass: 1},
            delay: config.delay*index
        }
    } 

    // Function to reset all animations
    const resetAllAnimations = (nextConfig) => {
        springRefs.current.forEach((springRef, index) => {

            // This resets the lines immedaitely to 0 height and 0 opacity
            springRef.start({
                from: { height: "0rem", opacity: 0 },
                to: { height: "0rem", opacity: 0 },
                immediate: true,
            });

            springRef.start({
                from: { height: "0rem", opacity: 0 },
                to: { height: nextConfig.height[index], opacity: 1 },
                config: { tension: 50, friction: 10, mass: 1 },
                delay: nextConfig.delay * index,
                immediate: false,
            });
        });
    };

    // Reset lines on pageload
    // useEffect(() => {
    //     if (springRefs.current.length) {
    //         resetAllAnimations();
    //     }
    // }, [pathname]);

    const springs1 = useSpring({
        ref: springRef1,
        ...getSpringConfig(0)
    });

    const springs2 = useSpring({
        ref: springRef2,
        ...getSpringConfig(1)
    });

    const springs3 = useSpring({
        ref: springRef3,
        ...getSpringConfig(2)
    });


    const getDirectionClasses = () => {
        switch (config.direction) {
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
        <div className={`absolute flex space-x-8 ${config.angle} ${getDirectionClasses()} top-0`}>
            <animated.div
                className={`${config.colours[0]} w-10`}
                style={{...springs1}}
            />
            <animated.div
                className={`${config.colours[1]} w-10`}
                style={{...springs2}}
            />
            <animated.div
                className={`${config.colours[2]} w-10`}
                style={{...springs3}}
            />
        </div>

    );
}
