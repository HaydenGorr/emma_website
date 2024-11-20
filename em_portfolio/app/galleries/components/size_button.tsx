import { animated, useSpring} from '@react-spring/web'
import { useState } from 'react';
import Image from 'next/image';

enum gallery_size {
	diumsmall,
	medium,
	large,
	none
}

export default function SizeButton({isSelected, onClick, size }) {

  const [gallery_size_hover, set_gallery_size_hover] = useState(false)

    const chipSpring = useSpring({
        from: { transform: 'scale(1)' },
        to: isSelected ? { transform: 'scale(1.2)' } : { transform: 'scale(1)' },
        config: {
            tension: 300,
            friction: 10,
        }
    });

    function getImage() {
        return size == gallery_size.large ? "l" : size == gallery_size.medium ? "m" : "s"
    }

    function getColour() {
        return size == gallery_size.large ? "bg-matisse-200" : size == gallery_size.medium ? "bg-hibiscus-200" : "bg-magic-mint-200"
    }
    

    return (
		<animated.button 
			style={chipSpring}
			className={`${getColour()} h-11 w-11 flex justify-center rounded-full`}
			onClick={ () => onClick()}
			onMouseOver={()=>{set_gallery_size_hover(true)}}
			onMouseOut={()=>{set_gallery_size_hover(false)}}>
                <Image className="self-center" src={`/icons/${getImage()}.png`} width={22} height={22} alt=""></Image>
		</animated.button>
  );
}