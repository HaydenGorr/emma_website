'use client'
import { timeAgo, areDatesEqualIgnoringSeconds, formatDateTime } from "../../utils/date_utils"
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { get_full_article } from "../../utils/api";
import Title from "../../components/title";
import Markdown from "react-markdown";
import { getDisplayImageUrl } from "../../utils/getimageurl";
import remarkGfm from "remark-gfm";

type PageProps = {
    params: {
      documentId: string;
    };
  };

  export default function ArticlePage({ params }: PageProps) {
    const router = useRouter();
    const { documentId } = params;
    const [title, set_title] = useState<string>("")
    const [text, set_text] = useState<string>("")
    const [images, set_images] = useState<string[]>([])
    const [written_by, set_written_by] = useState<string>("")
    const [updatedAt, set_updatedAt] = useState<Date>()
    const [createdOn, set_createdOn] = useState<Date>()
    const [beenUpdatedAfterPublish, set_beenUpdatedAfterPublish] = useState<boolean>()

    const [finished_loading, set_finished_loading] = useState<boolean>(false)

    useEffect(() => {
        console.log("iukmhjm", documentId)
        get_full_article(documentId, (data) => {
          console.log(data)

          set_title(data.data.title)
          set_text(data.data.text)
          set_written_by(data.data.written_by)
          const update_date = new Date(data.data.updatedAt) 
          const create_date = new Date(data.data.createdAt) 
          set_updatedAt(update_date)
          set_createdOn(create_date)

          set_beenUpdatedAfterPublish(!areDatesEqualIgnoringSeconds(update_date, create_date))

          // Set images
          const image_urls = data.data.images.map((val)=>{
            const image_obj = {
              Image:val
            }
            return getDisplayImageUrl(image_obj)
          })

          console.log(image_urls)
          set_images(image_urls)
          set_finished_loading(true)

        })
    
        }, []);

    return (
      <div>
        {finished_loading && <div className={`flex flex-col items-center`}>
            <Title className="max-w-[60rem] mx-4 mb-16" text={title}/>
            <div className="flex space-x-2 overflow-x-auto pb-4">
              {images.map((image_src, index) => (
                <div key={index} className={`flex-none p-4 ${images.length == 1 ? 'w-full' : ''}`}>
                  <img
                    alt="display image"
                    className={`${images.length == 1 ? '' : 'h-80 w-auto'} max-h-80 object-contain rounded-lg`}
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/${image_src}`}
                  />
                </div>
              ))}
            </div>
            <Markdown className="prose prose-stone px-4 w-full max-w-prose" remarkPlugins={[remarkGfm]}>{text}</Markdown>

            <p className="mt-16 mb-2 px-4 py-2 rounded-lg bg-hibiscus-400 text-white font-semibold">{`Written by ${written_by}`}</p>

            <div className="flex space-x-4 mt-4 mx-4">
              <p className="mb-8 px-4 py-2 rounded-lg bg-hibiscus-400 text-white font-semibold">{`published ${formatDateTime(createdOn)}`}</p>
              {beenUpdatedAfterPublish && <p className="mb-8 px-4 py-2 rounded-lg bg-hibiscus-400 text-white font-semibold">{`last updated ${formatDateTime(updatedAt)}`}</p>}

            </div>
            
        </div>}

        <div>

        </div>
      </div>
    )

}