import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getBaseUrl } from '../../../utils/baseURL'

const authApi=createApi({
    reducerPath:'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/auth`,
        // credentials: 'include',
    }),
    tagTypes:['User'],
    
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
                invalidatesTags: ["User"],
              }),
              
            deleteUser:builder.mutation({
                query:(userId)=>
                ({
                    url:`/users/${userId}`,
                    method:'DELETE',
                }),
                invalidatesTags:['User'],
            }),
            // updateUserRole:builder.mutation({
            //     query:({userId,profileImage,bio,profession,firstName, lastName,password, phoneNumber})=>
            //     ({
            //         url:`/users/${userId}`,
            //         method:'PUT',
            //         body:{profileImage,bio,profession,firstName, lastName,password, phoneNumber}
            //     }),
            //     refetchOnMount:true,
            //     invalidatesTags:['User'],
            // }),
            updateUserInfo: builder.mutation({
                query: ({ userId, profileImage, bio, profession, firstName, lastName, phoneNumber }) => {
                  const token = localStorage.getItem("token");
                  return {
                    url: `/users/${userId}`,
                    method: "PUT",
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                    body: { profileImage, bio, profession, firstName, lastName, phoneNumber },
                  };
                },
                refetchOnMount: true,
                invalidatesTags: ["User"],
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
export const {useRegisterUserMutation,useGetUserMutation ,useGetUserQuery, useLoginUserMutation,useLogoutUserMutation,useDeleteUserMutation,useUpdateUserInfoMutation,useEditProfileMutation}=authApi;
export default authApi;