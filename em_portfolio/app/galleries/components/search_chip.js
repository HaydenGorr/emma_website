import { animated, useSpring} from '@react-spring/web'

export default function SearchChip({isSelected, onClick, text, colour}) {

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
        className={`${colour} h-8 px-4 rounded-full font-medium text-sm z-50 whitespace-nowrap`}
        onClick={()=>{onClick()}}
        style={{...chipSpring}}>{text}</animated.button>
  );
}
