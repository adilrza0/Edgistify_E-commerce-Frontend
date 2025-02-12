'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { FaGoogle, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { useLoginMutation, useRegisterMutation } from '@/Redux/api/authenticateApiSlice'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setToken, setUser } from '@/Redux/slices/authSlice'






export default function AuthPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [acceptedTerms, setAcceptedTerms] = useState(false)       
    const [name, setName] = useState('')
    
    const [isLoading, setIsLoading] = useState(false)
    const [registerIsLoading, setRegisterloading] = useState(false)
    const [loginIsLoading, setLoginloading] = useState(false)
    const [login,] = useLoginMutation();
    const [register,] = useRegisterMutation();
    const dispatch = useDispatch()
    const navigate = useNavigate()  


    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            setLoginloading(true)
            const response = await login({email , password})
          
            console.log(response)
            dispatch(setToken(response.data.token))
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('user', JSON.stringify(response.data.user))
            toast.success("Successfully Logged In")
            navigate("/")
        } catch (error) {
            console.log(error)
            setLoginloading(false)
            toast.error("Something went wrong")
        }
        finally{
            setLoginloading(false)
        }
    };

    const handleRegister = async (event) => {
        event.preventDefault()
        try {
            setRegisterloading(true)
            const response = await register({name, email , password})
            if(response.error){
              throw new Error(response.error.message)
            }
            console.log(response);
            toast.success("Successfully Registered")
            
        } catch (error) {
            console.log(error)  
            setRegisterloading(false)
            toast.error("Something went wrong")
        }
        finally{
            setRegisterloading(false)
        }
        
        
    };      
  return (
    <div className=" m-10 flex  justify-center min-h-screen ">
      <div className="w-full max-w-md">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <div className="space-y-4 mt-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input value={email} onChange={(e) => setEmail(e.target.value)} id="login-email" placeholder="m@example.com" required type="email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input value={password} onChange={(e) => setPassword(e.target.value)} id="login-password" required type="password" />
                </div>
                {/* <div className="flex justify-between items-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="link" className="p-0">Forgot password?</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Forgot Password</DialogTitle>
                        <DialogDescription>
                          Enter your email address and we'll send you a link to reset your password.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleForgotPassword} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="forgot-password-email">Email</Label>
                          <Input 
                            id="forgot-password-email" 
                            placeholder="m@example.com" 
                            required 
                            type="email"
                            value={forgotPasswordEmail}
                            onChange={(e) => setForgotPasswordEmail(e.target.value)}
                          />
                        </div>
                        <Button type="submit" disabled={isLoading}>
                          {isLoading ? "Sending..." : "Send Reset Link"}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div> */}
                <Button className="w-full" type="submit" disabled={loginIsLoading}>
                  {loginIsLoading ? "Logging in..." : "Log in"}
                </Button>
              </form>
            </div>
          </TabsContent>
          <TabsContent value="signup">
            <div className="space-y-4 mt-4">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Name</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} id="signup-name" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input value={email} onChange={(e) => setEmail(e.target.value)} id="signup-email" placeholder="m@example.com" required type="email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input value={password} onChange={(e) => setPassword(e.target.value)} id="signup-password" required type="password" />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={acceptedTerms}
                    onCheckedChange={(checked) => setAcceptedTerms(checked)}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the{' '}
                    <a href="#" className="text-blue-600 hover:underline">
                      terms and conditions
                    </a>
                  </label>
                </div>
                <Button className="w-full" type="submit" disabled={isLoading || !acceptedTerms}>
                  {registerIsLoading ? "Signing up..." : "Sign up"}
                </Button>
              </form>
            </div>
          </TabsContent>
        </Tabs>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-100 px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3">
            <Button variant="outline" onClick={() => {}} disabled={isLoading}>
              <FaGoogle className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button variant="outline" onClick={() => {}} disabled={isLoading}>
              <FaLinkedin className="mr-2 h-4 w-4" />
              LinkedIn
            </Button>
            <Button variant="outline" onClick={() => {}} disabled={isLoading}>
              <FaTwitter className="mr-2 h-4 w-4" />
              Twitter
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}