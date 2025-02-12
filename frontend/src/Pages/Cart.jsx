




import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { use, useEffect, useState } from "react";

import { toast } from "sonner";

import CartItem from "@/components/CartItem";
import { useGetCartQuery } from "@/Redux/api/cartApiSlice";
import { useSelector } from "react-redux";
import { usePlaceOrderMutation } from "@/Redux/api/orderApiSlice";
import { useNavigate } from "react-router-dom";



export default function CartPage() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate()
  
  const [shippingAddress, setShippingAddress] = useState("");
  const {data:cart,isLoading,refetch}=useGetCartQuery({userId:user?.id})
  useEffect(()=>{
    refetch()
  } ,[])
  console.log(cart)


     const [placeOrder,{isLoading:isLoadingPlaceOrder}]=usePlaceOrderMutation()
     const handlePlaceOrder=async()=>{
       try{
         const response=await placeOrder({userId:user.id,shippingAddress})
         console.log(response)
         toast.success("Order placed successfully")
         setShippingAddress("")
         navigate("/orders")
       }catch(error){
         console.log(error)
         toast.error("Something went wrong")
       }
     }

//   if (isLoading) return <div>Loading...</div>;

//   const cartItems = cart?.map((item) => ({
//     ...item,
//     product: products?.find((p) => p.id === item.productId),
//   }));

  const total = cart?.products?.reduce(
    (sum, item) => sum + Number(item.productId?.price || 0) * item.quantity,
    0
  );

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
      
      {(!cart || cart.products.length === 0) ? (
        <div className="text-center py-8">
          <p className="text-xl text-muted-foreground">Your cart is empty</p>
          <Button className="mt-4" onClick={() => navigate("/")}>
            Continue Shopping
          </Button>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            {cart?.products?.map((item) => (
              <CartItem refetch={refetch} key={item.productId._id} item={item} />
            ))}
          </div>
          
          <Card className="p-6 h-fit">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Total</span>
                <span className="font-semibold">${total?.toFixed(2)}</span>
              </div>
              
              <Input
                placeholder="Shipping Address"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
              />
              
              <Button
                className="w-full"
                disabled={!shippingAddress}
                onClick={() =>handlePlaceOrder()}
              >
                {
                // placeOrderMutation.isPending 
                0? "Processing..." : "Place Order"}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
