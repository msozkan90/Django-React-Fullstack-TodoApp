import React, {useEffect,useState} from 'react'
import {  Link } from "react-router-dom";
import logo from './logo.svg';
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom';
import APIService from './APIService';
function Navbar() {
  let navigate  = useNavigate()
  const [token,  removeToken] = useCookies(['mytoken'])
  const [change, setChange] = useState(null)




  const logoutBtn = () => {
    
    removeToken(['mytoken'])
    setChange(Math.random().toString(36).substring(2,7))
  }

  return (
    <>
<nav className="navbar navbar-expand-lg  bg-dark">
  <a className="navbar-brand text-white" href="#">   <img src={logo} alt="react-logo" className='r-logo ' />Django-React App</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active mx-3 ">
       <Link to="/">Home</Link>
      </li>
    </ul>




    <ul className="navbar-nav ml-auto">
    {token['mytoken'] !== "undefined"  ? 
            <li className="nav-item mx-3 ">
            <a onClick={logoutBtn} href="#" className="logout" >Logout</a>
          </li>
      :
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className='navbar-nav mr-auto'>
      <li className="nav-item">
      <Link to="/login">Login</Link>
      </li>

      </ul>
      </div>
       }
         </ul>
  </div>
</nav>

</>
  )
}

export default Navbar






