'use client'
import AnimatedBar from "../components/animated_bar";

export default function Home_bars() {
  return (
    <div>
        <AnimatedBar animate={animate1.current} colour={'bg-sweet-corn-400'} large_bars={isSmallScreen}/>
        <AnimatedBar animate={animate2.current} colour={'bg-pancho-400'} large_bars={isSmallScreen}/>
        <AnimatedBar animate={animate3.current} colour={'bg-perfume-400'} large_bars={isSmallScreen}/>
    </div>
  );
}
