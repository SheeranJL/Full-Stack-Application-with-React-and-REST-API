import React, {useContext, useEffect, useState} from 'react';
import {appContext} from '../Context';
import {useHistory} from 'react-router-dom';
import ValidationError from './ValidationError';

const CreateCourse = () => {

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [time, setTime] = useState('');
  const [materials, setMaterials] = useState('');
  const [errors, setErrors] = useState([]);

  const {actions} = useContext(appContext);

  const history = useHistory();
  const routeChange = () => {
    history.push('/')
  }

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
  }

  console.log(errors)
  // const handleSubmit = async(e) => {
  //   e.preventDefault();
  //   let body = {
  //     title: title,
  //     description: desc,
  //     estimatedTime: time,
  //     materialsNeeded: materials
  //   }
  //   await actions.createCourse(body, actions.authUser.emailAddress, actions.authUser.password);
  //   setTimeout(() => routeChange(), 500);
  // }

  // <div className="validation--errors">
  //     <h3>Validation Errors</h3>
  //     <ul>
  //         <li>Please provide a value for "Title"</li>
  //         <li>Please provide a value for "Description"</li>
  //     </ul>
  // </div>

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
                    <label for="courseTitle">Course Title</label>
                    <input onChange={handleChange} id="courseTitle" name="courseTitle" type='text' value={title} />

                    <p>By {actions.authUser.firstName} {actions.authUser.lastName}</p>

                    <label for="courseDescription">Course Description</label>
                    <textarea onChange={handleChange} id="courseDescription" name="courseDescription" value={desc}></textarea>
                </div>
                <div>
                    <label for="estimatedTime">Estimated Time</label>
                    <input onChange={handleChange} id="estimatedTime" name="estimatedTime" type="text" value={time} />

                    <label for="materialsNeeded">Materials Needed</label>
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
