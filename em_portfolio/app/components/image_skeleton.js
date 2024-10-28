import { useSpring, animated } from '@react-spring/web'
import { useState } from 'react'

export default function ImageSkeleton({ h, w }) {

  return (
    <div role="status" className={`animate-pulse ${h} w-full`}>
        <div className={`w-full h-full bg-blue-smoke-100 rounded-lg dark:bg-blue-smoke-200 mb-4`}></div>
    </div>
  )
}