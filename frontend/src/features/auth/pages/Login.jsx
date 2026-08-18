import React from 'react'
import "../auth.form.scss"
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'
const Login = () => {
  const navigate=useNavigate()
  const {loading,handleLogin}=useAuth()
 
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")



    if(loading){
      return (

        <main>
          <h1>Loading.....</h1>
        </main>
      )
    }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    await handleLogin({email,password})
    navigate("/")
  }
  
  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
           <form action="" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email" name="email" id='email' >Email</label>
              <input type="email" placeholder='Enter Email address' onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="input-group">

              <label htmlFor="password" name="password" id='password'>Password</label>
              <input type="password" placeholder='Enter your password' onChange={(e)=>setPassword(e.target.value)} />
            </div>

            <button className='button primary-button'>Login</button>
           </form>
            <p>Not Register Yet ? <Link to={"/register"}>Register </Link></p>
      </div>
    </main>
  )
}

export default Login