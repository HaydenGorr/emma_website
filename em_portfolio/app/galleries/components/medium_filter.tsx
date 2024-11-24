import { useSpring, animated } from '@react-spring/web'
import { useState, useEffect } from 'react'
import SearchChip from './search_chip';
import { image_type } from '../../utils/gallery_helpers';

interface Props {
    chips: string[];
    selected_item: string;
    selected: string;
    unselected: string;
    bg_clour: string;
    border_colour: string;
    adjust_filter: (a: string) => void;
}

export default function MediumFilter({ 
    chips, 
    selected_item, 
    selected, 
    unselected, 
    bg_clour, 
    border_colour,
    adjust_filter 
}: Props) {

    const [animate, set_animate] = useState(false)

    const springs = useSpring({
        from: { width: "100%", opacity: 0, scale: 0.9},
        to: animate ? { width: "100%", opacity: 1, scale: 1} : { width: "100%", opacity: 0 }
    });
    

    useEffect(() => {
        if (chips.length > 0){
            set_animate(true)
        }
        else set_animate(false)
    }, [chips])

    return (
        
        <animated.div className={`flex ${bg_clour} border-2 ${border_colour} rounded-lg overflow-x-scroll hide-scroll h-16`} style={{...springs}}>
            <div className={`cursor-pointer flex justify-center items-center z-40`}>

                {<div className={'flex justify-start space-x-4 overflow-x-scroll hide-scroll relative h-full items-center p-4'} >
                {chips.map((val: string, index) => {
                    return (
                        <div className={`overflow-visible`} key={val}>
                            <SearchChip
                            isSelected={selected_item == val}
                            onClick={()=>{adjust_filter( val )}}
                            text={val}
                            colour={selected_item == val.toLocaleLowerCase() ? selected: unselected}/>
                        </div>
                    )
                    })}
                </div>}
                
            </div>
        </animated.div>
    )

}