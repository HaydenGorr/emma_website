import { useSpring, animated } from '@react-spring/web'
import { useState } from 'react'

export default function OpenLink({ isOpen, onClose }) {

    if (!isOpen) return null;

    return (
        <div className='fixed w-screen h-screenz-50 inset-0 flex justify-center items-center'>
            <div className='bg-red-500 opacity-100 rounded-lg p-4 space-y-2'>
                <h1>Open instaram link?</h1>
                <div className='space-x-4'>
                    <button className='bg-red-200 px-2 rounded-full'>yes</button>
                    <button className='bg-red-200 px-2 rounded-full'>close</button>
                </div>
            </div>
        </div>
    )
}
