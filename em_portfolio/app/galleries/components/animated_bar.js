// import { useSpring, animated } from '@react-spring/web';

// export default function AnimatedBar({ colour, positionOffset = 0 }) {
//   const springs = useSpring({
//     from: { scaleY: 0 },
//     to: { scaleY: 1 },
//     config: { tension: 30, friction: 5, mass: 1 },
//   });

//   return (
//     <animated.div
//       className={`${colour} absolute`}
//       style={{
//         width: '3rem',
//         height: '200%', // Ensure it's long enough to cover the viewport diagonally
//         transform: springs.scaleY.to(
//           (scaleY) => `translate(-0%, -50%) rotate(45deg) scaleY(${scaleY})`
//         ),
//         transformOrigin: 'top left',
//         top: '50%',
//         left: `calc(50% + ${positionOffset}rem)`, // Adjust position for multiple bars
//       }}
//     />
//   );
// }


import { useSpring, animated } from '@react-spring/web';

export default function AnimatedBar({ colour, positionOffset = 0 }) {
  const springs = useSpring({
    from: { scaleX: 0 },
    to: { scaleX: 1 },
    config: { tension: 50, friction: 10, mass: 1 },
  });

  return (
    <animated.div
      className={`${colour} absolute`}
      style={{
        width: '200%', // Ensure it covers the screen when rotated
        height: '3rem', // Fixed height
        transform: springs.scaleX.to(
          (scaleX) => `rotate(45deg) scaleX(${scaleX})`
        ),
        transformOrigin: 'top left',
        top: `${positionOffset}rem`, // Adjust top position for spacing
        left: 0,
      }}
    />
  );
}
