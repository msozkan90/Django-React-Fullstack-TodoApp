import {Outlet} from "react-router-dom";
import Navbar from "../Navbar";

import React,{ useEffect} from 'react'




function Layout() {

  const root= document.getElementById("root")

  useEffect(() => {

    try {
    let nav = root.firstElementChild
    let div = document.createElement("div")
    let nbsp =nav.previousSibling
    div.appendChild(nbsp)
    div.remove()


    }
    catch(err) {
      console.log(err)
    }
  

}, )



 
  return (
        <>
          <Navbar  />
          <Outlet />
        </>
  )
}

export default Layout



