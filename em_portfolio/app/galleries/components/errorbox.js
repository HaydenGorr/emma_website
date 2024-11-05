import { useSpring, animated } from '@react-spring/web'
import { useState, useEffect, useRef } from 'react'
import SearchChip from './search_chip';

export default function ErrorBox({ show, set_show }) {
    const infoBoxRef = useRef(null)

    const [infoBoxHeight, setInfoBoxHeight] = useState("0px");

    useEffect(() => {
        // Update the height when show changes
        if (show && infoBoxRef.current) {
            setInfoBoxHeight(`${infoBoxRef.current.scrollHeight + 16}px`);
        } else {
            setInfoBoxHeight("0px");
        }

        if (show) {
            setTimeout(() => {
                set_show(false)
            }, 1500)
        }


    }, [show])
    
    const springs = useSpring({
        from: { scale: 0.9,  opacity: 0, height: "0px", marginBottom: "0px" },
        to: {
            scale: show ? 1 : 0.9,
            opacity: show ? 1 : 0,
            height: show ? infoBoxHeight : "0px",
            marginBottom: show ? "16px" : "0px",
        },
        config: { tension: 100, friction: 12, mass: 1 },
    });

    return (
        <animated.div
        className="mt-2 bg-red-500 text-red-100 p-4 rounded-lg absolute justify-between backdrop-blur-lg bg-opacity-80 w-fit z-50 -translate-y-12 "
        style={{ ...springs, zIndex: 30  }}
        ref={infoBoxRef}
        >

        <div className='font-bold'>
            {"No additional info about this piece yet"}
        </div>

    </animated.div>
    )

}