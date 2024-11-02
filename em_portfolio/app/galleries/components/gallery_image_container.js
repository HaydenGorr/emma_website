import Image from 'next/image';
import { animated, useSpring } from '@react-spring/web';
import { useEffect, useState, useRef } from 'react';

export default function GalleryImageContainer({
  title,
  date,
  description,
  medium,
  theme,
  image_urls,
  showdesc,
  show_description_callback,
  expanded,
  set_expanded_image_index,
  index,
  children,
}) {
  const infoBoxRef = useRef(null);
  const imageRef = useRef(null);

  const [image_height, set_image_height] = useState(200);
  const [image_width, set_image_width] = useState(200);

  const [naturalWidth, setNaturalWidth] = useState(0);
  const [naturalHeight, setNaturalHeight] = useState(0);

  const [infoBoxHeight, setInfoBoxHeight] = useState('0px');

  const [focus, set_focus] = useState('');
  const [mouseover, set_mouseover] = useState(false);

  const springs = useSpring({
    from: { scale: 0.9, y: -100, opacity: 0, height: '0px', marginBottom: '0px' },
    to: {
      scale: focus ? 1 : 0.9,
      y: focus ? 0 : -100,
      opacity: focus ? 1 : 0,
      height: focus ? infoBoxHeight : '0px',
      marginBottom: focus ? '16px' : '0px',
    },
    config: { tension: 100, friction: 12, mass: 1 },
  });

  const containerHover = useSpring({
    from: { scale: 1 },
    to: { scale: mouseover ? 1.03 : 1 },
  });

  useEffect(() => {
    // Update the height when focus changes
    if (focus && infoBoxRef.current) {
      setInfoBoxHeight(`${infoBoxRef.current.scrollHeight + 16}px`);
    } else {
      setInfoBoxHeight('0px');
    }
  }, [focus]);

  useEffect(() => {
    // Add event listener for window resize
    window.addEventListener('resize', calculate_expanded_size);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', calculate_expanded_size);
    };
  }, [expanded, naturalWidth, naturalHeight]);

  const margin = 2 * 16; // 4 rem

  const calculate_expanded_size = () => {
    if (!naturalWidth || !naturalHeight) return;

    const aspectRatio = naturalWidth / naturalHeight;

    if (!expanded) {
      set_image_width(200);
      set_image_height(200 / aspectRatio);
      return;
    }

    const winWidth = window.innerWidth - margin * 2;
    const winHeight = window.innerHeight - margin * 2;
    const windowAspectRatio = winWidth / winHeight;

    let new_width, new_height;

    if (aspectRatio > windowAspectRatio) {
      // Image is wider than the window
      new_width = winWidth;
      new_height = winWidth / aspectRatio;
    } else {
      // Image is taller than the window
      new_height = winHeight;
      new_width = winHeight * aspectRatio;
    }

    set_image_width(new_width);
    set_image_height(new_height);
  };

  useEffect(() => {
    calculate_expanded_size();
  }, [expanded, naturalWidth, naturalHeight]);

  return (
    <animated.div
      className={`w-full rounded-lg overflow-visible relative ${expanded ? 'z-50' : 'z-40'}`}
      onMouseOver={() => set_mouseover(true)}
      onMouseOut={() => set_mouseover(false)}
      style={{ width: `${image_width}px`, height: `${image_height}px` }}
    >
      <div className='flex flex-col'>
        <Image
          ref={imageRef}
          className="rounded-lg shadow-strong object-contain"
          fill
          src={image_urls?.size_display || '/default-image.png'}
          alt={description}
          style={{ zIndex: 50, objectFit: 'contain' }}
          onLoadingComplete={({ naturalWidth, naturalHeight }) => {
            setNaturalWidth(naturalWidth);
            setNaturalHeight(naturalHeight);
          }}
        />

        <div className="absolute top-16 right-4 space-y-16 z-50">
          <button className="h-7 w-7 relative" onClick={() => show_description_callback()}>
            <div className="h-7 w-7 backdrop-blur-md bg-white/30 rounded-full shadow-strong"/>
            <Image
              src="/icons/cursor.png"
              fill
              className="object-cover m-0 scale-75 opacity-80"
            />
          </button>

          <button className="h-7 w-7 relative" onClick={() => set_expanded_image_index(expanded ? null : index)}>
            <div className="h-7 w-7 backdrop-blur-md bg-white/30 rounded-full shadow-strong"/>
            <Image
              src="/icons/expand.png"
              fill
              className="object-cover m-0 scale-50 opacity-80"
            />
          </button>
        </div>

        <div className='h-1 w-full bg-red-600'>asd</div>
      </div>

      <animated.div
        className="mt-2 bg-pancho-300 text-pancho-900 p-4 rounded-lg relative flex flex-col justify-between"
        style={{ ...springs, zIndex: 30, transformOrigin: 'top' }}
        ref={infoBoxRef}
      >
        <div className="font-semibold pb-2">{title}</div>
        <div>{description}</div>
      </animated.div>
    </animated.div>
  );
}
