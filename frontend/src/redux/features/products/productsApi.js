import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {getBaseUrl} from '../../../utils/baseURL'

const productsApi=createApi({
    reducerPath:'productsApi',
    baseQuery:fetchBaseQuery({
        baseUrl:`${getBaseUrl()}/api/products`,
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
                return `/?${queryParams}`
            },
            providesTags:["Product"]
        }),
        // fetchProductById:(builder)=>({
        //     query:(id)=> `/${id}`,
        //     providesTags:(result,error,id)=>[{type:'Product',id}],
        // }),
        fetchProductById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: 'Product', id }],
        }),
        AddProduct:builder.mutation({
            query:(newProduct)=>({
                url:'/create-product',
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
                url:`/${id}`,
                method:"DELETE",
                // credentials:'include'
            }),
            invalidatesTags: (result,error,id)=>[{type:"Product",id}]
        }),

      
    }),
});

// export const {useFetchAllProductsQuery,useFetchAllProductByIdQuery,useAddProductMutation,useUpdateProductMutation,
//     useDeleteProductMutation,useFetchRelatedProductsQuery} = productsApi;

export const {
    useFetchAllProductsQuery,
    useFetchProductByIdQuery, 
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useFetchRelatedProductsQuery,
} = productsApi;

export default productsApi;
