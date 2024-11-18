import { useSpring, animated } from '@react-spring/web';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import ThreeDots from 'react-loading-icons/dist/esm/components/three-dots';
import Title from '../../components/title';

interface props {
	url: string;
	already_loaded: boolean;
	title: string;
	description: string;
	medium: string;
	theme: string;
	old_url: string;
	close: () => void
}

export default function FullDisplay({close, url, already_loaded, title, description, medium, theme, old_url=""}: props) {

	const contRef = useRef<HTMLDivElement>(null);
	const fullRescontRef = useRef<HTMLDivElement>(null);
	const [containerWidth, setContainerWidth] = useState<number>(0);
	const [showInfo, setshowInfo] = useState<boolean>(false);

	const [showFullRes, set_showFullRes] = useState<boolean>(false)

	const springs = useSpring({
		from: {  Opacity: 0 },
		to: {  Opacity: 1 },
		config: { tension: 50, friction: 10, mass: 1},
		delay: 1000
	});

	const sign_springs = useSpring({
		from: { transform: 'translateY(-5rem)', opacity: 0 },
		to: !showFullRes 
			? { transform: 'translateY(0rem)', opacity: 1 }
			: { transform: 'translateY(-5rem)', opacity: 0 },
		config: { tension: 25, friction: 20, mass: 1 },
		delay: 300
	});

	const info_springs = useSpring({
		height: showInfo ? `24rem` : '-1rem',
		opacity: showInfo ? 1 : 0,
		paddingLeft: '1rem',
		paddingRight: '1rem',
		paddingTop: showInfo ? '1rem' : '0rem',
		paddingBottom: showInfo ? '1rem' : '0rem',
		config: { tension: 50, friction: 10, mass: 1 },
	  });

	useEffect(() => {
		setTimeout(() => {
		  window.scrollTo(0, 1);
		}, 0);
	  }, []);

	useEffect(() => {

		if (showFullRes ? fullRescontRef.current : contRef.current) {
		  const updateWidth = () => {
			setContainerWidth(showFullRes ? fullRescontRef.current.offsetWidth || 0 : contRef.current.offsetWidth || 0);
		  };
		  
		  updateWidth();
		  window.addEventListener('resize', updateWidth);
		  
		  return () => window.removeEventListener('resize', updateWidth);
		}
	  }, []);

	return (
		<animated.div className='fixed inset-0 w-screen h-screen backdrop-blur-3xl bg-black/80' style={{zIndex: 998, ...springs}}>

			<Image className={"cursor-pointer absolute right-2 top-2 h-6 w-6"} alt={""} width={50} height={50} src={"/icons/close.png"} onClick={() => close()}/>
			
				<div className='fixed inset-4'>
					<div className="relative h-full flex items-center justify-center flex-col max-h-screen">

						<div ref={contRef} >
							<img
								alt='mid-res image'
								src={old_url}
								className={`object-contain rounded-3xl shadow-strong max-h-full max-w-full ${showFullRes ? "hidden" : "visible"}`}
							/>
						</div>

						<div ref={fullRescontRef}>
							<img
								alt='full-res image'
								src={url}
								className={`object-contain rounded-3xl shadow-strong max-h-full max-w-full ${showFullRes ? "visible" : "hidden"}`}
								onLoad={() => (set_showFullRes(true))}
							/>
						</div>

						{(description!="No description available" || title!="No title available") &&
						<div className='fixed bottom-0 flex justify-center flex-col items-center space-y-4 px-4 w-full'>
							<button className='bg-hibiscus-100 text-hibiscus-900 px-2 py-1 rounded-lg flex space-x-2 w-fit' onClick={() => {setshowInfo(!showInfo)}}>
								<p>{showInfo ? "close description" : "see description"}</p>
								<Image alt={"click icon"} src={"/icons/cursor.png"} width={20} height={20} className="object-cover m-0"/>
							</button>
							{<animated.div className='max-w-prose w-full bg-magic-mint-100 p-4 rounded-t-lg flex flex-col' style={{...info_springs}}>
								<div className='flex-grow'>
									<h1 className='self-center text-lg font-bold whitespace-normal break-words overflow-wrap-anywhere pb-2'>{title}</h1>
									<p className='whitespace-normal break-words overflow-wrap-anywhere'>{description}</p>
								</div>

								<div className='flex space-x-4'>
									<div className='bg-magic-mint-200 w-fit p-2 rounded-lg text-sm'>{theme}</div>
									<div className='bg-magic-mint-200 w-fit p-2 rounded-lg text-sm'>{medium}</div>
								</div>
							</animated.div>}

						</div>}



				</div>

			</div>

			{	
			<div className='w-full flex items-center justify-center'>
				<animated.div className='bg-perfume-200 text-perfume-700 w-fit h-fit py-2 px-4 rounded-full fixed bottom-4 flex' style={{...sign_springs}}>
					<p>loading higher resolution</p>
					<ThreeDots className='h-6 w-6 ml-4' fill='#7d24a7' speed={.5}/>
				</animated.div>
			</div>
			}

		</animated.div>
	)
}
