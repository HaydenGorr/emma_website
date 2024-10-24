'use client';
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { get_portfolio_images } from "../utils/api";
import Masonry from 'react-masonry-css';
import GalleryImageContainer from "./components/gallery_image_container";
import { animated, useSpring} from '@react-spring/web'
import SearchChip from "./components/search_chip";
import AnimatedBar from './components/animated_bar';
import MediumFilter from "./components/medium_filter";

export default function Galleries() {

  const [images, set_images] = useState([]);
  const [display_images, set_display_images] = useState([]);
  const [showdesc, set_showdesc] = useState(null);
  const [selected_themes, set_selected_theme] = useState([]);
  const [selected_mediums, set_selected_medium] = useState([]);
  const [loading, set_loading] = useState(false);


  const [Themes_chips, set_Themes_chips] = useState([]);
  const [Medium_chips, set_Medium_chips] = useState([]);

  // const Themes_chips = ["Christianity", "Gender Neutralism", "Femininity", "Experimentalism", "Experimentalismsadasd"]
  // const Medium_chips = ["Drawings", "Paintings", "Sculpture", "Digital"]

  const ThemeRefs = useRef([]);
  const MediumRefs = useRef([]);

  // const [medium_open, set_medium_open] = useState(false);
  // const [theme_open, set_theme_open] = useState(false);

  useEffect(() => {
    set_loading(true)
    get_portfolio_images((data) => {

      var formattedImages = []

      var unique_themes = []
      var unique_mediums = []

      for (let image_obj of data) {
        formattedImages.push({
          title: image_obj?.Title || 'No title available',
          date: image_obj?.updatedAt || 'No date available',
          description: image_obj?.description || 'No description available',
          medium: image_obj?.medium_theme?.medium || 'uncategorised',
          theme: image_obj?.medium_theme?.theme || 'uncategorised',
          image_urls: {
            size_display: `${process.env.NEXT_PUBLIC_BASE_URL}${image_obj?.Image?.formats?.medium?.url || ''}`,
            size_full: `${process.env.NEXT_PUBLIC_BASE_URL}${image_obj?.Image?.formats?.large?.url || ''}`
          }
        })

        if ( !unique_themes.includes(image_obj?.medium_theme?.theme) ) unique_themes.push(image_obj?.medium_theme?.theme)
        if ( !unique_mediums.includes(image_obj?.medium_theme?.medium) ) unique_mediums.push(image_obj?.medium_theme?.medium)

      }

      set_Themes_chips(unique_themes)
      set_Medium_chips(unique_mediums)

      // const formattedImages = data.map((image_obj) => ({
      //   title: image_obj?.Title || 'No title available',
      //   date: image_obj?.updatedAt || 'No date available',
      //   description: image_obj?.description || 'No description available',
      //   medium: image_obj?.medium_theme?.medium || 'No medium available',
      //   theme: image_obj?.medium_theme?.theme || 'No theme available',
      //   image_urls: {
      //     size_display: `${process.env.NEXT_PUBLIC_BASE_URL}${image_obj?.Image?.formats?.medium?.url || ''}`,
      //     size_full: `${process.env.NEXT_PUBLIC_BASE_URL}${image_obj?.Image?.formats?.large?.url || ''}`
      //   }
      // }

        // ));
      set_images(formattedImages);
      set_display_images(formattedImages)
      set_loading(false)
    });
  }, []);


  useEffect(() => {
    if (selected_mediums.length == 0 && selected_themes.length == 0) {set_display_images(images); return}

    // const filteredImages = 
    set_display_images(images.filter((image, index) => {

      let res_theme = true
      if (selected_themes.length != 0){
        console.log("bfghbndfj")
        res_theme = selected_themes.includes(image.theme.toUpperCase())
        console.log(res_theme)

      }
      
      let res_medium = true
      if (selected_mediums.length != 0){
        console.log("asdqwdgf")
        res_medium = selected_mediums.includes(image.medium.toUpperCase())
      }
      console.log(res_theme && res_medium)
      return (res_theme && res_medium)



    }
    ));

  }, [selected_themes, selected_mediums]);
  

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };

  const set_clicked_image = (index) =>{
    show_description_callback(!showdesc ? index : null)
  }

  return (
    <div className="h-full flex flex-col overflow-hidden w-full items-center overflow-y-scroll">

      <div className="">
        <div className=" flex absolute rotate-90 space-x-4">
          {/* <AnimatedBar colour={'bg-sweet-corn-400'}></AnimatedBar>
          <AnimatedBar colour={'bg-pancho-400'}></AnimatedBar>
          <AnimatedBar colour={'bg-perfume-400'}></AnimatedBar> */}
        </div>
        <p className='md:text-5xl sm:text-5xl text-4xl font-extrabold font-header py-20 lg:py-20 sticky'>Gallery</p>
      </div>

      <div className="filters flex flex-col space-y-8 text-lg font-medium max-w-prose w-full px-4">

        <MediumFilter chips={Medium_chips} set_selected={set_selected_medium} selected_items={selected_mediums} bg_clour={"bg-pancho-300"} unselected={"bg-pancho-200"} selected={"bg-pancho-400"}/>
        <MediumFilter chips={Themes_chips} set_selected={set_selected_theme} selected_items={selected_themes} bg_clour={"bg-perfume-300"} unselected={"bg-perfume-200"} selected={"bg-perfume-400"}/>
      </div>

      <div className="pb-36 hide-scroll pt-20 w-full" style={{maxWidth: '80rem'}}>
        {!loading ? (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid flex">
            {display_images.map((val, index) => (
              <div key={index} className="w-full flex items-center px-8 pb-16">
                <GalleryImageContainer {...val} show_description_callback={set_showdesc} showdesc={showdesc == index} />
              </div>
            ))}
          </Masonry>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
