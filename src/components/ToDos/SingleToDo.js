import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
//react icon imports
import { FaTrashAlt, FaEdit } from 'react-icons/fa'
import ToDoEdit from './ToDoEdit' 
import axios from 'axios'

export default function SingleToDo(props) {

    const {currentUser} = useAuth()
    //Hook that opens/closes our edit model
    const [showEdit, setShowEdit] = useState(false);

    const deleteToDo = (id) => {
        if(window.confirm(`Are you sure you want to delete ${props.toDos.name}`)) {
            axios.delete(`https://localhost:7115/api/ToDoes${id}`).then(() => {props.getToDos()})
        }
    }
  return (
    <div className='singleToDo col-md-5 m-4'>
        {/* EDIT UI */}
        {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN &&
            <div>
                <button id='editLink' onClick={() => setShowEdit(true)}>
                    <FaEdit/>
                </button>
                <button className='m-1 rounded' id='deleteLink' onClick={() => deleteToDo(props.toDos.toDoId)}>
                    <FaTrashAlt/>
                </button>

                {showEdit &&
                    <ToDoEdit
                        toDos={props.toDos}
                        showEdit={showEdit}
                        setShowEdit={setShowEdit}
                        getToDos={props.getToDos} />
                }        
            </div>
        }
        <h3>{props.toDos.name}</h3>
        <p>Done: {props.toDos.done}</p>
    </div>
  )
}


