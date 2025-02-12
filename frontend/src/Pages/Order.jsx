
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { useSelector } from "react-redux";

import { useGetOrdersQuery } from "@/Redux/api/orderApiSlice";
import { useEffect } from "react";

export default function OrdersPage() {

    const user = useSelector((state) => state.auth.user);
console.log(user)
const {data:orders,isLoading,refetch}=useGetOrdersQuery({userId:user?.id})
console.log(orders)
useEffect(()=>{
  refetch()
},[])


  

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold mb-8">Orders</h1>
      
      {(!orders || orders.length === 0) ? (
        <div className="text-center py-8">
          <p className="text-xl text-muted-foreground">No orders found</p>
        </div>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={orders._id}>
                  <TableCell className="font-medium">{order._id}</TableCell>
                  <TableCell>{format(new Date(order.createdAt), "PPp")}</TableCell>
                  <TableCell>{order.orderStatus}</TableCell>
                  <TableCell>{order.paymentStatus}</TableCell>
                  <TableCell className="text-right">${Number(order.totalPrice).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
