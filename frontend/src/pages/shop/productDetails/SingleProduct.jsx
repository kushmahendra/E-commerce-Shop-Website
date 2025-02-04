// import React from 'react'
// import { Link, useParams } from 'react-router-dom'
// import RatingStars from '../../../components/RatingStars';
// import { useDispatch } from 'react-redux';
// import { useFetchProductByIdQuery } from '../../../redux/features/products/productsApi';
// import { addToCart } from '../../../redux/features/cart/cartSlice';
// import ReviewsCard from '../reviews/ReviewsCard';
// import { toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';


// const SingleProduct = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const { data, error, isLoading } = useFetchProductByIdQuery(id);

//   const singleProduct = data?.product || {};
//   const productReviews = data?.reviews || [];

//   const handleAddToCart = (product) => {
//     try {
//       console.log('my pr', product)
//       dispatch(addToCart(product.singleProduct));
//       toast.success("Product added to cart successfully", {
//         position: "top-right",
//         autoClose: 3000, // Time in milliseconds
//         hideProgressBar: false,
//         closeOnClick: false, // Disable click-to-close
//         pauseOnHover: false, // Disable pausing when hovered
//         draggable: false, // Disable dragging
//         theme: "light", // 'light', 'dark', or 'colored'
//       });
//     }
//     catch (error) {
//       console.error('"Product failed to add in  cart', error)
//       toast.error("Product failed to add in  cart ", {
//         position: "top-right",
//         autoClose: 3000, // Time in milliseconds
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "light", // 'light', 'dark', or 'colored'
//       });
//     }
//   }

//   return (
//     <>
//   
//       <section className='section__container bg-primary-light'>
//         <h2 className='section__header capitalize' >Single Product Page</h2>
//         <div className='section__subheader space-x-2'>
//           <span className='hover:text-primary'><Link to='/'>home</Link></span>
//           <i className="ri-arrow-right-s-line"></i>
//           <span className='hover:text-primary'><Link to='/shop'>shop</Link></span>
//           <i className="ri-arrow-right-s-line"></i>
//           <span className='hover:text-primary'>{singleProduct.name}</span>
//         </div>
//       </section>

//       <section className='section__container mt-8'>

//         <div className='flex flex-col items-center md:flex-row gap-8'>
//           {/* product image */}
//           <div className='md:w-1/2 w-full'>
//             <img src={singleProduct?.image}
//               alt="" className='rounded-md w-full h-auto' />
//           </div>

//           <div className='md:w-1/2 w-full'>
//             <h3 className='text-2xl font-semibold mb-4'>{singleProduct?.name}</h3>
//             <p className='text-xl text-primary mb-4'>${singleProduct?.price} {singleProduct?.oldPrice && <s className='ml-1'>${singleProduct?.oldPrice}</s>}</p>
//             <p className='text-gray-400 mb-4'>{singleProduct?.description}</p>
//             {/* additional product info */}
//             <div className='flex flex-col space-y-2'>
//               <p><strong>Category : </strong>{singleProduct?.category} </p>
//               <p><strong>Color : </strong>{singleProduct?.color} </p>
//               <div className='flex gap-1 items-center'>
//                 <strong>Rating : </strong>
//                 <RatingStars rating={singleProduct?.rating} />
//               </div>
//             </div>
//             {singleProduct?.stock > 0 && (
//             <button onClick={(e) => {
//               e.stopPropagation();
//               handleAddToCart({ singleProduct })
//             }}
//               className='mt-6 px-6 py-3 bg-primary text-white rounded-md'>
//               Add to Cart
//             </button>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* display Review */}

//       <section className='section__container mt-8'>
//         <ReviewsCard productReviews={productReviews} />
//       </section>
//     </>
//   )
// }

// export default SingleProduct

import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFetchProductByIdQuery } from "../../../redux/features/products/productsApi";
import { addToCart } from "../../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReviewsCard from "../reviews/ReviewsCard";
import RatingStars from "../../../components/RatingStars";
import { useAddsToCartMutation, useUpdateCartMutation } from "../../../redux/features/cart/cartApi";

const SingleProduct = () => {

  const user = JSON.parse(localStorage.getItem("user"));
  console.log('uuiddd', user._id);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, error, isLoading } = useFetchProductByIdQuery(id);
  const [addsToCart] = useAddsToCartMutation();
  const [ updateCart]=useUpdateCartMutation();
 
 

  const product = data?.product || {};
  const productReviews = data?.reviews || [];
  const images = product?.images || [];


  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  // const images=product?.images


  const colors = [
    { name: "white", class: "bg-white" },
    { name: "black", class: "bg-black" },
    { name: "gray", class: "bg-gray-600" },
    { name: "silver", class: "bg-gray-400" },
    { name: "gold", class: "bg-yellow-800" },
    { name: "brown", class: "bg-brown-600" },
    { name: "red", class: "bg-red-600" },
    { name: "orange", class: "bg-orange-600" },
    { name: "yellow", class: "bg-yellow-600" },
    { name: "green", class: "bg-green-600" },
    { name: "blue", class: "bg-blue-600" },
    { name: "purple", class: "bg-purple-500" },
    { name: "pink", class: "bg-pink-600" },
  ];


  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);

  const handleAddToCart = async (product,quantity,selectedImage,selectedSize,selectedColor) => {
  
    try {
      // const cartProduct = { ...product, quantity };
      console.log('ppp', product);
      console.log('iimmgg',images[0]);
      console.log('productId',product._id);
      
      
      const cartProduct = {
        userId: user?._id, productId:product._id,quantity, image: images[selectedImage] || images[0], size: selectedSize || "M",
          color:selectedColor || "black",
      };
      const cartProduct22={
        userId: user?._id,productId:product._id,quantity, image: images[selectedImage] || images[0], size: selectedSize || "M",
          color: selectedColor || "black",
      };
      // const cartProduct = { ...product,selectedImage: images[selectedImage]};
      // const cartProduct = { userId: user._id, ...product, image:selectedImage ||'image[0]',size: selectedSize || 'M',color:selectedColor ||'black' };
      console.log('ddd', cartProduct)
    
      const response = await addsToCart(cartProduct).unwrap();
      console.log('rrrrss1', response);
      
  const response2=response?.cart
  console.log('rrrrss2', response2);
        // dispatch(setProducts(response))
      // dispatch( response);
      dispatch(addToCart( response2));


      toast.success("Product added to cart successfully", { position: "top-right", autoClose: 3000 });
    } catch (error) {
      toast.error("Failed to add product to cart", { position: "top-right", autoClose: 3000 });
    }
  };


  const handlePrevImage = () => setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const handleNextImage = () => setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading product details</p>;


  return (
    <>
    
      <div className='mt-20'>
        <section className='section__container bg-primary-light'>
          <h2 className='section__header capitalize' >Product Page</h2>
          <div className='section__subheader space-x-2'>
            <span className='hover:text-primary'><Link to='/'>home</Link></span>
            <i className="ri-arrow-right-s-line"></i>
            <span className='hover:text-primary'><Link to='/shop'>shop</Link></span>
            <i className="ri-arrow-right-s-line"></i>
            <span className='hover:text-primary'>{product.name}</span>
          </div>
        </section>
        {/* <div 
      className="min-h-screen bg-gray-50 py-10 px-5 flex justify-center"
      >
        <div
         className="max-w-6xl w-full bg-white shadow-lg rounded-lg p-5"
         > */}
        <div
          className="mx-10 bg-gray-50 flex justify-center items-center"
        >
          <div
            className="w-full h-full mx-10 bg-white shadow-lg rounded-lg p-5 overflow-y-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Image Section */}
              <div className="relative">
                <div className="w-full h-96 bg-gray-100 flex items-center justify-center overflow-hidden rounded-lg relative">
                  <button
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full hover:bg-gray-800"
                    onClick={handlePrevImage}
                  >
                    &#8249;
                  </button>
                  <img src={images[selectedImage]} alt="Product" className="h-full object-cover" />
                  <button
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full hover:bg-gray-800"
                    onClick={handleNextImage}
                  >
                    &#8250;
                  </button>
                </div>
                <div className="flex overflow-x-auto space-x-2 mt-4">
                  {
                    images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt="Thumbnail"
                        className={`h-20 w-20 object-cover cursor-pointer rounded-lg border ${selectedImage === index ? "border-black" : "border-gray-200"
                          }`}
                        onClick={() => setSelectedImage(index)}
                      />
                    ))
                  }
                </div>
              </div>

              {/* Details Section */}
              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">{product.name}</h2>
                  <p className="text-gray-600 mt-2">{product.description}</p>
                  {/* <div className="flex items-center space-x-2 mt-2">
                  <RatingStars rating={product.rating} />
                  <span className="text-gray-500">({productReviews.length} Reviews)</span>
                </div> */}
                  <div className="flex items-center space-x-4 mt-4">
                    {product.oldPrice && <span className="text-gray-500 line-through">${product.oldPrice}</span>}
                    <span className="text-2xl font-semibold text-red-500">${product.price}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    {/* Sizes */}
                    {/* <div>
                    <h4 className="text-gray-700 font-medium">Size</h4>
                    <div className="flex space-x-2 mt-2">
                      {product.sizes?.map((size) => (
                        <button key={size} className="px-3 py-1 border border-gray-300 rounded-lg hover:border-black">
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  */}

                    {/* Colors */}
                    {/* <div>
                    <h4 className="text-gray-700 font-medium">Color</h4>
                    <div className="flex space-x-2 mt-2">
                      {product.colors?.map((color, index) => (
                        <div
                          key={index}
                          className={`h-8 w-8 rounded-full border border-gray-300`}
                          style={{ backgroundColor: color }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>  */}
                    {/* Sizes */}
                    {/* <div>
                    <h4 className="text-gray-700 font-medium">Size</h4>
                    <div className="flex space-x-2 mt-2">
                      {['S', 'M', 'L', 'XL'].map(size => (
                        <button
                          key={size}
                          className="px-3 py-1 border border-gray-300 rounded-lg hover:border-black"
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div> */}
                    {/* Sizes Selection */}
                    <div>
                      <h4 className="text-gray-700 font-medium">Size</h4>
                      <div className="flex space-x-2 mt-2">
                        {['S', 'M', 'L', 'XL','XXL'].map(size => (
                          <button
                            key={size}
                            className={`px-3 py-1 border ${selectedSize === size ? "border-black" : "border-gray-300"} rounded-lg hover:border-black`}
                            onClick={() => setSelectedSize(size)}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Colors */}
                    {/* <div>
                    <h4 className="text-gray-700 font-medium">Color</h4>
                    <div className="flex space-x-2 mt-2">
                      <button className="h-8 w-8 rounded-full border border-gray-300 bg-white"></button>
                      <button className="h-8 w-8 rounded-full border border-gray-300 bg-gray-600"></button>
                    </div>
                  </div> */}
                    <div>
                      <h4 className="text-gray-700 font-medium">Color</h4>
                      <div className="flex space-x-2 mt-2">
                        {colors.map((color) => (
                          <button
                            key={color.name}
                            className={`h-8 w-8 rounded-full border ${selectedColor === color.name ? "border-black" : "border-gray-300"
                              } ${color.class}`}
                            onClick={() => setSelectedColor(color.name)}
                          ></button>
                        ))}
                      </div>
                    </div>


                    <div className="flex flex-row justify-between mt-6">

                      <button className="text-gray-700 hover:text-orange-900">Add to Wishlist <i className="ri-heart-line text-red-600"></i>  </button>
                      {/* <h1 className="text-gray-700 font-medium">In stock <span className="text-blue-600"> {product.stock}</span> </h1> */}
                    </div>
                  </div>
                </div>
                <div className="flex items-center border border-gray-300 rounded-lg w-1/5">
                  <button onClick={decreaseQuantity} className="px-3 py-1 text-gray-600 hover:bg-gray-100">
                    -
                  </button>
                  <span className="px-4 py-1">{quantity}</span>
                  <button onClick={increaseQuantity} className="px-3 py-1 text-gray-600 hover:bg-gray-100">
                    +
                  </button>
                </div>

                <div className="flex items-center space-x-4">

                  {/* <div className="flex flex-col"> */}
                  <button
                    // onClick={handleAddToCart}


                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product,quantity,selectedImage,selectedSize,selectedColor)
                    }
                    }
                    className="flex-1 bg-orange-500 hover:bg-orange-700  text-white py-2 rounded-lg text-center">
                    ADD TO CART
                  </button>

                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-10">
              <ReviewsCard productReviews={productReviews} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
