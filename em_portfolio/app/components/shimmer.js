import React from 'react';
import Image from 'next/image';

const Shimmer = ({ keepAtTop = true }) => {
  return (
    <div className="">
      {keepAtTop && (
        <div className="absolute top-0 left-0 z-50 w-full h-full overflow-hidden">
          <div className="relative w-full h-full">
            <div 
              className="absolute inset-0 animate-shimmer"
              style={{
                maskImage: 'linear-gradient(90deg, transparent 0%, white 45%, white 55%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, white 45%, white 55%, transparent 100%)',
                maskSize: '200% 100%',
                WebkitMaskSize: '200% 100%',
                opacity: '0.5',
              }}
            >
              <Image 
                src="/sparkle.png" 
                alt="sparkle effect"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shimmer;