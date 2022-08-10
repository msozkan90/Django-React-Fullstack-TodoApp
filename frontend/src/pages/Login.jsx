import React, {useState, useEffect} from 'react'
import {useCookies} from 'react-cookie';
import Alert from '../Alert';
import {useNavigate} from 'react-router-dom';
import APIService from '../APIService';
import {  Link } from "react-router-dom";
function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error_msg, setErrorMsg] = useState()
  const [error_type, setErrorType] = useState()

  const [token, setToken] = useCookies(['mytoken'])
  let navigate  = useNavigate()




useEffect(() => {
  if(token['mytoken'] && token['mytoken'] !== "undefined") {
    console.log("login")
    navigate('/');
  }
}, [token])





const  handleUsername =(e) =>{
 
    setUsername(e.target.value)

    }
  

 const  handlePassword = (e) =>{

    
    setPassword(e.target.value)


  
  }

  const LoginUser =(body) =>{

    return fetch('http://127.0.0.1:8000/auth/', {
      'method':'POST',
      headers: {
          'Content-Type':'application/json',
          
        }, 
        body:JSON.stringify(body)

    })
    .then(resp => resp.json())
    .then(resp => responseStatus(resp))
     .catch(error =>console.log(error))

  }



const responseStatus = (response) =>{

  if (response.token){
    console.log("ifteyim")
    setErrorMsg(undefined)
    setErrorType(undefined)
   setToken('mytoken',response.token)
  }
  else{
    setErrorMsg("Username or Password is not correct")
    setErrorType("danger")

    

  }
}

 const handleSubmit = (e) =>{
  e.preventDefault()
    setErrorMsg(undefined)
    setErrorType(undefined)
    if (username == '' || password == ''){
      setErrorMsg("Username or Password fields cannot leave blank.")
      setErrorType("danger")
    }
    else{
      
       LoginUser({username, password})


    }

   
  }
  return (
    <>
    <div className="container">
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
        < Alert alert_msg= {error_msg}  alert_type= {error_type}/>
        <h3>Login</h3>
          <form action="" onSubmit={handleSubmit} >
         
            <div className="form-group">
            <label htmlFor="id_username">Username</label>
            <input  onChange={handleUsername} value={username}  type="text"  className="form-control"  name="username"   autoFocus=""  required="" id="id_username"/>
            </div>
            <div className="form-group">
            <label htmlFor="id_password">Password</label>
            <input  onChange={handlePassword} className="form-control " type="password" name="password"   required="" id="id_password" />

            </div>
            <div className="form-group">
            <button className='btn btn-dark w-100' type="submit">Login</button>
            <div>
            If you have not any account please <Link to="/register"> <b> register</b></Link>
            </div>
            </div>
          </form>
        </div>
      </div>
    </div>
        
</>
  )
}

export default Login











