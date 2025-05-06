import React, { useEffect, useState } from 'react'
// import image1 from '../assest/banner/img1.webp'
// import image2 from '../assest/banner/img2.webp'
// import image3 from '../assest/banner/img3.jpg'
// import image4 from '../assest/banner/img4.jpg'
// import image5 from '../assest/banner/img5.webp'
// import image6 from '../assest/banner/img.png.jpg'

import imageb1 from '../assest/banner/1.jpg'
import imageb2 from '../assest/banner/2.jpg'
import imageb3 from '../assest/banner/3.jpg'
import imageb4 from '../assest/banner/4.jpg'
import image6 from '../assest/banner/img.png.jpg'


// import imageMobile1 from '../assest/banner/img1_mobile.jpg'
// import imageMobile2 from '../assest/banner/img2_mobile.webp'
// import imageMobile3 from '../assest/banner/img3_mobile.jpg'
// import imageMobile4 from '../assest/banner/img4_mobile.jpg'
// import imageMobile5 from '../assest/banner/img5_mobile.png'
// import imageMobile6 from '../assest/banner/img6_mobile.jpg'

import MobileIm from '../assest/banner/mobile1.jpg'
import MobileIm2 from '../assest/banner/mobile2.jpg'
import MobileIm3 from '../assest/banner/mobile3.jpg'
import MobileIm4 from '../assest/banner/mobile4.jpg'


import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0)

  const desktopImages = [
    // image1,
    // image2,
    // image3,
    // image4,
    // image5,
    image6,
    imageb1,
    imageb2,
    imageb3,
    imageb4
  ]
  const MobileImages = [
    // imageMobile1,
    // imageMobile2,
    // imageMobile3,
    // imageMobile4,
    // imageMobile5,
    // imageMobile6
    MobileIm,
    MobileIm2,
    MobileIm3,
    MobileIm4
  ]
  const nextImage = () => {
    if (desktopImages.length - 1 > currentImage) {
      setCurrentImage(preve => preve + 1)
    }
  }
  const prevImage = () => {
    if (currentImage !== 0) {
      setCurrentImage(preve => preve - 1)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (desktopImages.length - 1 > currentImage) {
        nextImage()
      }
      else {
        setCurrentImage(0)
      }
    }, 5000)

    return () => {
      clearInterval(interval)
    }

  }, [currentImage])

  return (
    <div className='p-4 mx-auto'>
    <div className="">
      <div className='h-56 md:h-72 w-full bg-slate-200 relative group'>
  
        {/* Navigation Arrows */}
        <div className='absolute z-10 h-full w-full hidden md:flex items-center px-4'>
          <div className='flex justify-between w-full'>
            <button 
              onClick={prevImage}
              className='bg-white/90 backdrop-blur-sm shadow-lg p-3 rounded-full hover:scale-110 
                       transition-all duration-300 hover:shadow-xl hover:bg-white'
            >
              <FaAngleLeft className='text-xl text-gray-800' />
            </button>
            <button 
              onClick={nextImage}
              className='bg-white/90 backdrop-blur-sm shadow-lg p-3 rounded-full hover:scale-110 
                       transition-all duration-300 hover:shadow-xl hover:bg-white'
            >
              <FaAngleRight className='text-xl text-gray-800' />
            </button>
          </div>
        </div>
  
        {/* Navigation Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {desktopImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`relative w-8 h-1.5 rounded-full transition-all duration-500 overflow-hidden
                ${currentImage === index ? 'bg-white/80' : 'bg-gray-300/50 hover:bg-gray-400/50'}`}
            >
              {currentImage === index && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 
                              animate-progress-bar origin-left" />
              )}
            </button>
          ))}
        </div>
  
        {/* Desktop Images */}
        <div className='hidden md:flex h-full w-full overflow-hidden'>
          {desktopImages.map((imageURL, index) => (
            <div 
              key={imageURL + index}
              className='w-full h-full min-w-full min-h-full transition-transform duration-500 ease-out'
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
              <img 
                src={imageURL} 
                alt='banner' 
                className='w-full h-full object-cover transform transition-opacity duration-500'
              />
            </div>
          ))}
        </div>
  
        {/* Mobile Images */}
        <div className='flex md:hidden h-full w-full overflow-hidden'>
          {MobileImages.map((imageURL, index) => (
            <div 
              key={imageURL + index}
              className='w-full h-full min-w-full min-h-full transition-transform duration-500 ease-out'
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
              <img 
                src={imageURL} 
                alt='mobile banner' 
                className='w-full h-full object-fill transform transition-opacity duration-500'
              />
            </div>
          ))}
        </div>
  
      </div>
    </div>
  </div>
  )
}

export default BannerProduct