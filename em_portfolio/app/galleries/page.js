'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import { get_portfolio_images } from "../utils/api";
import Masonry from 'react-masonry-css';
import GalleryImageContainer from "../components/gallery_image_container";

export default function Galleries() {
  const [images, set_images] = useState([]);
  const [showdesc, set_showdesc] = useState(null);

  useEffect(() => {

    get_portfolio_images((data) => {
      const formattedImages = data.map((image_obj) => ({
        title: image_obj?.Title || 'No title available',
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

  const set_clicked_image = (index) =>{
    show_description_callback(!showdesc ? index : null)
  }

  return (
    <div className="h-full flex flex-col overflow-hidden w-full items-center">
      <div className="overflow-y-scroll pb-36 hide-scroll pt-20 w-full" style={{maxWidth: '100rem'}}>
        {images.length > 0 ? (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid flex">
            {images.map((val, index) => (
              <div key={index} className="w-full flex items-center px-8 pb-8">
                <GalleryImageContainer {...val} show_description_callback={set_showdesc} showdesc={showdesc == index} />
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
