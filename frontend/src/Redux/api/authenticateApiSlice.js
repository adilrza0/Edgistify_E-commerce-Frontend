import { apiSLice } from "../slices/apiSlice";

export const authenticateApiSlice = apiSLice.injectEndpoints({
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(body)=>({
                url:"/auth/login",
                method:"POST",
                body,
            }),
        }),
        register:builder.mutation({
            query:(body)=>({
                url:"/auth/register",
                method:"POST",
                body,
            }),
        }),
    }),
})
export const {useLoginMutation,useRegisterMutation}= authenticateApiSlice