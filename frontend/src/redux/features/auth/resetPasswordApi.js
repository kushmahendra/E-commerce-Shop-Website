import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../../../utils/baseURL';

const resetPasswordApi = createApi({
    reducerPath: 'resetPasswordApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/user`,
        // credentials: 'include',
    }),
    tagTypes: ['User'],

    endpoints: (builder) => ({
        // Step 1: Request Password Reset Link
        resetUserPasswordLink: builder.mutation({
            query: (email) => ({
                url: '/forgotPassword',
                method: 'POST',
                body: { email},
            }),
        }),

        // Step 2: Reset Password with OTP
        resetUserPassword: builder.mutation({
            query: ({  email,password,otp }) => ({
                url: '/resetPassword',
                method: 'PUT',
                body: {email,password,otp},
            }),
            // invalidatesTags: ['User'],
        }),
    }),
});


// Export hooks for API endpoints
export const { 
    useResetUserPasswordLinkMutation, 
    useResetUserPasswordMutation 
} = resetPasswordApi;

export default resetPasswordApi;
