import strings from '../string_consts.json'
import Image from 'next/image';

export default function GalleryImageContainer({title, date, description, medium, theme, image_urls, showdesc, show_description_callback}) {
  return (
    <div className='w-full'>
        <Image
            className="w-full rounded-lg"
            width={1000}
            height={1000}
            src={image_urls.size_display}
            alt={description}
            layout="responsive"
            onClick={()=>{show_description_callback()}}
        />
        <div className="flex mt-2 space-x-2">
            <div className="bg-blue-smoke-100 px-3 py-1 rounded-full text-sm">{theme}</div>
            <div className="bg-blue-smoke-100 px-3 py-1 rounded-full text-sm">{medium}</div>
        </div>

        {showdesc && <p className=" bg-blue-smoke-300 text-blue-smoke-950 rounded-lg mt-2 p-4">
        {description}
        
        </p>}
    </div>
  );
}
