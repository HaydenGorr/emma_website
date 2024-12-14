'use client'
import { timeAgo } from "../../utils/date_utils"
import { usePathname, useRouter } from 'next/navigation';

export default function ArticleContainer({ className="", title, description, updatedAt, colours, documentId }) {
    const router = useRouter();

    const open_article = () =>{
        router.push(`/article/${documentId}`);
    }

    return (
        <div className={`${className} w-full rounded-lg border-2 ${colours.border} ${colours.bg}`}>
            <p className={`text-xl font-semibold ${colours.text}`}>{title}</p>
            <p className={`line-clamp-3 mt-2 ${colours.text}`}>{description}</p>
            <div className="w-full flex justify-between items-end">
                <button 
                onClick={()=>{open_article()}}
                className={`${colours.badge} rounded-lg px-4 py-2 text-white mt-4 hover:scale-105 transition-all hover:shadow-strongs`}>Read</button>
                <p className="text-sm">{timeAgo(updatedAt)}</p>
            </div>

        </div>
    )

}