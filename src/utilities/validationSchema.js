//This file will house the schemas for both resources and categories for our create/edit form. To bring in a simpole validation
// implementation, we are going to use Yup by installing it in our app (npm install yup) see implementation below

//Yup will work in tandem with Formik, which is an npm package that creates and stores form inputs for each item
// (categoryName, categoryDescription) that we need to capture in our forms. (npm install formik)

/* This is what we need for category POST. We will have inputs for each in the form
    {
        'categoryName': 'Test',
        'categoryDescription': 'TestDescription'
    }
*/
import * as Yup from 'yup' 

const catSchema = Yup.object().shape({
    //Call to each property that will need to be validated and use Yup to define the requirements
    // for each property (required, maxLength, etc.)
    catName: Yup.string().max(25, 'Max 25 characters').required('Required'),
    catDesc: Yup.string().max(100, 'Max 100 characters')
})

const toDoSchema = Yup.object().shape({
    name: Yup.string().max(100, 'Max 100 characters').required(),
    done: Yup.bool().required(),
    categoryId: Yup.number().required()
})

// Export the schemas. Export both in the { }, or choose one object as a default export
// When importing elsewhere in our app, the default is not required { } in teh import statement

export { toDoSchema }
export default catSchema