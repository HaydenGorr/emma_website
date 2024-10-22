import { useSpring, animated } from '@react-spring/web'
import { useState } from 'react'

export default function bar({ animate, colour, large_bars }) {


  const springs = useSpring({
    from: { y: -200, opacity: 0, height: large_bars ? '30rem' : '40rem' },
    to: animate ? { y: large_bars ? 120 : 0, opacity: 1, height: large_bars ? '100rem' : '40rem' } : {},
    config: { tension: 30, friction: 5, mass: 1 },
  });
  
  

  return (
    <animated.div className={`${colour} w-12`} style={{ ...springs }} />
  )
}