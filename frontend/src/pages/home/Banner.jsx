import React from 'react'
import { Link } from 'react-router-dom'
// import bannerImg from '../../assets/header.png'
// import bannerImg from '../../assets/img812.png'

const Banner = () => {
  return (
    <div className='max-w-full  py-20  min-h-[618px] bg-primary-light rounded-b-lg grid grid-cols-2 gap-12 items-center'>
    <div className='header__content pl-4'>
        <h4 className='uppercase'>Up To 20% Discount</h4>
        <h1>Girls Fashion</h1>
        <p>Step into a world where style meets personality, and every outfit tells a story. From playful patterns to timeless classics,
             girls' fashion is not just about clothes—it's about confidence, charm, and creativity. Whether it’s a twirl-worthy dress for a sunny afternoon,
             cozy chic layers for crisp evenings, or bold accessories to make a statement, every detail matters.</p>
          <button className='btn'><Link to='/shop'>EXPLORE NOW</Link></button>   
    </div>
    <div className='header__image'>
        {/* <img src={bannerImg} alt="banner image" /> */}
        <img src="img8122.png" alt="banner image" />
    </div>
        
    </div>
  )
}

export default Banner