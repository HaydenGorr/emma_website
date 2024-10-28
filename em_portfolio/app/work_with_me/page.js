// import { useEffect, useState } from "react";
import Image from "next/image";
import { get_portfolio_images } from "../utils/api";
import { get_page_data_promise } from "../utils/api";

export const revalidate = Number(process.env.REVALIDATE);

export default async function WorkWithMe() {

    const data = await get_page_data_promise("work-with-me-page");
    const {
      image_src,
      emma_header,
      emma_section,
      hayden_header,
      hayden_section,
    } = data;

    return (
        <div className="h-full flex w-full items-center flex-col">


            <div className={`w-40 h-40 my-20 shadow-strong relative aspect-square rounded-lg overflow-hidden z-40`}>
                <Image
                src={`${process.env.NEXT_PUBLIC_BASE_URL}/${image_src}`}
                alt={'Square Image'}
                fill
                className="object-cover object-[-15%_10%]"
                />
            </div>

            <div className="max-w-prose w-full self-center space-y-4">

                <div className="bg-perfume-300 p-4 rounded-lg text-perfume-800 font-bold">
                    {emma_header}
                </div>
                <div className="h-fit w-full relative">
                    {emma_section}
                </div>

                <div className="bg-pancho-200 p-4 rounded-lg text-pancho-500 font-bold">
                    {hayden_header}
                </div>
                <div className="h-fit w-full relative">
                    {hayden_section}
                </div>

            </div>
        </div>
    );
}