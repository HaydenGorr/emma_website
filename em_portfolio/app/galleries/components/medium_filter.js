import { useSpring, animated } from '@react-spring/web'
import { useState, useEffect } from 'react'
import SearchChip from './search_chip';

export default function MediumFilter({ chips, set_selected, selected_items, selected, unselected, bg_clour }) {

    const add_to_list = (sel_str) => {
        if (selected_items.includes(sel_str)) {
            set_selected(selected_items.filter(val => val !== sel_str));
        } else {
            set_selected([...selected_items, sel_str]);
        }
    }

    return (
        <div className={`flex w-full ${bg_clour} rounded-lg overflow-x-scroll hide-scroll`}>
            <div className={`cursor-pointer flex justify-center items-center z-40`}>

                {<div className={'flex justify-start w-full space-x-4 overflow-x-scroll hide-scroll relative h-full items-center p-4'} >
                {chips.map((val, index) => {
                return (
                    <SearchChip key={index} isSelected={selected_items.includes(val.toUpperCase())} onClick={()=>{add_to_list(val.toUpperCase())}} text={val} colour={selected_items.includes(val.toUpperCase()) ? selected: unselected}></SearchChip>
                )
                })}
                </div>}
                
            </div>
        </div>
    )

}