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
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import ImageSkeleton from "./components/image_skeleton";
import { getFullImageUrl, getDisplayImageUrl } from "../utils/getimageurl";

export default function Galleries() {

  const [images, set_images] = useState([]);
  const [display_images, set_display_images] = useState([]);
  const [showdesc, set_showdesc] = useState(null);
  const [selected_themes, set_selected_theme] = useState([]);
  const [selected_mediums, set_selected_medium] = useState([]);
  const [loading, set_loading] = useState(true);

  const [Themes_chips, set_Themes_chips] = useState([]);
  const [Medium_chips, set_Medium_chips] = useState([]);

  /** Used to show images once they've loaded
   * The loaded state var won't do because it toggled on load
   * But we want to animate the transition, so using loaded
   * will make the gui snap from loading to loaded states
   */
  const [show_images, set_show_images] = useState(false); 

  const springs = useSpring({
    from: { opacity: 0 },
    to: show_images ? { opacity: 1 } : { opacity: 0 },
    config: { duration: 500 }
  });

  const springs2 = useSpring({
    from: { opacity: 0.5 },
    to: !loading ? { opacity: 1 } : { opacity: 0.5 },
  });

  const loadingSpring = useSpring({
    from: { opacity: 1 },
    to: !loading ? { opacity: 0 } : { opacity: 1 },
    config: { duration: 500 }
});

  useEffect(() => {

    if (loading) return

    setTimeout(() => {
      set_show_images(true)
    }, 500)

  }, [loading]);


  useEffect(() => {
    set_loading(true)
    get_portfolio_images((data) => {

      var formattedImages = []

      var unique_themes = []
      var unique_mediums = []


      for (let image_obj of data) {
        if (!(image_obj?.Image?.formats?.medium?.url)) console.log(image_obj)

        formattedImages.push({
          title: image_obj?.Title || 'No title available',
          date: image_obj?.updatedAt || 'No date available',
          description: image_obj?.description || 'No description available',
          medium: image_obj?.medium_theme?.medium || 'uncategorised',
          theme: image_obj?.medium_theme?.theme || 'uncategorised',
          image_urls: {
            size_display: `${process.env.NEXT_PUBLIC_BASE_URL}/${getDisplayImageUrl(image_obj)}`,
            size_full: `${process.env.NEXT_PUBLIC_BASE_URL}/${getFullImageUrl(image_obj)}`
          }
        })
        
        if ( !unique_themes.includes(image_obj?.medium_theme?.theme) && image_obj?.medium_theme?.theme) unique_themes.push(image_obj?.medium_theme?.theme)
        if ( !unique_mediums.includes(image_obj?.medium_theme?.medium) && image_obj?.medium_theme?.medium) unique_mediums.push(image_obj?.medium_theme?.medium)

      }

      console.log(unique_themes, unique_mediums)

      set_Themes_chips(unique_themes)
      set_Medium_chips(unique_mediums)

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
    <div className="h-full flex flex-col w-full items-center overflow-y-scroll relative overflow-hidden">

      <animated.div className="absolute inset-0 pointer-events-none z-0" style={{...springs2}}>
        <AnimatedBar colour="bg-sweet-corn-400" positionOffset={0} />
        <AnimatedBar colour="bg-pancho-400" positionOffset={8} />
        <AnimatedBar colour="bg-perfume-400" positionOffset={16} />
      </animated.div>

      <p className='md:text-5xl sm:text-5xl text-4xl font-extrabold font-header py-20 lg:py-20 sticky'>Gallery</p>

      <div className="filters flex flex-col space-y-8 text-lg font-medium max-w-prose w-full px-4 z-50">
        {!show_images && <animated.div style={{...loadingSpring}} className="space-y-8">
          <ImageSkeleton h={"h-16"}></ImageSkeleton>
          <ImageSkeleton h={"h-16"}></ImageSkeleton>
        </animated.div>}

          {show_images && <div style={{...springs}} className="space-y-8">
            <MediumFilter chips={Medium_chips} set_selected={set_selected_medium} selected_items={selected_mediums} bg_clour={"bg-pancho-300"} unselected={"bg-pancho-200"} selected={"bg-pancho-400"}/>
            <MediumFilter chips={Themes_chips} set_selected={set_selected_theme} selected_items={selected_themes} bg_clour={"bg-perfume-300"} unselected={"bg-perfume-200"} selected={"bg-perfume-400"}/>
          </div>}

      </div>

      <div className="pb-36 hide-scroll pt-20 w-full z-50" style={{maxWidth: '80rem'}}>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid flex justify-center w-full pl-3">
            {show_images ? display_images.map((val, index) => (
              <animated.div key={index} className="w-full flex items-center px-8 pb-16" style={{...springs}}>
                <GalleryImageContainer {...val} show_description_callback={set_showdesc} showdesc={showdesc == index} />
              </animated.div>
            )) :
              
            [1,2,3,4,5,6].map((val, index) => (
              <animated.div key={index} className="w-full flex items-center justify-center px-8 pb-16"
              style={{...loadingSpring}}>
                <ImageSkeleton  h={"h-80"} />
              </animated.div>
            ))

            }
          </Masonry>
      </div>
    </div>
  );
}
