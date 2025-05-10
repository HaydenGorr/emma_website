'use client'
import { get_articles_meta } from "../utils/api";
import { useEffect, useState } from "react";
import Title from "../components/title";
import ArticleContainer from "./components/container";
import { getDisplayImageUrl } from "../utils/getimageurl";

// export const revalidate = Number(process.env.REVALIDATE);

interface article {
    documentId: number,
    title: string,
    description: string,
    images: any,
    updatedAt: Date,
    createdAt: Date,
}

const colorClasses = [
    {
      bg: "bg-baby-blue-300",
      border: "bg-baby-blue-300",
      text: "text-black",
      badge: "bg-dusk-blue-400"
    },
    {
        bg: "bg-baby-blue-300",
        border: "bg-baby-blue-300",
        text: "text-black",
        badge: "bg-dusk-blue-400"
      },
      {
        bg: "bg-baby-blue-300",
        border: "bg-baby-blue-300",
        text: "text-black",
        badge: "bg-dusk-blue-400"
      },
      {
        bg: "bg-baby-blue-300",
        border: "bg-baby-blue-300",
        text: "text-black",
        badge: "bg-dusk-blue-400"
      },
      {
        bg: "bg-baby-blue-300",
        border: "bg-baby-blue-300",
        text: "text-black",
        badge: "bg-dusk-blue-400"
      },
      {
        bg: "bg-baby-blue-300",
        border: "bg-baby-blue-300",
        text: "text-black",
        badge: "bg-dusk-blue-400"
      }
];

export default function WorkWithMe() {

    const [articles, set_articles] = useState<article[]>([])
    
    useEffect(() => {
  
        get_articles_meta(1, (data) => {

            const res = data.map((val: article, index)=>{
                try {

                    const images = []
                    
                    if (val.images) val.images.map((val)=>{
                        const image_obj = {
                                Image:val
                        }

                        const url = getDisplayImageUrl(image_obj)
                        images.push(url)
                    })

                    const newObj:article = {
                        documentId: val.documentId,
                        title: val.title,
                        description: val.description,
                        images: images,
                        updatedAt: new Date(val.updatedAt),
                        createdAt: new Date(val.createdAt)
                    }

                    return newObj
                }
                catch{
                    console.log("could not add an article due to incomplete data")
                }

            })

            set_articles(res)

        })
    
      }, []);
    return (
        <div className={`h-full w-full items-center flex flex-col`}>
            <Title text={"Articles"}></Title>

            <div className="space-y-4 w-full flex flex-col items-center px-4">
                {articles.map((val, index)=>{
                    return(
                        <ArticleContainer 
                            key={val.documentId}
                            documentId={val.documentId}
                            colours={colorClasses[index % (colorClasses.length-1)]}
                            className={`max-w-prose px-4 py-2`}
                            title={val.title}
                            description={val.description}
                            updatedAt={val.createdAt} />
                    )
                })}
            </div>
        
        </div>
    );
}