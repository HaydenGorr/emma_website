'use client'
import { timeAgo } from "../../utils/date_utils";
import Image from "next/image";
import { useSpring, animated } from "@react-spring/web";

const colorClasses = {
  "perfume": {
    bg: "bg-purple-100",
    border: "border-purple-600",
    text: "text-purple-950",
    badge: "bg-purple-400"
  },
  "sweet-corn": {
    bg: "bg-yellow-100",
    border: "border-yellow-600",
    text: "text-yellow-950",
    badge: "bg-yellow-400"
  },
  "blue-smoke": {
    bg: "bg-blue-100",
    border: "border-blue-600",
    text: "text-blue-950",
    badge: "bg-blue-400"
  },
  "matisse": {
    bg: "bg-indigo-100",
    border: "border-indigo-600",
    text: "text-indigo-950",
    badge: "bg-indigo-400"
  },
  "hibiscus": {
    bg: "bg-pink-100",
    border: "border-pink-600",
    text: "text-pink-950",
    badge: "bg-pink-400"
  },
  "magic-mint": {
    bg: "bg-green-100",
    border: "border-green-600",
    text: "text-green-950",
    badge: "bg-green-400"
  }
};

export default function YoutubeStats({ videos }) {
  const getColorClasses = (index) => {
    const colorNames = Object.keys(colorClasses);
    const colorName = colorNames[index % colorNames.length];
    return colorClasses[colorName];
  };

  const getSprings = (index) => {
    return (
      useSpring({
        from: {opacity: 0, transform: 'translateY(1rem)'},
        to: {  opacity: 1, transform: 'translateY(0rem)'},
        config: { tension: 100, friction: 12, mass: 1 },
        delay: 100 * index
      })
    )
  }

  return (
    <div className="flex flex-col mb-32 relative">
      <div className="self-center w-full lg:max-w-[55rem] space-y-16 px-4 z-50">
        {videos.map((val, index) => {
          const colors = getColorClasses(index);
          
          return (
            <animated.div 
              style={getSprings(index)}
              key={index} 
              className={`w-full p-4 flex rounded-3xl flex-col lg:flex-row shadow-strong ${colors.bg} ${
                val.keep_at_top ? `relative border ${colors.border}` : ""
              }`}
            >
              {/* Video Container */}
              <div
                className={`w-full lg:w-1/2 ${
                  index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'
                } self-center lg:self-start`}
              >
                <div className="relative aspect-w-16 aspect-h-9 bg-slate-100 rounded-2xl overflow-hidden">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${val.vid_id}`}
                    title={`YouTube video player ${index + 1}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* Text Content */}
              <div
                className={`w-full lg:w-1/2 ${colors.text} flex px-4 flex-col z-50 mt-4 mb-2 lg:mt-0 ${
                  index % 2 === 0 ? 'order-2' : 'order-1'
                }`}
              >
                <div className="flex md:flex-row lg:flex-col flex-col justify-between w-full">
                  <h1 className="md:order-1 order-2 lg:order-2 font-bold text-xl overflow-ellipsis whitespace-nowrap truncate">
                    {val.title}
                  </h1>
                </div>

                <div className="flex flex-col flex-grow">
                  <p className="my-4 break-all flex-grow overflow-ellipsis">
                    {val.description}
                  </p>

                  <div className="flex justify-between">
                    <p className={`text-xs self-start lg:self-start md:self-center py-1 whitespace-nowrap px-4 w-fit h-fit text-center ${colors.badge} rounded-full`}>
                      {timeAgo(val.date)}
                    </p>

                    {val.keep_at_top && (
                      <Image width={25} height={25} className="h-5 w-5 my-auto" src="/icons/star.png" alt="Star icon" />
                    )}

                  </div>
                </div>
              </div>
            </animated.div>
          );
        })}
      </div>
    </div>
  );
}