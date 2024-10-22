'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import NavBar from "../components/nav_bar";
import { get_portfolio_images } from "../utils/api";

export default function Galleries() {

  const [page, set_page] = useState("/galleries")
  const [images, set_images] = useState([])

    useEffect(() => {
        get_portfolio_images((data) => {
            set_images(data.map((image_obj, index) => {
                return {
                    title: image_obj.title,
                    date: image_obj.updatedAt,
                    description: image_obj.description,
                    image_urls: {
                        size_display: `${process.env.NEXT_PUBLIC_BASE_URL}${image_obj.Image.formats.medium.url}`,
                        size_full: `${process.env.NEXT_PUBLIC_BASE_URL}${image_obj.Image.formats.large.url}`
                    }
                }
            }))
        })
    }, []);


    const initialNode = {
        direction: 'row', // Can be 'row' or 'column'
        first: 'window1',
        second: {
          direction: 'column',
          first: 'window2',
          second: 'window3',
        },
        splitPercentage: 50, // The initial split percentage
      };

    return (
        <div className="h-full flex flex-col overflow-hidden w-full items-center">


            <div className="max-w-prose overflow-y-scroll">
                {images.map((val, index) => {
                return (<div key={index}>
                    <Image
                    className="w-144"
                    layout="intrinsic"
                    width={0}
                    height={0}
                    src={val.image_urls.size_display}
                    alt={``}
                    />
                </div>)
                })}
            </div>
            


            <div className="fixed bottom-0 flex w-full">
                <NavBar page={page} set_page={set_page}/>
            </div>
        </div>
    );
}
