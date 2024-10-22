'use client'
import { useSpring, animated } from '@react-spring/web'
import { useState, useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation';

export default function NavBar() {
    const pathname = usePathname();
    const router = useRouter();

    const [page, setPage] = useState(pathname);
    const [hoveredPage, setHoveredPage] = useState(null);

    const buttonRefs = useRef([]);
    const containerRef = useRef(null);

    const [chipStyle, setChipStyle] = useState({
        left: 0,
        width: 0,
        height: 0,
    });
    
    // Determine which page to target: hovered or selected
    const targetPage = hoveredPage || page;

    // React Spring animation
    const props = useSpring({
        left: chipStyle.left,
        width: chipStyle.width,
        height: chipStyle.height,
        config: { tension: 300, friction: 20 },
    });

    const pages = ['/', '/galleries', '/about', '/contact']

    const handlePageChange = (url) => {
        if (url !== page) {
            router.push(url); // Navigate to the next page
        }
    };

    // Function to update chip position
    const updateChipPosition = () => {
        const currentIndex = pages.indexOf(targetPage);
        if (currentIndex === -1) return;

        const currentButton = buttonRefs.current[currentIndex];
        const container = containerRef.current;

        if (currentButton && container) {
            // Calculate the left position relative to the container
            const left = currentButton.offsetLeft;
            const width = currentButton.offsetWidth;
            const height = currentButton.offsetHeight;

            setChipStyle({
                left,
                width,
                height,
            });
        }
    };

    // Update `page` state when pathname changes
    useEffect(() => {
        setPage(pathname);
    }, [pathname]);

    // Update chip position when targetPage changes and on window resize
    useEffect(() => {
        updateChipPosition();

        const handleResize = () => {
            updateChipPosition();
        };

        window.addEventListener('resize', handleResize);

        // Cleanup on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [targetPage]);

    // Initialize chip position on mount
    useEffect(() => {
        // Delay to ensure refs are set
        const timer = setTimeout(() => {
            updateChipPosition();
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className='w-full flex justify-center mb-8'>
            {/* Navigation Buttons Container */}
            <div 
                className='flex space-x-8 px-4 py-2 rounded-full bg-sweet-corn-100 relative'
                ref={containerRef}
            >
                {/* Chip Background */}
                <animated.div
                    className='absolute bg-sweet-corn-300 rounded-full z-10'
                    style={{
                        ...props,
                        top: '50%',
                        transform: 'translateY(-50%)',
                    }}
                />

                {/* Navigation Buttons */}
                {pages.map((val, index) => {
                    const label = val === '/' ? 'Home' : val.slice(1).charAt(0).toUpperCase() + val.slice(2);
                    const isActive = page === val;

                    return (
                        <button
                            key={index}
                            ref={(el) => (buttonRefs.current[index] = el)}
                            className={`relative px-4 py-2 rounded-full transition-colors duration-300 z-20 ${
                                isActive ? 'text-black font-bold' : 'text-gray-700'
                            }`}
                            onClick={() => handlePageChange(val)}
                            onMouseEnter={() => setHoveredPage(val)}
                            onMouseLeave={() => setHoveredPage(null)}
                        >
                            {label}
                        </button>
                    );
                })}
            </div>
        </div>
    )
}
