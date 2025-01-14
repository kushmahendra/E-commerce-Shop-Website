import React from 'react'
import { Link } from 'react-router-dom'
import RatingStars from '../../components/RatingStars'
import {useDispatch} from 'react-redux'
import { addToCart } from '../../redux/features/cart/cartSlice'
import { useAddsToCartMutation} from '../../redux/features/cart/cartApi'


const ProductCards = ({products}) => {
  const teno =JSON.parse(localStorage.getItem("user"))
  const dispatch =useDispatch();

  const [addsToCart, { isLoading }] = useAddsToCartMutation();

  const handleAddToCart = async (product) => {
    try {
      await addsToCart({...product,userId:teno._id}).unwrap();
        dispatch(addToCart({...product,userId:teno._id}))
      alert('Product added to cart successfully!');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Failed to add product to cart. Please try again.');
    }
  };

console.log('afafafaf',products)

  return (
       <>
<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
{
  products && products.map((product,index)=>
  (
    <div key={index}
    //  className='product__card'
    className="relative bg-gradient-to-r from-blue-100 via-gray-200 to-blue-100 text-white rounded-xl shadow-lg overflow-hidden hover:scale-105
     transition-transform duration-300"
      >
<div className='relative'>
  <Link  to={`/shop/${product._id}`}>

  <img src={product.image} alt="product image"  className='max-h-96 md:h-64 w-full object-cover hover-scale-105 transition-all duration-300' />
  </Link>
{/* 
  <div className='hover:block absolute top-3 right-3'>
    <button 
    onClick={(e)=> { e.stopPropagation();
       handleAddToCart(product)}}
    >
    <i className="ri-shopping-cart-2-line  bg-primary p-1.5 text-white hover:bg-primary-dark"></i>
    </button>
  </div> */}
</div>

{/* product description */}
<div className='flex flex-col gap-2'>
  <h4 className='text-gray-600 font-semibold'>{product.name}</h4>

  <div className='flex flex-row justify-between mx-2 text-sm'>
  <p className='text-green-400'>${product.price} </p>
  <p className='text-red-400'>{product?.oldPrice ? <s>${product?.oldPrice}</s>:null }</p>
  </div>

  <div className="flex flex-row justify-between mx-2 ">
  <RatingStars rating={product.rating}/>
  <button 
    onClick={(e)=> { e.stopPropagation();
       handleAddToCart(product)}}
       disabled={isLoading}
    >
        {isLoading ? 'Adding...' :  <i className="ri-shopping-cart-2-line text-sm rounded-md bg-primary p-1 text-white hover:bg-primary-dark"></i>}
   
    </button>
   </div>
</div>
      </div>
  ))
}
</div>
</>
  )
}

export default ProductCards
