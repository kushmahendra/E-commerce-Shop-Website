import React from 'react'

import instaImg1 from '../assets/instagram-1.jpg'
import instaImg2 from '../assets/instagram-2.jpg'
import instaImg3 from '../assets/instagram-3.jpg'
import instaImg4 from '../assets/instagram-4.jpg'
import instaImg5 from '../assets/instagram-5.jpg'
import instaImg6 from '../assets/instagram-6.jpg'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <footer className='section__container footer__container'>
        <div className='footer__col'>
          <h4>CONTACT INFO</h4>
          <Link to="/contact">
          <p 
          // class="text-lg font-semibold  py-2 px-4 rounded-lg animate-bounce"
          >
          Contact Us
          </p>
          </Link>
          <p>
            <span><i className="ri-map-pin-2-fill"></i></span>
            123,London Bridges Street ,London
          </p>
          <p>
            <span><i className="ri-mail-fill"></i></span>
            support@mahendra.com
          </p>
          <p>
            <span><i className="ri-phone-fill"></i></span>
            (+012) 3456 789
          </p>

        </div >

        <div className='footer__col'>
          <h4>QUICK LINKS</h4>
          <a href="/">Home</a>
          <a href="/about-us">About Us</a>

          <a href="/">Work With Us</a>
          <a href="/stores">Our Stores</a>
          <a href="/terms-and-conditions">Terms & Conditions</a>
          <a href="/faqs">FAQs</a>
        </div>

        <div className='footer__col'>
          <h4>CATEGORIES</h4>
          <a href="/contact">Help</a>
          <a href="/">Track Your Order</a>
          <a href="/delivery">Delivery</a>
          <a href="/">Men</a>
          <a href="/">Women</a>
          <a href="/">Dresses</a>
        </div>


        <div className='footer__col'>
          <h4>INSTAGRAM</h4>
          <div className='instagram__grid'>
            <img src={instaImg1} alt="" />
            <img src={instaImg2} alt="" />
            <img src={instaImg3} alt="" />
            <img src={instaImg4} alt="" />
            <img src={instaImg5} alt="" />
            <img src={instaImg6} alt="" />
          </div>

        </div>

      </footer>
      <div className='footer__bar'>
        Copyright © 2025 Web Designs BigThinker by MAHENDRA: All Rights Reserved.
      </div>
    </>
  )
}

export default Footer