'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import { get_portfolio_images } from "../utils/api";
import Masonry from 'react-masonry-css';

export default function Galleries() {
  const [images, set_images] = useState([]);
  const [showdesc, set_showdesc] = useState(null);

  useEffect(() => {
    get_portfolio_images((data) => {
      const formattedImages = data.map((image_obj) => ({
        title: image_obj?.title || 'No title available',
        date: image_obj?.updatedAt || 'No date available',
        description: image_obj?.description || 'No description available',
        medium: image_obj?.medium_theme?.medium || 'No medium available',
        theme: image_obj?.medium_theme?.theme || 'No theme available',
        image_urls: {
          size_display: `${process.env.NEXT_PUBLIC_BASE_URL}${image_obj?.Image?.formats?.medium?.url || ''}`,
          size_full: `${process.env.NEXT_PUBLIC_BASE_URL}${image_obj?.Image?.formats?.large?.url || ''}`
        }
      }));
      set_images(formattedImages);
    });
  }, []);
  

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };

  return (
    <div className="h-full flex flex-col overflow-hidden w-full items-center">
      <div className="overflow-y-scroll pb-36 hide-scroll pt-20 w-full">
        {images.length > 0 ? (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column">
            {images.map((val, index) => (
              <div key={index} className="px-12 md:max-w-80">
                <Image
                  className="w-full rounded-lg"
                  width={1000}
                  height={1000}
                  src={val.image_urls.size_display}
                  alt={val.description}
                  layout="responsive"
                  onClick={()=>{set_showdesc(!showdesc ? index : null)}}
                />
                <div className="flex mt-2 space-x-2">
                    <div className="bg-blue-smoke-100 px-3 py-1 rounded-full text-sm">{val.theme}</div>
                    <div className="bg-blue-smoke-100 px-3 py-1 rounded-full text-sm">{val.medium}</div>
                </div>
                {showdesc == index && <p className=" bg-blue-smoke-300 text-blue-smoke-950 rounded-lg mt-2 p-4">
                  {val.description}
                </p>}
              </div>
            ))}
          </Masonry>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
