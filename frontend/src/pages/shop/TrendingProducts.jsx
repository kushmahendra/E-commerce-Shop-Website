import React, { useEffect, useState } from 'react'
import ProductCards from './ProductCards'
// import products  from '../../data/products.json'
import { getBaseUrl } from '../../utils/baseURL'
import { ToastContainer } from 'react-toastify'


const TrendingProducts = () => {
    const [visibleProducts,setVisibleProducts]=useState(8)
    const [products,setProducts] = useState([]);

    useEffect(()=>{
      fetchAllProducts()
     },[])

    const fetchAllProducts = async ()=>{
      try {
        const response = await fetch(getBaseUrl()+'/api/products',{
          method:'GET',
          headers:{
            'Content-Type':'application/json'
          }
        });
        const data = await response.json();
        if(response.ok){
          console.log('products data',data);
          setProducts(data.products );
        }
        else{
          console.warn('failed to fetch products');
        }
      } catch (error) {
        console.error('Error',error)
      }
    }

    const loadMoreProducts=()=>
    {
        setVisibleProducts((prevCount)=> prevCount + 8 )
    }
    
  return (
   <> <ToastContainer/>
   <section className='section__container product__container'>
    <h2 className='section__header'>Trending Products</h2>
    {/* <p className='section__subheader mb-12'>
      Discover the Hottest Picks:
          Elevate Your Style with our curated collection of Trending Women's Fashion Products 
     </p> */}
          <p className='section__subheader mb-12'>
          Upgrade Your Wardrobe:
          Explore Trending Styles That Are Taking the Fashion World Storm-Only at Our Store!
     </p> 

{/* products card */}
<div className='m-12'>
<ProductCards products={products && products.slice(0,visibleProducts)}/>
</div>

{/* load more products btn */}
<div className='product__btn'>
  {
    visibleProducts < products.length && ( <button className='btn' onClick={loadMoreProducts}>Load More</button> )
  }
</div>
   </section>
   </>
  )
}

export default TrendingProducts