
import { apiSLice } from "../slices/apiSlice";

export const productApiSlice = apiSLice.injectEndpoints({
    endpoints:(builder)=>({
        getProducts:builder.query({
            query:()=>({
                url:"/products",
                method:"GET",

            }),
        }),
    })
})
export const {useGetProductsQuery}= productApiSlice