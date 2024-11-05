import { useSpring, animated } from '@react-spring/web'
import { useState, useEffect, useRef } from 'react'
import SearchChip from './search_chip';

export default function InfoBox({ title, desc, show }) {
    const infoBoxRef = useRef(null)

    const [infoBoxHeight, setInfoBoxHeight] = useState("0px");


    useEffect(() => {
        // Update the height when show changes
        if (show && infoBoxRef.current) {
            setInfoBoxHeight(`${infoBoxRef.current.scrollHeight + 16}px`);
        } else {
            setInfoBoxHeight("0px");
        }
    }, [show])

    const springs = useSpring({
        from: { scale: 0.9, y: -100, opacity: 0, height: "0px", marginBottom: "0px" },
        to: {
            scale: show ? 1 : 0.9,
            y: show ? 0 : -100,
            opacity: show ? 1 : 0,
            height: show ? infoBoxHeight : "0px",
            marginBottom: show ? "16px" : "0px",
        },
        config: { tension: 100, friction: 12, mass: 1 },
    });

    return (
        <animated.div
        className="mt-2 bg-pancho-300 text-pancho-900 p-4 rounded-lg relative justify-between w-full z-40"
        style={{ ...springs, zIndex: 30, transformOrigin: "top" }}
        ref={infoBoxRef}
        >

        <div className='font-bold'>
            {title}
        </div>
        <div>
            {desc}
        </div>

    </animated.div>
    )

}