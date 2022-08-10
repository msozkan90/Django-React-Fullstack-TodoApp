
export default class APIService {
   
    static UpdateTodo(todo_id, body, token) {
 
      delete body.token;

     return fetch(`http://127.0.0.1:8000/api/todo/${todo_id}/`, {
        'method':'PUT',
        headers: {
            'Content-Type':'application/json',
            'Authorization':`Token ${token}` 
          }, 
          body:JSON.stringify(body)

     }).then(resp => resp.json())
     .then((response)  => {
      console.log(response)

      
  })
     .catch(function(error){
      console.log('ERROR:', error)
    })

    }

    static AddTodo(body, token) {

      return fetch('http://127.0.0.1:8000/createItem/', {
        'method':'POST',
        headers: {
            'Content-Type':'application/json',
            'Authorization':`Token ${token}` 
          }, 
          body:JSON.stringify(body)

      }).then(resp => resp.json())

       .catch(function(error){
        console.log('ERROR:', error)
      })

    }

    static DeleteTodo(todo_id, token) {

      return fetch(`http://127.0.0.1:8000/api/todo/${todo_id}/`, {
        'method':'DELETE',
        headers: {
            'Content-Type':'application/json',
            'Authorization':`Token ${token}` 
          }

     })

    }

    static LoginUser(body) {

      return fetch('http://127.0.0.1:8000/auth/', {
        'method':'POST',
        headers: {
            'Content-Type':'application/json',
            
          }, 
          body:JSON.stringify(body)

      }).then(resp => resp.json())
      .catch(error =>console.log(error))

     }


    static RegisterUser(body,csrftoken) {

      return fetch('http://127.0.0.1:8000/account/api/user/', {
        'method':'POST',
        headers: {
            'Content-Type':'application/json',
            'X-CSRFToken':csrftoken, 
          }, 
          body:JSON.stringify(body)

      }).then(resp => resp.json())

    }


    
    static StrikeTodo(body,token) {

      console.log(body)
      return fetch(`http://127.0.0.1:8000/api/todo/${body.id}/`, {
        'method':'PUT',
        headers: {
            'Content-Type':'application/json',
            'Authorization':`Token ${token}`, 
          }, 
          body:JSON.stringify(body)

      }).then(resp => resp.json())

      .catch(error =>console.log(error))


    }

    




  }