import "./globals.css";
import NavBar from "./components/nav_bar";
import DecorativeLines from "./components/decorative_lines";

export const metadata = {
  title: "Emma Dann Portfolio",
  description: "Emma Dann's portfolio website",
};

export default function RootLayout({ children }) {
  
    return (
        <html lang="en">
        <head>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
            <link href="https://fonts.googleapis.com/css2?family=Carrois+Gothic+SC&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Rethink+Sans:ital,wght@0,400..800;1,400..800&display=swap" rel="stylesheet"/>
        </head>
            
        <body className={`font-main w-screen h-screen flex flex-col bg-blue-smoke-50 text-blue-smoke-950`} >
        
            <div className="flex-grow bg-blue-smoke-50 relative overflow-x-hidden pb-32">
                {children}
                <DecorativeLines/>
            </div>
    
            <div className="fixed bottom-0 flex w-full z-50 overflow-hidden">
                <NavBar/>
            </div>
        </body>

        </html>
    );

}
