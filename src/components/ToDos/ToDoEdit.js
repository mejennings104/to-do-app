import React from 'react'
import { Modal } from 'react-bootstrap'
import ToDoForm from './ToDoForm'

export default function ToDoEdit(props) {
  return (
    <Modal
        show={props.showEdit}
        onHide={() => props.setShowEdit(false)}
    >
        <Modal.Header>
            <h3>Editing {props.toDos.name}</h3>
        </Modal.Header>
        <Modal.Body>
            <ToDoForm  
                toDo={props.toDos}
                setShowEdit={props.setShowEdit}
                getToDos={props.getToDos} />
        </Modal.Body>
    </Modal>
  )
}
