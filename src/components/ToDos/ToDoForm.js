import React, { useState, useEffect } from 'react'
import { Formik, Field, Form } from 'formik'
import {toDoSchema } from '../../utilities/validationSchema'
import axios from 'axios'//We need axios here to getCategories() for a dropdown list

export default function ToDoForm(props) {
    //Get categories from the API to populate a dropdown list in our form
    const [categories, setCategories] = useState([]);

    const [checked, setChecked] = React.useState(false);

    const handleChange = () => {
        setChecked(!checked);
      };

    const getCategories = () => {
        axios.get(`https://localhost:7115/api/Categories`).then(response => setCategories(response.data))
    }

    const handleSubmit = (values) => {
        console.log(values)
        //Below is the create portion of handleSubmit()
        if(!props.toDos) {
            const toDoToCreate = values

            axios.post(`https://localhost:7115/api/ToDoes`, toDoToCreate).then(() => {
                props.getToDos()//updates todos from the API
                props.setShowCreate(false)//close the create form
            })
        }
        //Below is the edit portion of handleSubmit()
        else{
            const toDoToEdit = {
                toDoId: props.toDos.toDoId,
                name: values.name,
                done: values.done,
                categoryId: values.categoryId
            }
            axios.put (`https://localhost:7115/api/ToDoes/${props.toDos.toDoId}`, toDoToEdit).then(() => {
                props.getToDos()
                props.setShowEdit(false)
            })
        }
    }

    useEffect(() => {
        getCategories()
    }, []);
  return (
    <Formik
        intialValues={{
            name: props.toDos ? props.toDos.name : '',
            done: props.toDos ? props.toDos.done : false,
            categoryId: props.toDos ? props.toDos.categoryId : ''
        }}
        validationSchema={toDoSchema}
        onSubmit={(values) => handleSubmit(values)}
    >
        {/* Start with the structure below and place your form in the empty parens
            {({errors, touched}) => ()}
        */}
        {({errors, touched}) => (
            <Form id='toDoForm'>
                <div className='form-group m-3'>
                    <Field name='name' className='form-control' placeholder='Name' />
                    {errors.name && touched.name ? (
                        <div className='text-danger'>{errors.name}</div>
                    ) : null}
                </div>
                <div className='form-group m-3'>
                    <Field name='done' type='checkbox' />
                    {errors.done && touched.done ? (
                        <div className='text-danger'>{errors.done}</div>
                    ) : null}
                </div>
                <div className='form-group m-3'>
                    <Field as='select' name='categoryId' className='form-control'>
                        <option value='' disabled>[--Please choose]</option>
                        {/* Below we will map an option for every category in the API */}
                        {categories.map(cat =>
                            <option key={cat.categoryId} value={cat.categoryId}>
                                {cat.catName}
                            </option>    
                        )}
                    </Field>
                </div>
                <div className="form-group m-3">
                    <button type='submit' className="btn btn-info-m-3">Submit Resource to API</button>
                </div>
            </Form>
        )}
    </Formik>
  )
}
