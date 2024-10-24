import { useSpring, animated } from '@react-spring/web'
import { useState } from 'react'

export default function ImageSkeleton({ h, w }) {

  return (
    <div role="status" class="animate-pulse w-full">
        <div class={`${h} bg-blue-smoke-100 rounded-lg dark:bg-blue-smoke-200 mb-4`}></div>
    </div>
  )
}