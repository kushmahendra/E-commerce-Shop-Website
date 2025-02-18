import React from "react";

const PromoBanner = () => {
  return (
    <section className="max-w-[1400px] mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Row */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="banner__card flex-1 p-6 shadow-md text-center bg-white rounded-lg">
            <span className="text-3xl text-blue-600">
              <i className="ri-truck-line"></i>
            </span>
            <h4 className="text-lg font-semibold mt-2">Free Delivery</h4>
            <p className="text-gray-600 text-sm">
              Offers convenience and the ability to shop from anywhere, anytime.
            </p>
          </div>

          <div className="banner__card flex-1 p-6 shadow-md text-center bg-white rounded-lg">
            <span className="text-3xl text-green-600">
              <i className="ri-money-dollar-circle-line"></i>
            </span>
            <h4 className="text-lg font-semibold mt-2">
              100% Money Back Guarantee
            </h4>
            <p className="text-gray-600 text-sm">
              E-commerce has a new review system where customers can share
              feedback.
            </p>
          </div>
        </div>

        {/* Second Row */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="banner__card flex-1 p-6 shadow-md text-center bg-white rounded-lg">
            <span className="text-3xl text-red-600">
              <i className="ri-user-voice-line"></i>
            </span>
            <h4 className="text-lg font-semibold mt-2">Strong Support</h4>
            <p className="text-gray-600 text-sm">
              Offer customer support services to assist customers with queries
              and issues.
            </p>
          </div>

          <div className="banner__card flex-1 p-6 shadow-md text-center bg-white rounded-lg">
            <span className="text-3xl text-purple-600">
              <i className="ri-arrow-left-line"></i>
            </span>
            <h4 className="text-lg font-semibold mt-2">30 Days Return</h4>
            <p className="text-gray-600 text-sm">
              Return it within 30 days for an exchange.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;


// import React from 'react'

// const PromoBanner = () => {
//   return (<>
// {/* <section className='section__container banner__container'> */}
// <section className='section__container max-w-[600px] mx-auto  grid grid-cols-4 gap-8'>

//     <div className='banner__card'>
//         <span><i className="ri-truck-line"></i></span>
//         <h4>Free Delivery</h4>
//         <p>Offers convinience and the ability to shop from anywhere ,anytime</p>
//     </div>
//     <div className='banner__card'>
//         <span><i className="ri-money-dollar-circle-line"></i></span>
//         <h4>100% Money Back Garranty</h4>
//         <p>E-commerce have a new review system  where customer can share feedback</p>
//     </div>
//     <div className='banner__card'>
//         <span><i className="ri-user-voice-line"></i></span>
//         <h4>Strong Support</h4>
//         <p>Offer customer support services to asssist customers with queries and issues</p>
//     </div>
//     <div className='banner__card'>
//         <span><i className="ri-arrow-left-line "></i></span>
//         <h4>30 Days Return</h4>
//         <p>Return it within 20 day for an exchange</p>
//     </div>

// </section>
// </>
//   )
// }

// export default PromoBanner