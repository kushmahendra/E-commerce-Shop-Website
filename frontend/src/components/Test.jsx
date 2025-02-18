import React from 'react'

const Test = () => {
  return (<>
{/* <section className='section__container banner__container'> */}
<section className='max-w-[1400px] mx-auto px-4 py-20 max-w-[600px] mx-auto  grid grid-cols-4 gap-8'>

<div className='flex flex-col md:flex-row lg:flex-cols xl:flex-cols gap-4 lg:gap-6 xl:gap-8'>
  <div className='flex flex-row gap-4'>
    <div className='banner__card'>
        <span><i className="ri-truck-line"></i></span>
        <h4>Free Delivery</h4>
        <p>Offers convinience and the ability to shop from anywhere ,anytime</p>
    </div>
    <div className='banner__card'>
        <span><i className="ri-money-dollar-circle-line"></i></span>
        <h4>100% Money Back Garranty</h4>
        <p>E-commerce have a new review system  where customer can share feedback</p>
    </div>
</div>


<div className='flex flex-row gap-4'>
    <div className='banner__card'>
        <span><i className="ri-user-voice-line"></i></span>
        <h4>Strong Support</h4>
        <p>Offer customer support services to asssist customers with queries and issues</p>
    </div>
    <div className='banner__card'>
        <span><i className="ri-arrow-left-line "></i></span>
        <h4>30 Days Return</h4>
        <p>Return it within 20 day for an exchange</p>
    </div>
   </div>
</div>
</section>
</>
  )
}

export default Test