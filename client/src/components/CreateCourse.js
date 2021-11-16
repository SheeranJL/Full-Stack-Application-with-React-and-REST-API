import React, {useContext, useEffect, useState} from 'react';
import {appContext} from '../Context';
import {useHistory} from 'react-router-dom';
import ValidationError from './ValidationError';

const CreateCourse = () => {

  //setting up local context//
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [time, setTime] = useState('');
  const [materials, setMaterials] = useState('');
  const [errors, setErrors] = useState([]);

  //obtaining functions from app context//
  const {actions} = useContext(appContext);

  const history = useHistory();
  const routeChange = () => {
    history.push('/')
  }

  //This code will update all respective local context as a user inputs text into fields//
  const handleChange = (e) => {
    if (e.target.name === 'courseTitle') {
      setTitle(e.target.value)
    } else if (e.target.name === 'courseDescription') {
      setDesc(e.target.value)
    } else if (e.target.name === 'estimatedTime') {
      setTime(e.target.value)
    } else if (e.target.name === 'materialsNeeded') {
      setMaterials(e.target.value)
    }
  }

  //This code will run when the form submits, it will call the createCourse API from app context//
  //After creation of a new course, it will then return the user to the home screen//
  const handleSubmit = async(e) => {
    e.preventDefault();
    let body = {
      title: title,
      description: desc,
      estimatedTime: time,
      materialsNeeded: materials
    }

    actions.createCourse(body, actions.authUser.emailAddress, actions.authUser.password)
      .then(response => {
        if (response.status === 201) {
          setTimeout(() => {
            routeChange()
          }, 500)
        } else if (response.status === 400) {
          response.json()
            .then(data => {
              setErrors(data)
            })
        }
      })
      .catch(error => {
        history.push('/error')
      })
  }


  return (
    <div className="wrap">
        <h2>Create Course</h2>

        {
          (errors.length > 0)
          ?(    <div className="validation--errors">
                 <h3>Validation Errors</h3>
                 <ul>
                     {
                       errors.map((error, index) => {
                         return (
                           <li key={index}>{error}</li>
                         )
                       })
                     }
                 </ul>
            </div>
          )
          :null
        }

        <form onSubmit={handleSubmit}>
            <div className="main--flex">
                <div>
                    <label htmlFor="courseTitle">Course Title</label>
                    <input onChange={handleChange} id="courseTitle" name="courseTitle" type='text' value={title} />

                    <p>By {actions.authUser.firstName} {actions.authUser.lastName}</p>

                    <label htmlFor="courseDescription">Course Description</label>
                    <textarea onChange={handleChange} id="courseDescription" name="courseDescription" value={desc}></textarea>
                </div>
                <div>
                    <label htmlFor="estimatedTime">Estimated Time</label>
                    <input onChange={handleChange} id="estimatedTime" name="estimatedTime" type="text" value={time} />

                    <label htmlFor="materialsNeeded">Materials Needed</label>
                    <textarea onChange={handleChange} type="text" id="materialsNeeded" name="materialsNeeded" value={materials} ></textarea>
                </div>
            </div>
            <button className="button" type="submit">Create Course</button>
            <button className="button button-secondary" onClick={routeChange}>Cancel</button>
        </form>
    </div>
  )

}

export default CreateCourse;
