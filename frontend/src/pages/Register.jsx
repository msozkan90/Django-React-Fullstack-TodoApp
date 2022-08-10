import Alert from '../Alert';
import Alert2 from '../Alert2';
import APIService from '../APIService';

import React, {useState, useEffect} from 'react'
import {useCookies} from 'react-cookie';

import {useNavigate} from 'react-router-dom';
function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [all_users, setAllUsers] = useState([])
  const [alert_msg, setAlertMsg] = useState()
  const [alert_type, setAlertType] = useState()
  const [alert2_msg, setAlertMsg2] = useState()
  const [alert2_type, setAlertType2] = useState()

  const [token, setToken] = useCookies(['mytoken'])
  let navigate  = useNavigate()


  useEffect(() => {
    if(token['mytoken'] !== "undefined") {
      console.log("register")
      navigate('/');
    }
}, [token])


  const getCookie =(name) => {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();

            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const getUsername =(username) =>{
  
  fetch('http://127.0.0.1:8000/account/username_check/')
  .then(response => response.json())
  .then(data => 

    setAllUsers(data),

  )
  setAlertType(undefined);
  setAlertMsg(undefined);
  checkUsername(username)

}

const checkUsername = (username) =>{
let user_name=username
let db_username=all_users
if(user_name.length < 5){
  setAlertType('danger');
  setAlertMsg('This field must be more than 5 characters.');
} 
           
{db_username.map(function(user, index){
  if(user.username == user_name){
    console.log(user.username)
    setAlertType('danger');
    setAlertMsg('This username is already taken.');
  }

  else{
    console.log("user.username")

  }

})}

}

const handleUsername = (e) =>{
  e.preventDefault()
  setUsername(e.target.value)
  getUsername(e.target.value)
}

const handlePassword = (e) =>{
  e.preventDefault()
  setAlertType2(undefined);
  setAlertMsg2(undefined);
  setPassword(e.target.value)
  if (e.target.value.length < 8){
    console.log(password.length)
    setAlertType2('danger');
    setAlertMsg2('This field must be more than 8 characters.');
  }  

}


 const handleSubmit = (e) =>{
    e.preventDefault()
    var csrftoken = getCookie('csrftoken')
    let body = {username,password}
    let body_login = {username,password}
    if (username == '' ){
      setAlertType('danger');
      setAlertMsg('This field cannot leave blank.');

    }
    else if(password == ''){    
        setAlertType2('danger');
      setAlertMsg2('This field cannot leave blank.');
    }
    else if (alert2_msg !== undefined || alert_msg !== undefined){
      console.log("ALERT")
    }
    else{

    APIService.RegisterUser(body,csrftoken)
    .then(resp => APIService.LoginUser(body_login))
    .then(resp => setToken('mytoken',resp.token))
    .catch(error => console.log(error))
    }

  }
  return (
    <>
    <div className="container">
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
        <h3>Register</h3>
          <form action="" onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="id_username">Username</label>
            <input className="form-control "  onChange={handleUsername} type="text" name="username" maxLength="150" autoFocus=""  id="id_username" /> 
            < Alert alert_msg= {alert_msg}  alert_type= {alert_type}/>
            </div>


            <div className="form-group">
            <label htmlFor="id_password">Password</label>

            <input className="form-control"  onChange={handlePassword} type="password" name="password" required="" id="id_password" />
            < Alert2 alert_msg= {alert2_msg}  alert_type= {alert2_type}/>
            </div>


            <div className="form-group">
            <button className='btn btn-dark w-100'>Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
        
</>
  )
}

export default Register

