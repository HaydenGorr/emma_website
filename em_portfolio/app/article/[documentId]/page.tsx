'use client'
import { timeAgo } from "../../utils/date_utils"
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
    const [updatedAt, set_updatedAt] = useState<string>("")

    useEffect(() => {
        console.log("iukmhjm", documentId)
        get_full_article(documentId, (data) => {

          set_title(data.data.title)
          set_text(data.data.text)
          set_written_by(data.data.written_by)

          // Set images
          const image_urls = data.data.images.map((val)=>{
            const image_obj = {
              Image:val
            }
            return getDisplayImageUrl(image_obj)
          })

          console.log(image_urls)
          set_images(image_urls)

        })
    
        }, []);

    return (
        <div className={`flex flex-col items-center`}>
            <Title className="max-w-[60rem] mx-4" text={title}/>
            <div className="flex space-x-2 overflow-x-auto pb-4">
              {images.map((image_src, index) => (
                <div key={index} className="flex-none p-4 w-full">
                  <img
                    alt="display image"
                    className={`${images.length == 1 ? '' : 'h-80 w-auto'} max-h-80 object-contain rounded-lg`}
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/${image_src}`}
                  />
                </div>
              ))}
            </div>
            <Markdown className="prose prose-stone px-4" remarkPlugins={[remarkGfm]}>{text}</Markdown>
        </div>
    )

}