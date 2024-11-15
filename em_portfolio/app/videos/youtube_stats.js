'use client'
import { useState } from "react";
import { timeAgo } from "../utils/date_utils";
import Image from "next/image";

const colours = ["perfume", "sweet-corn", "blue-smoke", "matisse", "hibiscus", "magic-mint" ]

export default function YoutubeStats({ videos }) {

    return (
        <div className="flex flex-col mb-32 relative">
           
            <div className="self-center w-full lg:max-w-[55rem] space-y-16 px-4 z-50">

                {videos.map((val, index) => (
                    <div key={index} className={`${val.keep_at_top ? `relative border border-${colours[index % colours.length]}-600` : ""} w-full p-4 flex bg-${colours[index % colours.length]}-100 rounded-3xl flex-col lg:flex-row shadow-strong`}>

                    {/* Video Container */}
                    <div
                      className={`w-full lg:w-1/2 ${
                        index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'
                      } self-center lg:self-start`}
                    >
                      <div className="relative aspect-w-16 aspect-h-9 bg-slate-100 rounded-2xl overflow-hidden">
                        <iframe
                          className="absolute top-0 left-0 w-full h-full"
                          src={`https://www.youtube.com/embed/${val.vid_id}`}
                          title={`YouTube video player ${index + 1}`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  
                    {/* Text Content */}
                    <div
                      className={`w-full lg:w-1/2 text-${colours[index % colours.length]}-950 flex px-4 flex-col z-50 mt-4 mb-2 lg:mt-0 ${
                        index % 2 === 0 ? 'order-2' : 'order-1'
                      }`}
                    >
                      <div className={`flex md:flex-row lg:flex-col flex-col justify-between w-full`}>
                        <h1 className="md:order-1 order-2 lg:order-2 font-bold text-xl overflow-ellipsis whitespace-nowrap truncate">
                          {val.title}
                        </h1>
                      </div>
                  
                      <div className="flex flex-col flex-grow">
                        <p className="my-4 break-all flex-grow overflow-ellipsis">
                          {val.description}
                        </p>

                        <div className="flex space-x-4">
                          {val.keep_at_top &&
                            <Image width={25} height={10} src={"/icons/star.png"}></Image>
                          }
                          <p className={`text-xs self-start lg:self-start md:self-center py-1 whitespace-nowrap px-4 w-fit h-fit text-center bg-${colours[index % colours.length]}-400 rounded-full`}>
                            {timeAgo(val.date)}
                          </p>

                        </div>
                      </div>
                    </div>
                  </div>
                  
                ))}

            </div>
        </div>
    );
}