import { useSpring, animated } from '@react-spring/web'
import { useState, useEffect } from 'react'
import SearchChip from './search_chip';

interface Props {
    chips: string[];
    selected_items: string[];
    selected: string[];
    unselected: string;
    bg_clour: string;
    border_colour: string;
    adjust_filter: (a: string[], b?: string[]) => void;
}

export default function MediumFilter({ 
    chips, 
    selected_items, 
    selected, 
    unselected, 
    bg_clour, 
    border_colour,
    adjust_filter 
}: Props) {

    const [animate, set_animate] = useState(false)

    const return_updated_filter_list = (sel_str) => {
        if (selected_items.includes(sel_str)) {
            return selected_items.filter(val => val !== sel_str);
        } else {
            return [...selected_items, sel_str];
        }
    }

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
                        <div className={`overflow-visible`}>
                            <SearchChip
                            key={val}
                            isSelected={selected_items.includes(val.toUpperCase())}
                            onClick={()=>{adjust_filter(return_updated_filter_list(val.toUpperCase()))}}
                            text={val}
                            colour={selected_items.includes(val.toUpperCase()) ? selected: unselected}/>
                        </div>
                    )
                    })}
                </div>}
                
            </div>
        </animated.div>
    )

}