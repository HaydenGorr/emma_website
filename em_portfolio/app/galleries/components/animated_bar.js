import { useSpring, animated } from '@react-spring/web'
import { useState } from 'react'

export default function AnimatedBar({ animate, colour, large_bars }) {


  const springs = useSpring({
    from: { transform: 'scaleY(0)' },
    to: { transform: 'scaleY(1)' },
    config: { tension: 30, friction: 5, mass: 1 },
  });
  
  

  return (
    <animated.div className={`${colour} w-12 origin-tops`} style={{ ...springs, height: '200rem' }} />
  )
}