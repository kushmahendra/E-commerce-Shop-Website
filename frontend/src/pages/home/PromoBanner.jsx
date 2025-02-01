import React from 'react'

const PromoBanner = () => {
  return (<>
{/* <section className='section__container banner__container'> */}
<section className='section__container max-w-[600px] mx-auto  grid grid-cols-4 gap-8'>

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

</section>
</>
  )
}

export default PromoBanner