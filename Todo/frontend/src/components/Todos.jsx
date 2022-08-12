

import { useState, useEffect } from "react"
import axios from 'axios'
import List from "./List"
import '../css/Todo.css'
import {FaPlusCircle} from 'react-icons/fa'


import React from 'react'

const Todos = () => {


    const[todos, setTodos] = useState(null)
    const[formTodo, setFormTodo] = useState({
        title: "",
        description: "",
        completed: false,
    })

    //called everytime rendered to display Todos
    useEffect(() => {

        getTodos()

    }, [])



    //Gets todo
    function getTodos(){

        axios({
            method: "GET",
            url: "/todos/"
        }).then((response) => {

            const data = response.data
            console.log(data)
            setTodos(data)
        }).catch((err) => {
            if(err.response){
                console.log(err.response)
            }
        })

    }




    //adds Todo
    function addTodo(event){
        axios({
            method: "POST",
            url: '/todos/',
            data: {
                title: formTodo.title,
                description: formTodo.description,
                completed: formTodo.completed
            }


        }).then((response) => {
            getTodos()
        })

        setFormTodo({
            title: "",
            description: "",
            completed: false
        })

        event.preventDefault()



    }

    //deletes todo

    function deleteTodo(id){
        axios({
            method: 'DELETE',
            url: `/todos/${id}`
        })
        .then((response) => {
            getTodos()
        })
    }


    //function will set the form todo to the event

    function handleChange(event){
        const {value, name} = event.target
        setFormTodo(prevTodo => ({
            ...prevTodo, [name]: value
        }))
    }


//function handles and changes if clicked or not clicked
    function handleCompleted(id){
        


        todos.map(todo => {
            if(todo.id == id){
                if(todo.completed == false){
                    todo.completed = true
                    setFormTodo({
                        title: todo.title,
                        description: todo.description,
                        completed: todo.completed,
                    })

                }
                else if(todo.completed == true){
                    todo.completed = false
                    setFormTodo({
                        title: todo.title,
                        description: todo.description,
                        completed: todo.completed,
                    })


                }
                
            }
        })





    }

    



    



  return (
    <div>

        <form className="container">
            <input className = "title" onChange = {handleChange} text = {formTodo.title} placeholder = "Enter Title..." value = {formTodo.title} name = "title"/>
            <textarea className = "inp" onChange = {handleChange} text = {formTodo.description} value = {formTodo.description} placeholder = "Enter text..."  name = "description" />
            <FaPlusCircle className = "btn" onClick = {addTodo} />


        </form>

        { todos && todos.map(todo => 
        
        <List
            key = {todo.id}
            id = {todo.id}
            title = {todo.title}
            description = {todo.description}
            completedVal = {todo.completed}
            completed = {handleCompleted}
            deletion = {deleteTodo}
            // isCompleted = {isCompleted}
             />

            
            )}



    </div>
  )
}

export default Todos