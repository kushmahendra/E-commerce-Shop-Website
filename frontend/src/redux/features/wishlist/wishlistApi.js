import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../../../utils/baseURL';

export const wishlistApi = createApi({
  reducerPath: 'wishlistApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api`,
  }),
  endpoints: (builder) => ({

    addToWishlistApi: builder.mutation({
      query: (data) => ({
        url: '/add-to-wishlist',
        method: 'POST',
        body: data,
      }),
    }),

    removeFromWishlistApi: builder.mutation({
      query: (data) => ({
        url: '/remove-from-wishlist',
        method: 'DELETE',
        body: data,
      }),
    }),

    getAllWishlistItemsApi: builder.query({
      query: (userId) => ({
        url: `/wishlist/${userId}`,
        method: 'GET',
      }),
    }),

  }),
});

export const { useAddToWishlistApiMutation, useRemoveFromWishlistApiMutation, useGetAllWishlistItemsApiQuery } = wishlistApi;
