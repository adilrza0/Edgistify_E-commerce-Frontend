import { useEffect, useState } from 'react'


import './App.css'
import AuthPage from './Pages/Authentication'
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from './components/Navbar'
import HomePage from './Pages/HomePage'
import { setToken, setUser } from './Redux/slices/authSlice'
import CartPage from './Pages/Cart'
import OrdersPage from './Pages/Order'
import { useGetCartQuery } from './Redux/api/cartApiSlice'

const ProtectedRoute = ({children})=>{
  
  const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated)
  return isAuthenticated ? children : <Navigate to='/auth'/>
}



function App() {
  const [count, setCount] = useState()

  
  const dispatch = useDispatch()
  const user= useSelector((state)=>state.auth.user)
  const {data:cart,refetch}= useGetCartQuery({userId:user?.id})
  useEffect(()=>{
    if(localStorage.getItem('token')&&localStorage.getItem('user')){
      console.log(localStorage.getItem('token'))
      dispatch(setUser(JSON.parse(localStorage.getItem('user'))))
      dispatch(setToken(localStorage.getItem('token')))
    }
    
  },[])

  return (
    <>
    <BrowserRouter>
    <Navbar cart={cart}/>
    <div className='mt-10 m-10'>
    <Routes >
      <Route path='/' element={<HomePage refetch={refetch}/>}/>
      <Route path='/auth' element={<AuthPage/>}/>
      <Route path='/cart' element={<ProtectedRoute><CartPage/></ProtectedRoute>}/>
      <Route path='/orders' element={<ProtectedRoute><OrdersPage/></ProtectedRoute>}/>
    </Routes>
    </div>
    <Toaster richColors/>
    
    
    </BrowserRouter>
     
      
      
    </>
  )
}

export default App
