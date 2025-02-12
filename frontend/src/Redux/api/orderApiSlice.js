import { apiSLice } from "../slices/apiSlice";

export const orderApiSlice = apiSLice.injectEndpoints({
    endpoints:(builder)=>({
        getOrders:builder.query({
            query:(params)=>({
                url:"/orders",
                method:"GET",
                params,

            }),
        }),
        placeOrder:builder.mutation({
            query:(body)=>({
                url:"/orders/place-order",
                method:"POST",
                body,
            }),
        }),
    })
})

export const {useGetOrdersQuery,usePlaceOrderMutation}=orderApiSlice