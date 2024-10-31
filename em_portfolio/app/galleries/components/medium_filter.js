import { useSpring, animated } from '@react-spring/web'
import { useState, useEffect } from 'react'
import SearchChip from './search_chip';

export default function MediumFilter({ chips, selected_items, selected, unselected, bg_clour, adjust_filter }) {

    const [animate, set_animate] = useState(false)

    const return_updated_filter_list = (sel_str) => {
        if (selected_items.includes(sel_str)) {
            return selected_items.filter(val => val !== sel_str);
        } else {
            return [...selected_items, sel_str];
        }
    }

    const springs = useSpring({
        from: { width: "100%", opacity: 0},
        to: animate ? { width: "100%", opacity: 1 } : { width: "100%", opacity: 0 }
    });
    

    useEffect(() => {
        if (chips.length > 0){
            set_animate(true)
        }
        else set_animate(false)
    }, [chips])

    return (
        <animated.div className={`flex ${bg_clour} rounded-lg overflow-x-scroll hide-scroll h-16`} style={{...springs}}>
            <div className={`cursor-pointer flex justify-center items-center z-40`}>

                {<div className={'flex justify-start space-x-4 overflow-x-scroll hide-scroll relative h-full items-center p-4'} >
                {chips.map((val, index) => {
                return (
                    <SearchChip
                    key={index}
                    isSelected={selected_items.includes(val.toUpperCase())}
                    onClick={()=>{adjust_filter(return_updated_filter_list(val.toUpperCase()))}}
                    text={val}
                    colour={selected_items.includes(val.toUpperCase()) ? selected: unselected}/>
                )
                })}
                </div>}
                
            </div>
        </animated.div>
    )

}