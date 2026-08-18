import React from 'react'
import "../auth.form.scss"
import { useNavigate ,Link} from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'

const Register = () => {
 const {loading,handleRegister}=useAuth()
 
  const navigate=useNavigate()

  const [username,setUsername]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  const handleReload=async(e)=>{
    e.preventDefault()

   await handleRegister({username,email,password})
   navigate("/")
       if(loading){
      return (

        <main> 
          <h1>Loading.....</h1>
        </main>
      )
    }

  }

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
           <form action="" onSubmit={handleReload}>
              <div className="input-group">
              <label htmlFor="username" name="username" id='username' >Username</label>
              <input type="text" placeholder='Enter Username Here' onChange={(e)=>setUsername(e.target.value)}/>
            </div>

            <div className="input-group">
              <label htmlFor="email" name="email" id='email' >Email</label>
              <input type="email" placeholder='Enter Email address' onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="input-group">

              <label htmlFor="password" name="password" id='password'>Password</label>
              <input type="password" placeholder='Enter your password' onChange={(e)=>setPassword(e.target.value)}/>
            </div>

            <button className='button primary-button'>Register</button>

           </form>
            <p>Already have an account? <Link to={"/login"}>Login </Link></p>
      </div>
    </main>
  )
}

export default Register