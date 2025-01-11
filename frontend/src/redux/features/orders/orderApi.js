import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../../../utils/baseURL';

const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api`,
        credentials: 'include', // Include cookies if needed
    }),
    tagTypes: ['Order'],
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (newOrder) => ({
                url: '/orders',
                method: 'POST',
                body: newOrder,
            }),
            invalidatesTags: ['Order'],
        }),
        getAllOrders: builder.query({
            query: () => ({
                url: '/orders',
                method: 'GET',
            }),
            providesTags: ['Order'],
        }),
        getSingleOrder: builder.query({
            query: (orderId) => ({
                url: `/orders/${orderId}`,
                method: 'GET',
            }),
            providesTags: (result, error, orderId) => [{ type: 'Order', id: orderId }],
        }),
        updateOrder: builder.mutation({
            query: ({ orderId,  status  }) => ({
                url: `/orders/${orderId}`,
                method: 'PUT',
                body:  status ,
            }),
            invalidatesTags: (result, error, { orderId }) => [{ type: 'Order', id: orderId }],
        }),
        deleteOrder: builder.mutation({
            query: (orderId) => ({
                url: `/orders/${orderId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, orderId) => [{ type: 'Order', id: orderId }],
        }),
    }),
});

export const {
    useCreateOrderMutation,
    useGetAllOrdersQuery,
    useGetSingleOrderQuery,
    useUpdateOrderMutation,
    useDeleteOrderMutation,
} = orderApi;

export default orderApi;
