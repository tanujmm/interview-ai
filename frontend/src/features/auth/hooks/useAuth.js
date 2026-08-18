import { useContext, useEffect } from "react"
import { AuthContext } from "../auth.context.jsx"
import { getMe, login, logout, register } from "../services/auth.service.js"

export const useAuth=()=>{
  const context=useContext(AuthContext)

  const {user,setUser,loading,setLoading}=context

  const handleLogin=async({email,password})=>{
    setLoading(true)

    try{

      const data=await login({email,password})
      setUser(data.user)
    }
    catch(err){
        console.log(err)
    }finally{
      setLoading(false)

    }

  }

  const handleRegister=async({username,email,password})=>{
    setLoading(true)
    try{

      const data=await register({username,email,password})
      setUser(data.user)
    }
    catch(err){

    }
    finally{

      setLoading(false)
    }

  }

  const handleLogout=async()=>{
    setLoading(true)
    try{

      const data=await logout()
      setUser(null)
    }
    catch(err){}
    finally{

      setLoading(false)
    }
  }

useEffect(()=>{
  const getAndSetUser=async()=>{
    try {
      const data=await getMe()
      // data undefind hoga agar backend chal nahi raha hoga ya network error hoga
      if (data && data.user) {
        setUser(data.user)
      } else {
        setUser(null)
      }
    } catch (error) {
      console.log(error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }
  getAndSetUser()
},[])

  return {
    user,
    loading,
    handleLogin,
    handleRegister,
    handleLogout
  }
}