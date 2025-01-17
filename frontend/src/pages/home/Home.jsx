import React from 'react'
import Banner from './Banner'
import Categories from './Categories'
import HeroSection from './HeroSection'
import TrendingProducts from '../shop/TrendingProducts'
import ProductCards from '../shop/ProductCards'
import DealsSection from './DealsSection'
import PromoBanner from './PromoBanner'
import Blogs from '../blogs/Blogs'
import { ToastContainer } from 'react-toastify'

const Home = () => {
  return (
    <>
      <ToastContainer />
      <Banner />
      <Categories />
      <HeroSection />
      <TrendingProducts />
      <ProductCards />
      <DealsSection />
      <PromoBanner />
      <Blogs />
    </>
  )
}

export default Home