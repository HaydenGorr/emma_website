'use client'
import Main_page_header from "./components/main_page_header";
import { useState } from "react";

export default function Home() {

const [title, set_title] = useState("")
const [images, set_images] = useState([])
const [page, set_page] = useState("/")
const [connected, set_connected] = useState(false)

return (
    <div className="h-full flex flex-col overflow-hidden">
        <Main_page_header page={page}/>
    </div>
    );
}
