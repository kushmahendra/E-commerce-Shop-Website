import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useFetchProductByIdQuery } from '../../../redux/features/products/productsApi';
import { useGetReviewsByUserIdQuery, usePostReviewMutation } from '../../../redux/features/reviews/reviewsApi';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const PostAReview = ({ isModalOpen, handleClose }) => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth)
  // console.log('uuuu',user)
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState(1);

  const { refetch } = useFetchProductByIdQuery(id, { skip: !id });
  const [postReview] = usePostReviewMutation();



  const handleRating = (value) => {
    setRating(value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComment = {
      comment: comment,
      rating: rating,
      userId: user?._id,
      productId: id,
      firstName: user?.firstName,
      lastName: user?.lastName,
      profileImage: user?.profileImage,
      // image: uploadedImageUrl,
    }
    try {
      const response = await postReview(newComment).unwrap();
      // console.log('rsssss', response);
      // alert("Comment posted successfully")
      toast.success("Comment posted successfully", {
        position: "top-right",
        autoClose: 3000, // Time in milliseconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light", // 'light', 'dark', or 'colored'
      });
      setComment('');
      setRating(0);
      refetch();

    } catch (error) {
      // alert(error.message)
      console.error("comment failed to post", error)
      toast.error("comment failed to post", {
        position: "top-right",
        autoClose: 3000, // Time in milliseconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light", // 'light', 'dark', or 'colored'
      });
    }
    handleClose();
  }
  return (<>
    <ToastContainer />
    <div className={`fixed inset-0 bg-black/90 flex items-center justify-center z-40 px-2 ${isModalOpen ? 'block' : 'hidden'}`}>

      <div className=' bg-white p-6 rounded-md shadow-lg  w-96 z-50'>

        <h2 className='text-lg  font-medium mb-4'>Post A Review</h2>
        <div className='flex items-center mb-4'>
          {
            [1, 2, 3, 4, 5].map((star, index) => (
              <span
                key={index}
                onClick={() => handleRating(star)}
                className='cursor-pointer text-yellow-500 text-xl'>
                {
                  rating >= star ? (<i className='ri-star-fill'></i>) : (<i className='ri-star-line'></i>)
                }
              </span>
            ))
          }
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows='4'
          className='w-full border border-gray-300 rounded-md  mb-4'>

        </textarea>
        <div className='flex justify-end gap-2'>
          <button onClick={handleClose}
            className='px-4 py-2 bg-gray-300 rounded-md'>
            Cancel
          </button>
          <button onClick={handleSubmit}
            className='px-4 py-2 bg-primary text-white rounded-md'>Submit</button>
        </div>
      </div>

    </div>
  </>
  )
}

export default PostAReview