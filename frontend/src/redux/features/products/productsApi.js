import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {getBaseUrl} from '../../../utils/baseURL'

const productsApi=createApi({
    reducerPath:'productsApi',
    baseQuery:fetchBaseQuery({
        baseUrl:`${getBaseUrl()}/api`,
        // credentials:'include'
    }),
    tagTypes:["Product"],
    endpoints:(builder)=>({
        fetchAllProducts:builder.query({
            query:({category,color,minPrice,maxPrice,page=1,limit=10})=>{
                const queryParams=new URLSearchParams({
                    category:category||'',
                    color:color|| '',
                    minPrice:minPrice|| '',
                    maxPrice:maxPrice|| '',
                    page:page.toString(),
                    limit:limit.toString(),
                }).toString();
                return `/products?${queryParams}`
            },
            providesTags:["Product"]
        }),

        // fetchProductById:(builder)=>({
        //     query:(id)=> `/${id}`,
        //     providesTags:(result,error,id)=>[{type:'Product',id}],
        // }),
        fetchProductById: builder.query({
            query: (id) => `/product/${id}`,
            providesTags: (result, error, id) => [{ type: 'Product', id }],
        }),
        AddProduct:builder.mutation({
            query:(newProduct)=>({
                url:'/products',
                method:"POST",
                body:newProduct,
                // credentials:'include'
            }),
            invalidatesTags:["Product"]
        }),

        fetchRelatedProduct:builder.mutation({
            query:({id, ...rest})=> ({
                url:`/update-product/${id}`,
                method:'PATCH',
                body:rest,
                // credentials:['Product'],
            })
        }),
        deleteProduct:builder.mutation({
            query:(id)=>({
                url:`/product/${id}`,
                method:"DELETE",
                // credentials:'include'
            }),
            invalidatesTags: (result,error,id)=>[{type:"Product",id}]
        }),
      
    }),
});

export const {
    useFetchAllProductsQuery,
    useFetchProductByIdQuery, 
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useFetchRelatedProductsQuery,
} = productsApi;

export default productsApi;
