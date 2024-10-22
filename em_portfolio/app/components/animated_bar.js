import { useSpring, animated } from '@react-spring/web'
import { useState } from 'react'

export default function bar({ animate, colour }) {


  const springs = useSpring({
    from: { y: -100, opacity: 0 },
    to: animate
      ? [{ y: 0, opacity: 1 }]
      : { y: -100, opacity: 0 }
  });
  

  return (
    <animated.div
    className={`${colour} w-12 h-144`} style={{ ...springs }} />
  )
}


// function MyComponent() {
//     const springs = useSpring({
//       from: { x: 0 },
//       to: { x: 100 },
//     })
  
//     return (
//       <animated.div
//         style={{
//           width: 80,
//           height: 80,
//           background: '#ff6d6d',
//           borderRadius: 8,
//           ...springs
//         }}
//       />
//     )
//   }

// function MyComponent2() {
//     const [springs, api] = useSpring(() => ({
//         from: { x: 0 },
//     }))

//     const handleClick = () => {
//         api.start({
//             from: {
//                 x: 0,
//             },
//             to: {
//                 x: 100,
//             },
//         })
//     }

//     return (
//         <animated.div
//         onClick={handleClick}
//         style={{
//             width: 80,
//             height: 80,
//             background: '#ff6d6d',
//             borderRadius: 8,
//             ...springs
//         }}
//         />
//     )
// }