import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useDeleteProductMutation, useModifyProductQuantityMutation } from "@/Redux/api/cartApiSlice";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export default function CartItem({ item, refetch}) {
  const user = useSelector((state) => state.auth.user);
  const [modifyProductQuantity, { isLoading }] = useModifyProductQuantityMutation();

  const handleModifyQuantity = async (newQuantity) => {
    try {
      const response = await modifyProductQuantity({
        userId: user.id,
        productId: item.productId._id,
        quantity: item.quantity + newQuantity,
      });
      console.log(response);
      toast.success("Product quantity updated");
      refetch()
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  const [deleteProduct,  ] = useDeleteProductMutation();
  const handleDeleteProduct = async () => {
    try {
      const response = await deleteProduct({
        userId: user.id,
        productId: item.productId._id,
      });
      console.log(response);
      toast.success("Product deleted");
      refetch()
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  //   const updateQuantityMutation = useMutation({
  //     mutationFn: async (quantity: number) => {
  //       const res = await apiRequest("PATCH", `/api/cart/${item.productId}`, {
  //         productId: item.productId,
  //         quantity,
  //       });
  //       return res.json();
  //     },
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
  //     },
  //     onError: (error: Error) => {
  //       toast({
  //         title: "Error",
  //         description: error.message,
  //         variant: "destructive",
  //       });
  //     },
  //   });

  //   const removeItemMutation = useMutation({
  //     mutationFn: async () => {
  //       await apiRequest("DELETE", `/api/cart/${item.productId}`);
  //     },
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
  //       toast({
  //         title: "Item removed",
  //         description: "The item has been removed from your cart",
  //       });
  //     },
  //   });

  //   if (!item.product) return null;

  const itemTotal = Number(item.productId.price) * item.quantity;

  return (
    <Card className="p-4">
      <div className="flex gap-4">
        <img
          src={item.productId.image}
          alt={item.productId.title}
          className="w-24 h-24 object-cover rounded"
        />

        <div className="flex-1">
          <div className="flex justify-between">
            <h3 className="font-semibold">{item.productId.title}</h3>
            <p className="font-semibold">${itemTotal.toFixed(2)}</p>
          </div>

          <p className="text-sm text-muted-foreground mt-1">
            ${Number(item.productId.price).toFixed(2)} each
          </p>

          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleModifyQuantity(-1)}
                disabled={item.quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>

              <span className="w-8 text-center">{item.quantity}</span>

              <Button
                variant="outline"
                size="icon"
                onClick={() => handleModifyQuantity(1)}
                disabled={item.quantity >= item.productId.stock}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDeleteProduct()}
              // disabled={removeItemMutation.isPending}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
