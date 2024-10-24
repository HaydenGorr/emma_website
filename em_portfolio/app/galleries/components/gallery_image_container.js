import strings from '../../string_consts.json'
import Image from 'next/image';

export default function GalleryImageContainer({title, date, description, medium, theme, image_urls, showdesc, show_description_callback}) {
  return (
    <div className='w-full'>
        {/* <p className='py-1 text-lg font-medium'>{title}</p> */}

        <Image
            className="w-full rounded-lg"
            width={1000}
            height={1000}
            src={image_urls?.size_display || ''}
            alt={description}
            layout="responsive"
            onClick={()=>{show_description_callback()}}
        />
    
        {/* <div className='flex justify-between items-center pt-2 pb-1'>
            <p className='text-lg font-medium'>{title}</p>
            <div className="flex space-x-2 h-full">
                <div className="bg-blue-smoke-200 px-3 rounded-full text-sm">{theme}</div>
                <div className="bg-blue-smoke-200 px-3 rounded-full text-sm">{medium}</div>
            </div>
        </div>

        {showdesc && <p className=" bg-blue-smoke-300 text-blue-smoke-950 rounded-lg mt-2 p-4">
        {description}
        </p>} */}

    </div>
  );
}
