
import ProductCard from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetProductsQuery } from "@/Redux/api/productApiSlice";
import { setToken } from "@/Redux/slices/authSlice";
import { use, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



export default function HomePage({refetch}) {
    const [isLoading, setIsLoading] = useState(false)
    const {data:products,isLoading:isLoadingProducts}=useGetProductsQuery()
    useEffect(()=>{
        setToken(localStorage.getItem('token'))
    },[])
    const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated)
;
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-[400px] w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold mb-8">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product) => (
          <ProductCard refetch={refetch} key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
