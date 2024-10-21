import localFont from "next/font/local";
import "./globals.css";
import Em_footer from "./components/footer";

export const metadata = {
  title: "Emma Dann Portfolio",
  description: "Emma Dann's portfolio website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Carrois+Gothic+SC&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet"/>
      </head>
        
      <body className={`font-carrois w-screen h-screen flex flex-col bg-blue-smoke-50 text-blue-smoke-950`} >

        <div className="flex-grow">
        {children}
        </div>

        <Em_footer></Em_footer>
  
      </body>

    </html>
  );
}
