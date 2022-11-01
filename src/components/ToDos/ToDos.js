import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios' 
import { Container } from 'react-bootstrap'
import SingleToDo from './SingleToDo';
import './ToDo.css'
import FilterCat from './FilterCat';
import ToDoCreate from './ToDoCreate'

//Steps to Read functionality
//1. add useState and useEffect to the react import
//2. install and import axios
//3. create the hook to store the data
//4. create the function that uses axios to get the resource
//5. create useEffect to automate retrieval of data in this component
//----- You should now have your data stored, and now on to the UI
//6. use .map to render each category to the screen (also add any supplemental UI ...combo of Resources and SingleResource)


export default function ToDos() {
    const [toDos, setToDos] = useState([]);

    const {currentUser} = useAuth()
    //below is our hook to show/hide the create form
    const [showCreate, setShowCreate] = useState(false);

     //Filtering steps - use .filter() to create a limited list of resources.
     //1. Create a hook that will store values for what the user wants to filter resources by... this hook will store the ccategoryId
     //     for the category they want to filter by
     //2. Place the conditional rendering for when filter === 0 in the initial map of resources
     //3. Create FilterCat to give the buttons to the user by filter by
     //4. Render in resoureces... see below.
     //5. Create the conditional rendering for when filter != 0... see below

     //Set useState to defualt to 0 because there is no categoryId of 0
     const [filter, setFilter] = useState(0);

     const getToDos = () => {
        axios.get(`https://localhost:7115/api/ToDoes`).then(response => {
          console.log(response)
          setToDos(response.data)
        })
     }
     useEffect(() => {
      getToDos()
     }, []);

  return (
    <section className='todos'>
      <article className='vertices p-5'>
        <h1 className='text-center text-white'>ToDo Dashboard</h1>
      </article>
      {/* CREATE UI */}
      {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN &&
        <div className='bg-dark p-2 mb-3 text-center'>
          <button className='btn btn-info' onClick={() => setShowCreate(!showCreate)}>
            {!showCreate ? 'Create New ToDo' : 'Close Form'}
          </button>
          <div className="createContainer">
            {showCreate &&
              //Conditionally render ToDoCreate if showCreate is true
              <ToDoCreate getToDos={getToDos} setShowCreate={setShowCreate} />
            }
          </div>
        </div>
      }
      {/* END OF CREATE UI */}
      <FilterCat setFilter={setFilter} />
      <Container>
        <article className='toDoGallery row justify-content-center'>
          {/* Below we write conditional rendering to see if the user is trying to filter
              results or not, and display the right todos accordingly */}
          {filter === 0 ? toDos.map(x =>
            //SingleToDo will map each resource to a title in our display. We add
            // getToDo so we can pass GET request functionality into SingleToDo
            // for Edit/Delete (we added this during Edit/Delete functionality)
              <SingleToDo key={x.toDoId} toDos={x} getToDos={getToDos} />
          ) :
          toDos.filter(x => x.categoryId === filter).map(x =>
              <SingleToDo key={x.toDoId} toDos={x} getToDos={getToDos} />
            )}
            {filter !== 0 && toDos.filter(x => x.categoryId === filter).length === 0 &&
              <h2 className='alert alert-warning text-dark'>
                There are no results for this category.
              </h2>
            }
          
        </article>
      </Container>
    </section>
  )
}
