
// import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { useGetCartQuery } from "@/Redux/api/cartApiSlice";
import { ShoppingCart, Package, LogOut, CircleUserRound } from "lucide-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
// import { useQuery } from "@tanstack/react-query";
// import { Cart } from "@shared/schema";
import { Link } from "react-router-dom";


export default function Navbar({cart}) {
//   const { user, logoutMutation } = useAuth();
const user= useSelector((state)=>state.auth.user)
const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated)



console.log(isAuthenticated,user)
const handleLogout=async()=>{
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  window.location.reload()
}
  


  

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b ">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link className="text-xl font-bold" to='/'>
            E-Commerce
          </Link>

          {isAuthenticated?<div className="flex items-center gap-4">
            <Link className="relative" to="/cart">
             
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                  {cart?.products?.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground w-4 h-4 rounded-full text-xs flex items-center justify-center">
                      {cart?.products?.length}
                    </span>
                  )}
                </Button>
             
            </Link>

            <Link to="/orders">
             
                <Button variant="ghost" size="icon">
                  <Package className="h-5 w-5" />
                </Button>
             
            </Link>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleLogout()}
            //   disabled={logoutMutation.isPending}
            >
              <LogOut className="h-5 w-5" />
            </Button>

            <span className="text-sm text-muted-foreground">
              {user.name}
            </span>
          </div>:
          <Link to='/auth'><Button size='icon' variant="ghost"><CircleUserRound className="" /></Button></Link>}
        </div>
      </div>
    </nav>
  );
}
