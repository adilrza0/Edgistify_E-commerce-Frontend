import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const baseUrl ='https://edgistify-e-commerce-backend.onrender.com/api'

const baseQuery = fetchBaseQuery({baseUrl})

export const apiSLice =createApi({
    baseQuery,
    tagTypes:[],
    endpoints:(builder)=>({})
})