import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {getBaseUrl} from '../../../utils/baseURL'

export const reviewsApi=createApi({
    reducerPath:' reviewsApi',
    baseQuery:fetchBaseQuery({
        baseUrl:`${getBaseUrl()}/api/reviews`,
        credentials:'include'
    }),
    tagTypes:["Reviews"],
    endpoints:(builder)=>({
        postReview:builder.mutation({
           query:(reviewData)=>
           ({
            url:'/post-review',
            method:"POST",
            body:reviewData,
          
           }), 
            invalidatesTags:(result ,error,{postId}) => [{type:'Reviews',id:postId}]
        }),
        
        getReviewsCount: builder.query({
            query: () => ({
                url:'/total-reviews'
            })
           
        }),

        getreviewsByUserId:builder.query({
            query:(userId)=>({
                url:`/${userId}`,
            }),

            ProvidesTags:(result) => result ? [{type:"Reviews",id:result[0]?.email}]:[]
        }),
      
    }),
});

// export const {useFetchAllProductsQuery,useFetchAllProductByIdQuery,useAddProductMutation,useUpdateProductMutation,
//     useDeleteProductMutation,useFetchRelatedProductsQuery} = productsApi;

export const {
    usePostReviewMutation,
    useGetReviewsCountQuery,useGetReviewsByUserIdQuery
} = reviewsApi;


