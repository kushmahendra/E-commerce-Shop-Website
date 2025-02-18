import React from 'react'

const VideoBanner = () => {
  return (
   <>
       <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
      {/* New Arrival Section */}
      <div className="relative h-[300px] sm:h-[350px] md:h-[400px] overflow-hidden bg-[#f5f0eb] rounded-lg">
        <img
          src="img523.jpeg"
          alt="New Arrival Sale"
          className=" w-full  lg:w-1/2  xl:w-1/2 h-auto object-cover"
        />
        <div className="absolute top-4 right-2 text-right">
          <h2 className="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-2xl  font-bold pt-12 text-gray-800">NEW ARRIVAL SALE</h2>
          <p className="text-xs sm:text-sm md:text-sm lg:text-xs xl:text-2xl font-bold py-4 text-[#ff6b00]">50% OFF</p>
        </div>
      </div>

      {/* Fall Essentials Section */}
      <div className="relative h-[300px] sm:h-[350px] md:h-[400px] overflow-hidden bg-white rounded-lg">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
        <img src="img526.webp" alt="Fall Essentials" className="w-full  lg:w-1/2  xl:w-1/2 h-full object-cover" />

        <div className="absolute top-8 right-2 pt-12 text-right z-20">
          <h2 className="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-2xl font-bold text-black mb-2 font-serif">Fall Essentials</h2>
          <p className="text-sm sm:text-sm md:text-sm lg:text-xs xl:text-2xl text-white mb-4">Sale up to 50% off</p>
          <button className="bg-[#ff6b00] hover:bg-[#ff8533] text-white px-2 py-1 xl:text-2xl text-sm lg:text-xs rounded-full transition-colors duration-300 uppercase font-semibold tracking-wider">
            Shop Now
          </button>
        </div>
      </div>
      </div>

      <div className="w-full max-w-4xl mx-auto aspect-video rounded-lg overflow-hidden bg-gray-900">
        <video 
          src="video2.mp4"
          className="w-full h-full object-cover"
          controls
          autoPlay
          muted
          loop
        />
      </div>
   </>
  )
}

export default VideoBanner


// import React from 'react'

// const VideoBanner = () => {
//   return (
//    <>
//        <div className="container  mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
//       {/* New Arrival Section */}
//       <div className="relative h-[400px] overflow-hidden bg-[#f5f0eb] rounded-lg">
//         <img
//           src="img523.jpeg"
//           alt="New Arrival Sale"
//           className="w-1/2 h-auto"
//         />
//         <div className="absolute top-4 right-4 text-right">
//           <h2 className="text-2xl md:text-4xl font-bold pt-12 text-gray-800">NEW ARRIVAL SALE</h2>
//           <p className="text-4xl md:text-6xl font-bold py-4 text-[#ff6b00]">50% OFF</p>
//         </div>
//       </div>

//       {/* Fall Essentials Section */}
//       <div className="relative h-[400px]  overflow-hidden bg-white rounded-lg">
//         <div className="absolute inset-0  to-transparent z-10" />
//         <img src="img526.webp" alt="Fall Essentials" className="w-1/2 h-full object-cover" />

//         <div className="absolute top-8 right-8 pt-12 text-right z-20">
//           <h2 className="text-3xl md:text-4xl font-bold text-black mb-2 font-serif">Fall Essentials</h2>
//           <p className="text-xl text-gray-500 mb-4">Sale up to 50% off</p>
//           <button className="bg-[#ff6b00] hover:bg-[#ff8533] text-white px-6 py-2 rounded-full transition-colors duration-300 uppercase font-semibold tracking-wider">
//             Shop Now
//           </button>
//         </div>
//       </div>
//       </div>
//       {/* Video Section */}
//       {/* <div className="md:col-span-2 aspect-video rounded-lg overflow-hidden bg-gray-900">
//         <iframe
//           src="https://www.shutterstock.com/shutterstock/videos/1078663991/preview/stock-footage-attractive-blonde-woman-walking-with-shopping-bags-on-city-street-in-slow-motion-shopping-time.webm"
//           title="Choose your video"
//           className="w-full h-full"
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//           allowFullScreen
//         ></iframe>
//       </div> */}

// {/* <div className="md:col-span-2 h-[800px] w-full aspect-video rounded-lg overflow-hidden bg-gray-900">
//   <video 
//     src="video2.mp4"
//     className="w-full h-full"
//     controls
//     autoPlay
//     muted
//     loop
//   />
// </div> */}
// <div className="w-full max-w-4xl mx-auto aspect-video rounded-lg overflow-hidden bg-gray-900">
//   <video 
//     src="video2.mp4"
//     className="w-full h-full object-cover"
//     controls
//     autoPlay
//     muted
//     loop
//   />
// </div>

//    </>
//   )
// }

// export default VideoBanner