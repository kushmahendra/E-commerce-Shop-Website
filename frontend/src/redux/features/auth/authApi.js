import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getBaseUrl } from '../../../utils/baseURL'

const authApi=createApi({
    reducerPath:'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/auth`,
    
    }),
    tagTypes:['ShopUser'],
    
    endpoints: (builder)=>(
        {
            registerUser:builder.mutation({
                query:(newUser)=>
                ({
                    url:'/register',
                    method:'POST',
                    body:newUser
                })
            }),
            
            loginUser: builder.mutation({
                query: (credentials) => {
                    const token = localStorage.getItem('token'); // Retrieve token
                    return {
                        url: '/login',
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${token}`, // Use token here
                        },
                        body: credentials,
                    };
                },
            }),
            
            logoutUser:builder.mutation({
                query:()=>
                ({
                    url:'/logout',
                    method:'POST',
                    headers:{
                        'Authorization':`Bearer ${localStorage.getItem("token")}`
                    }
                })
            }),
          
            getUser: builder.mutation({
                query: (userId) => {
                  const token = localStorage.getItem("token");
                  return {
                    url: `/user/${userId}`,
                    method: "GET",
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  };
                },
                invalidatesTags: ["ShopUser"],
              }),

              getSingleUser: builder.query({
                query: (userId) => {
                  const token = localStorage.getItem("token"); // Fetch the token from local storage
                  return {
                    url: `/user/${userId}`, // Dynamic user ID in the endpoint
                    method: "GET", // HTTP GET method
                    headers: {
                      Authorization: `Bearer ${token}`, // Include the token in the request headers
                    },
                  };
                },
                providesTags: ["ShopUser"], // Tags for caching and re-fetching data
              }),
              
              
            deleteUser:builder.mutation({
                query:(userId)=>
                ({
                    url:`/users/${userId}`,
                    method:'DELETE',
                }),
                invalidatesTags:['ShopUser'],
            }),
          
            updateUserInfo: builder.mutation({
                query: ({ userId, profileImage, bio, profession, firstName, lastName, phoneNumber ,addresses }) => {
                  const token = localStorage.getItem("token");
                  return {
                    url: `/users/${userId}`,
                    method: "PUT",
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                    body: { profileImage, bio, profession, firstName, lastName, phoneNumber,addresses },
                  };
                },
                refetchOnMount: true,
                invalidatesTags: ["ShopUser"],
              }),
              
              
            editProfile:builder.mutation({
                query:(profileData)=>
                ({
                    url:'/edit-profile',
                    method:'PATCH',
                    body:profileData
                })
            }),
        })

})
export const {useRegisterUserMutation,useGetUserMutation ,useGetSingleUserQuery, useLoginUserMutation,useLogoutUserMutation,useDeleteUserMutation,useUpdateUserInfoMutation,useEditProfileMutation}=authApi;
export default authApi;