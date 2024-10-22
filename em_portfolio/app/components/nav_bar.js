'use client'
import { useSpring, animated } from '@react-spring/web'
import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation';

export default function NavBar({ page, set_page }) {
    const pn = usePathname();
    const router = useRouter();

    const [show, set_show] = useState(false)

    const pages = ['/', '/galleries', '/about', '/contact']

    const animate = useSpring({
        from: { y: 100, opacity: 0 },
        to: show
          ? [{ y: 0, opacity: 1 }]
          : { y: 100, opacity: 0 }
      });

    const handlePageChange = (url) => {
        setTimeout(() => {
          router.push(url); // Navigate to the next page after animation completes
        }, 500); // Match this delay with the animation duration
    };


    useEffect(() => {
        set_show(true)
    }, [])

    return (
        <animated.div className='bg-sweet-corn-100 w-fit flex space-x-32 mx-auto mb-4 px-8 py-1 rounded-full' style={{ ...animate }}>
            {pages.map((val, index) => {
                return <button 
                    key={index}
                    className={`${page==val ? 'bg-sweet-corn-300' : ''} px-2 rounded-full`}
                    onClick={ () => {
                        setTimeout(() => {
                            set_show(false);
                        }, 300)
                        set_page(val);
                        handlePageChange(val);

                    }}>{val.slice(1, val.length) == "" ? "home" : val.slice(1, val.length)}</button>
            })}
        </animated.div>
    )

}
