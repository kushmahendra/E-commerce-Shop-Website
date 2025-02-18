import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const banners = [
  {
    id: 1,
    title: "Up To 20% Discount",
    heading: "Girls Fashion",
    description:
      "Step into a world where style meets personality, and every outfit tells a story. From playful patterns to timeless classics, girls' fashion is not just about clothes—it's about confidence, charm, and creativity.",
    image: "img8122.png",
    buttonText: "SHOP NOW",
    link: "/shop",
  },
  {
    id: 2,
    title: "Up To 30% Discount",
    heading: "Accessories",
    description:
      "Step into a world where style meets personality, and every outfit tells a story. From playful patterns to timeless classics, girls' fashion is not just about clothes—it's about confidence, charm, and creativity. Whether it’s a twirl-worthy dress for a sunny afternoon, cozy chic layers for crisp evenings, or bold accessories to make a statement, every detail matters.",
    image: "accessories13.png",
    buttonText: "BROWSE COLLECTION",
    link: "/categories/accessories",
  },
  {
    id: 3,
    title: "Up To 25% Discount",
    heading: "Dress",
    description:
     "Step into a world where style meets personality, and every outfit tells a story. From playful patterns to timeless classics, girls' fashion is not just about clothes—it's about confidence, charm, and creativity. Whether it’s a twirl-worthy dress for a sunny afternoon, cozy chic layers for crisp evenings, or bold accessories to make a statement, every detail matters.",
    image: "dress3.png",
    buttonText: "BROWSE COLLECTION",
    link: "/categories/dress",
  },
  {
    id: 4,
    title: "Up To 25% Discount",
    heading: "Jewellery",
    description:
  "Step into a world where style meets personality, and every outfit tells a story. From playful patterns to timeless classics, girls' fashion is not just about clothes—it's about confidence, charm, and creativity. Whether it’s a twirl-worthy dress for a sunny afternoon, cozy chic layers for crisp evenings, or bold accessories to make a statement, every detail matters.",
    image: "img506.png",
    buttonText: "BROWSE COLLECTION",
    link: "/categories/jewellery",
  },
  {
    id: 5,
    title: "Up To 25% Discount",
    heading: "Cosmetics",
    description:
"Step into a world where style meets personality, and every outfit tells a story. From playful patterns to timeless classics, girls' fashion is not just about clothes—it's about confidence, charm, and creativity. Whether it’s a twirl-worthy dress for a sunny afternoon, cozy chic layers for crisp evenings, or bold accessories to make a statement, every detail matters.",
    image: "cosmetic2.png",
    buttonText: "BROWSE COLLECTION",
    link: "/categories/cosmetics",
  },
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll effect every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? banners.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  return (
    <div className="relative max-w-full max-h-full overflow- bg-primary-light mt-20 rounded-b-lg">
      {/* Carousel Wrapper */}
      <div
        className="flex transition-transform duration-700 pt- ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((banner) => (
          <div key={banner.id} className="w-full h-[80%] flex-none  flex flex-col md:flex-row items-center px-4 md:px-12 lg:px-24">
            {/* Content */}
            <div className="w-[80%] md:w-[50%] text-center md:text-left mt-20 md:mt-0">
              <p className="text-red-500 font-medium mb-4">{banner.title}</p>
              <h1 className="text-3xl md:text-4xl lg:text-6xl  xl:text-7xl font-bold mb-6 text-gray-900">{banner.heading}</h1>
              <p className="text-gray-600 mb-8 max-w-xl">{banner.description}</p>
              <Link to={banner.link}>
                <button className="bg-red-500 text-white px-8 py-3 rounded-md hover:bg-red-600 transition-colors">
                  {banner.buttonText}
                </button>
              </Link>
            </div>

            {/* Image */}
            <div className=" sm:w-[50%] md:w-[50%]   flex justify-center">
              <img src={banner.image} alt={banner.heading} className="object-cover lg:w-[80%] sm:w-[80%] w-[100%]
              xl:w-[80%]  xl:h-[650px] lg:h-[650px]  sm:h-[650px] h-[700px]" />
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full shadow-lg p-2 hover:bg-gray-100 transition-colors"
        onClick={handlePrev}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-gray-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full shadow-lg p-2 hover:bg-gray-100 transition-colors"
        onClick={handleNext}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-gray-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19l7-7-7-7" />
        </svg>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <span
            key={index}
            className={`block w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-blue-500 scale-125" : "bg-gray-300"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Banner;



// // import React from 'react'
// // import { Link } from 'react-router-dom'
// // // import bannerImg from '../../assets/header.png'
// // // import bannerImg from '../../assets/img812.png'

// // const Banner = () => {
// //   return (
// //     <div className='max-w-full  py-20  min-h-[618px] bg-primary-light rounded-b-lg grid grid-cols-2 gap-12 items-center'>
// //     <div className='header__content pl-4'>
// //         <h4 className='uppercase'>Up To 20% Discount</h4>
// //         <h1>Girls Fashion</h1>
// //         <p>Step into a world where style meets personality, and every outfit tells a story. From playful patterns to timeless classics,
// //              girls' fashion is not just about clothes—it's about confidence, charm, and creativity. Whether it’s a twirl-worthy dress for a sunny afternoon,
// //              cozy chic layers for crisp evenings, or bold accessories to make a statement, every detail matters.</p>
// //           <button className='btn'><Link to='/shop'>EXPLORE NOW</Link></button>   
// //     </div>
// //     <div className='header__image'>
// //         {/* <img src={bannerImg} alt="banner image" /> */}
// //         <img src="img8122.png" alt="banner image" />
// //     </div>
        
// //     </div>
// //   )
// // }

// // export default Banner

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// const banners = [
//   {
//     id: 1,
//     title: "Up To 20% Discount",
//     heading: "Girls Fashion",
//     description:"Step into a world where style meets personality, and every outfit tells a story. From playful patterns to timeless classics, girls' fashion is not just about clothes—it's about confidence, charm, and creativity. Whether it’s a twirl-worthy dress for a sunny afternoon, cozy chic layers for crisp evenings, or bold accessories to make a statement, every detail matters.",
//     image: "img8122.png",
//     buttonText: "SHOP NOW",
//     link: "/shop",
//   },
//   {
//     id: 2,
//     title: "Up To 30% Discount",
//     heading: "Accessories ",
//     description:"Step into a world where style meets personality, and every outfit tells a story. From playful patterns to timeless classics, girls' fashion is not just about clothes—it's about confidence, charm, and creativity. Whether it’s a twirl-worthy dress for a sunny afternoon, cozy chic layers for crisp evenings, or bold accessories to make a statement, every detail matters.",
//    image: "accessories13.png",
//     buttonText: "BROWSE COLLECTION",
//     link: "/categories/accessories",
//   },
//   {
//     id: 3,
//     title: "Up To 25% Discount",
//     heading: "Dress ",
//     description:"Step into a world where style meets personality, and every outfit tells a story. From playful patterns to timeless classics, girls' fashion is not just about clothes—it's about confidence, charm, and creativity. Whether it’s a twirl-worthy dress for a sunny afternoon, cozy chic layers for crisp evenings, or bold accessories to make a statement, every detail matters.",
//     image: "dress3.png",
//     buttonText: "BROWSE COLLECTION",
//     link: "/categories/dress",
//   },
//   {
//     id: 4,
//     title: "Up To 25% Discount",
//     heading: "Jewellery ",
//     description:"Step into a world where style meets personality, and every outfit tells a story. From playful patterns to timeless classics, girls' fashion is not just about clothes—it's about confidence, charm, and creativity. Whether it’s a twirl-worthy dress for a sunny afternoon, cozy chic layers for crisp evenings, or bold accessories to make a statement, every detail matters.",
//     image: "img506.png",
//     buttonText: "BROWSE COLLECTION",
//     link: "/categories/jewellery",
//   },
//   {
//     id: 5,
//     title: "Up To 25% Discount",
//     heading: "Cosmetics ",
//     description:"Step into a world where style meets personality, and every outfit tells a story. From playful patterns to timeless classics, girls' fashion is not just about clothes—it's about confidence, charm, and creativity. Whether it’s a twirl-worthy dress for a sunny afternoon, cozy chic layers for crisp evenings, or bold accessories to make a statement, every detail matters.",
//     image: "cosmetic2.png",
//     buttonText: "BROWSE COLLECTION",
//     link: "/categories/Cosmetics",
//   },
// ];

// const Test = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Auto-scroll effect
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
//     }, 5000); // Auto-scroll every 5 seconds

//     return () => clearInterval(interval); // Cleanup on unmount
//   }, []);

//   const handlePrev = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? banners.length - 1 : prevIndex - 1
//     );
//   };

//   const handleNext = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
//   };

//   return (
//     <div className="relative max-w-full min-h-[618px] overflow-hidden bg-primary-light mt-20 rounded-b-lg">
//       {/* Carousel Wrapper */}
//       <div
//         className="flex transition-transform pt-44 duration-700"
//         style={{
//           transform: `translateX(-${currentIndex * 100}%)`,
//           transition: "transform 0.7s ease-in-out",
//         }}
//       >
//         {banners.map((banner) => (
//           <div
//             key={banner.id}
//             className="flex-shrink-0 w-full grid grid-cols-2 gap-12 items-center "
//             style={{ minWidth: "100%" }}
//           >
//             {/* Text Content Section */}
//             <div className="header__content pl-4 mb-10 ">
//               <h4 className="uppercase text-gray-500 ">{banner.title}</h4>
//               <h1 className="text-4xl font-bold text-gray-800 pt-6">{banner.heading}</h1>
//               <p className="mt-4 text-gray-600 pt-6">{banner.description}</p>
//               <button className="btn pt-6">
//                 <Link to={banner.link}>{banner.buttonText}</Link>
//               </button>
//             </div>

//             {/* Image Section */}
//             <div className="header__image ">
//               <img
//                 src={banner.image}
//                 alt={banner.heading}
//                 className="rounded-lg pt-12"
                
//               />
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Navigation Buttons */}
//       <button
//         className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full shadow-lg p-2 hover:bg-gray-100 transition-colors"
//         onClick={handlePrev}
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth={2}
//           stroke="currentColor"
//           className="w-6 h-6 text-gray-600"
//         >
//           <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
//         </svg>
//       </button>

//       <button
//         className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full shadow-lg p-2 hover:bg-gray-100 transition-colors"
//         onClick={handleNext}
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth={2}
//           stroke="currentColor"
//           className="w-6 h-6 text-gray-600"
//         >
//           <path strokeLinecap="round" strokeLinejoin="round" d="M9 19l7-7-7-7" />
//         </svg>
//       </button>

//       {/* Indicators */}
//       <div 
//       className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2"
//       >
//         {banners.map((_, index) => (
//           <span
//             key={index}
//             className={`block w-3 h-3 rounded-full ${
//               index === currentIndex ? "bg-blue-500" : "bg-gray-300"
//             }`}
//           ></span>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Test;
