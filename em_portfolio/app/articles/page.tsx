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
}

const colorClasses = [
    {
      bg: "bg-purple-100",
      border: "border-purple-600",
      text: "text-purple-950",
      badge: "bg-purple-400"
    },
    {
      bg: "bg-yellow-100",
      border: "border-yellow-600",
      text: "text-yellow-950",
      badge: "bg-yellow-400"
    },
    {
      bg: "bg-blue-100",
      border: "border-blue-600",
      text: "text-blue-950",
      badge: "bg-blue-400"
    },
    {
      bg: "bg-indigo-100",
      border: "border-indigo-600",
      text: "text-indigo-950",
      badge: "bg-indigo-400"
    },
    {
      bg: "bg-pink-100",
      border: "border-pink-600",
      text: "text-pink-950",
      badge: "bg-pink-400"
    },
    {
      bg: "bg-green-100",
      border: "border-green-600",
      text: "text-green-950",
      badge: "bg-green-400"
    }
];

export default function WorkWithMe() {

    const [articles, set_articles] = useState<article[]>([])
    
    useEffect(() => {
  
        get_articles_meta(1, (data) => {

            console.log(data)

            const res = data.map((val: article)=>{
                try {

                    const images = val.images.map((val)=>{
                        const image_obj = {
                                Image:val
                        }

                        return getDisplayImageUrl(image_obj)
                    })

                    const newObj:article = {
                        documentId: val.documentId,
                        title: val.title,
                        description: val.description,
                        images: images,
                        updatedAt: new Date(val.updatedAt)
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

            <div className="space-y-4 w-full flex flex-col items-center">
                {articles.map((val, index)=>{
                    return(
                        <ArticleContainer 
                            key={val.documentId}
                            documentId={val.documentId}
                            colours={colorClasses[index]}
                            className={`max-w-prose px-4 py-2`}
                            title={val.title}
                            description={val.description}
                            updatedAt={val.updatedAt} />
                    )
                })}
            </div>
        
        </div>
    );
}