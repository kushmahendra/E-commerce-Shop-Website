import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../../../utils/baseURL';


const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api`,
        credentials: 'include', // Include cookies if needed
    }),
    tagTypes: ['Cart'],
    endpoints: (builder) => ({
        addsToCart: builder.mutation({
            query: (cartItem) => ({
                url: '/add-to-carts',
                method: 'POST',
                body: cartItem,
            }),
            invalidatesTags: ['Cart'],
        }),
        getSingleCart: builder.query({
            query: (userId) => ({
                url: `/${userId}`,
                method: 'GET',
            }),
            providesTags: (result, error, userId) => [{ type: 'Cart', id: userId }],
        }),
        updateCart: builder.mutation({
            query: (updatedCartItem) => ({
                url: '/update-cart',
                method: 'PUT',
                body: updatedCartItem,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Cart', id }],
        }),
        removeCartItem: builder.mutation({
            query: (cartItemId) => ({
                url: '/remove-cart',
                method: 'DELETE',
                body:  cartItemId ,
            }),
            invalidatesTags: ['Cart'],
        }),
        clearCart: builder.mutation({
            query: (userId) => ({
                url: `/clear-cart/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, userId) => [{ type: 'Cart', id: userId }],
        }),
    }),
});

export const {
    useAddsToCartMutation,
    useGetSingleCartQuery,
    useUpdateCartMutation,
    useRemoveCartItemMutation,
    useClearCartMutation,
} = cartApi;

export default cartApi;
