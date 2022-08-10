import React, { Component } from 'react'


const Alert = (props) => {
  
    return (
        alert = props.alert_type,
        console.log(props),
        props.alert_type !== undefined ? ( 
            <div className="container my-2">
            <div className={`alert alert-${props.alert_type} alert-dismissible fade show`}>
                {props.alert_msg}
           
            </div>
        </div>
         ) : null

        

    )
  }


export default Alert