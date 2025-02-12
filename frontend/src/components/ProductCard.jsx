
import { Card, CardContent, CardFooter, CardHeader,} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { useAddToCartMutation } from "@/Redux/api/cartApiSlice";
import { toast } from "sonner";
// import { useMutation } from "@tanstack/react-query";
// import { apiRequest, queryClient } from "@/lib/queryClient";
// import { useToast } from "@/hooks/use-toast";

export default function ProductCard({ product,refetch }) {
//   const { toast } = useToast();

const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated)
const user= useSelector((state)=>state.auth.user)

const [addProduct,{isLoading}]=useAddToCartMutation() 
const handleAddToCart=async()=>{
  console.log("add to cart")
  try {
    const response =await addProduct({userId:user.id, productId:product._id,quantity:1})
    console.log(response)
    toast.success("Product added to cart")
    refetch()
  } catch (error) {
    console.log(error)
    toast.error("Something went wrong")
  }
    
}


  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-contain"
        />
      </CardHeader>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold">{product.title}</h3>
        {/* <p className="text-sm text-muted-foreground mt-2">{product.description}</p> */}
        <p className="text-lg font-semibold mt-4">${Number(product.price).toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        {isAuthenticated&&<Button
          onClick={handleAddToCart}
          className="w-full"
          disabled={product.stock === 0 }
        >
          {product.stock === 0
            ? "Out of Stock"
            
            : "Add to Cart"}
        </Button>}
      </CardFooter>
    </Card>
  );
}
