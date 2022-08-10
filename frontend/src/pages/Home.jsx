import React, {useState, useEffect} from 'react'
import APIService from '../APIService';
import {useNavigate} from 'react-router-dom';
import {useCookies} from 'react-cookie';
function Home() {
  const [title, setTitle] = useState('')
  const [completed, setCompleted] = useState(false)
  const [todo_id, setTodoId] = useState(null)
  const [change, setChange] = useState(null)
  const [owner_id, setOwnerId] = useState(null)
  const [todoList, setTodo] = useState([])
  const [editTodo, setEditTodo] = useState(null)
  const [editing, setEditing] = useState(false)
  const [token, setToken ,removeToken] = useCookies(['mytoken'])
  let navigate  = useNavigate()


useEffect(() => {
  if(!token['mytoken'] ) {

    navigate("/login")

  }
  else if(token['mytoken'] == "undefined"){

    navigate("/login")

  }
  else if(token['mytoken'] == undefined){

    navigate("/login")
  }
}, [token])



  useEffect(() => {
    var csrftoken = getCookie('csrftoken')
    if(!(token['mytoken'] || token.mytoken == "undefined")) {

    }
    else{
      fetch('http://127.0.0.1:8000/account/token_check/', {
        'method':'POST',
        headers: {
          'Content-Type':'application/json',
          'Authorization':`Token ${token['mytoken']}` 
        },
        body:JSON.stringify(token['mytoken'])
      })
      .then(resp => resp.json())
      .then(resp => 

             
    fetch('http://127.0.0.1:8000/getItem/', {
      'method':'POST',
      headers: {
        'Content-Type':'application/json',

        'X-CSRFToken':csrftoken, 
      },
     body:JSON.stringify(resp[0].user)
    
    })
    .then(resp => resp.json())
    .then(resp => setTodo(resp.id))
    .catch(error => console.log(error))
        

      )
      .catch(error => console.log(error))
    }


}, [change])



 const getCookie = (name)  => {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}





 const handleSubmit = (e) => {
    e.preventDefault()

    console.log('ITEM:', title)
    console.log('COMPLETED:', completed)
    console.log('TODO ID:', todo_id)
    let body= {title,completed,token}
    var csrftoken = getCookie('csrftoken')
    var url = 'http://127.0.0.1:8000/api/todo/'
    if(editing == true){

      url = `http://127.0.0.1:8000/api/todo/${todo_id}/`
      APIService.UpdateTodo(todo_id, body, token)
      setChange(Math.random().toString(36).substring(2,7))
      setEditing(false)
      setTitle("")
      setTodoId(null)
      setCompleted(false)

    }
    else{


    APIService.AddTodo(body, token)
    setChange(Math.random().toString(36).substring(2,7))
    setTitle("")
    setTodoId(null)
    setCompleted(false)
    

  }

  }

 const startEdit = (task) =>{
  setChange(Math.random().toString(36).substring(2,7))
    setTitle(task.title)
    setTodoId(task.id)
    setCompleted(task.completed)
    setEditing(true)

  }


 const  deleteItem =  (task) =>{
    setChange(Math.random().toString(36).substring(2,7))
    APIService.DeleteTodo(task.id, token)

  }


  const strikeUnstrike = (task) => {
    setChange(Math.random().toString(36).substring(2,7))
    task.completed = !task.completed
    APIService.UpdateTodo(task.id,task,token)

 
  }

  return (
    <>
    <div className="container mt-5">
    <div className="row">
      <div className="col-md-3"></div>
      <div className="col-md-6 table_todo">
      <div id="task-container  ">
         <h3 className='mt-3'>Todo App</h3>
          <div  id="form-wrapper" className='mt-3'>
             <form onSubmit={handleSubmit}  id="form">
                <div className="flex-wrapper">
                    <div style={{flex: 6}}>
                        <input onChange={e => setTitle(e.target.value)} className="form-control" id="title" value={title} type="text" name="title" placeholder="Add task.." />
                     </div>

                     <div style={{flex: 1}}>
                        <input id="submit" className="btn btn-dark" type="submit" name="Add" value={"Submit"} />
                      </div>
                  </div>
            </form>
         
          </div>

          <div  id="list-wrapper" className='mt-3'>  
                 
                {todoList.map(function(task, index){
                  return(

    
                      <div key={index} className="task-wrapper flex-wrapper">
                        <span>{task.completed}</span>
                    
                        <div onClick={() => strikeUnstrike(task)} style={{flex:7}}>

                            {task.completed == false ? (
                                <span>{task.title}   {task.completed}</span>

                              ) : (

                                <strike>{task.title}     {task.completed}</strike>
                              )}

                        </div>

                        <div style={{flex:1}}>
                            <button onClick={() => startEdit(task)} className="btn btn-sm btn-outline-info">Edit</button>
                        </div>

                        <div style={{flex:1}}>
                            <button onClick={() => deleteItem(task)} className="btn btn-sm btn-outline-dark delete">-</button>
                        </div>
                                 
                      </div>
                    )

                })}
                
          </div>
          </div>
      </div>
      </div>
    </div>
    </>
  )
}

export default Home








