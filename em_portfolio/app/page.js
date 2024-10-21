import Image from "next/image";
import Main_page_header from "./components/main_page_header";

export default function Home() {
  return (
    <div className="h-full flex flex-col">
      <Main_page_header/>
      <div className="flex flex-grow w-full justify-center items-center">Emma Dann's portfolio website is in development</div>
    </div>
  );
}
