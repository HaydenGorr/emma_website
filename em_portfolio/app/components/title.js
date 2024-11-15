export default function Title({ text }) {
return (
	<div className="z-50 my-24 lg:my-20 h-fit w-fit rounded-3xl">
		<p className='md:text-6xl sm:text-5xl text-4xl font-extrabold'>{text}</p>
	</div>
)
}