import "./globals.css";
import Em_footer from "./components/footer";
import NavBar from "./components/nav_bar";


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
            
        <body className={`font-main w-screen h-screen flex flex-col bg-black text-blue-smoke-950`} >

            <div className="flex-grow h-32 m-2 bg-blue-smoke-50 rounded-2xl">
            {children}
            </div>
    
        </body>

        </html>
    );

}
