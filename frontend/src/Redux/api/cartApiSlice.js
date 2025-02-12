import { apiSLice } from "../slices/apiSlice";

export const cartApiSlice = apiSLice.injectEndpoints({
    endpoints:(builder)=>({
        getCart:builder.query({
            query:(params)=>({
                url:"/cart",
                method:"GET",
                params,

            }),
        }),
        addToCart:builder.mutation({
            query:(body)=>({
                url:"/cart/add-product",
                method:"POST",
                body,
            }),
        }),
        modifyProductQuantity:builder.mutation({
            query:(body)=>({
                url:"/cart/modify-product-quantity",
                method:"POST",
                body,
            }),
        }),
        deleteProduct:builder.mutation({
            query:(body)=>({
                url:"/cart/delete-product",
                method:"POST",
                body,
            }),

            
        }),
    }),
})
export const {useGetCartQuery,useAddToCartMutation,useModifyProductQuantityMutation,useDeleteProductMutation}= cartApiSlice