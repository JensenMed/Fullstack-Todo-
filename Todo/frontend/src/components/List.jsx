

import React from 'react'
import '../css/Todo.css'
import {FaTrash} from 'react-icons/fa'

const List = (props) => {

  // function pases to delete funtion in Todo
    function handleClick(){
        props.deletion(props.id)
    }


    //passes id to completed function in Todo

    function handleCompleted(){
      props.completed(props.id)
    }

  return (
    <div className = "Todo">
          <input className = 'check' onClick={handleCompleted} type = "checkbox" />
          <FaTrash className = 'trash' onClick={handleClick}/>
          <h1 className = "todo-title">{props.title}</h1>
          <p className='todo-text'>{props.description}</p>
    </div>
  )
}

export default List
