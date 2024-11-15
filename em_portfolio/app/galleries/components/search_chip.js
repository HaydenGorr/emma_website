import { animated, useSpring} from '@react-spring/web'
import { useState } from 'react';
import Image from 'next/image';

export default function SearchChip({isSelected, onClick, text, colour}) {

  const [clicked, setClicked] = useState(false)

    const chipSpring = useSpring({
        from: { transform: 'scale(1)' },
        to: isSelected ? { transform: 'scale(1.1)' } : { transform: 'scale(1)' },
        config: {
          tension: 300,
          friction: 10,
        }
      });
    

    return (
    <animated.button
        className={`${colour} h-8 px-4 flex rounded-full items-center font-bold text-sm z-50 whitespace-nowrap overflow-visible transition-shadow ${clicked ? "shadow-lg" : "shadow-sm"}`}
        onClick={()=>{ setClicked(!clicked); onClick()}}
        style={{...chipSpring}}>
          {text}
        </animated.button>
  );
}
