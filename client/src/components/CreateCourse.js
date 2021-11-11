import React, {useContext, useEffect, useState} from 'react';
import {appContext} from '../Context';
import {useHistory} from 'react-router-dom';

const CreateCourse = () => {

  const [errors, setErrors] = useState([]);

  const history = useHistory();
  const routeChange = () => {
    history.push('/')
  }

  const handleSubmit = (e) => {
    console.log(e);
  }

  return (
    <div className="wrap">
        <h2>Create Course</h2>

        <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
                <li>Please provide a value for "Title"</li>
                <li>Please provide a value for "Description"</li>
            </ul>
        </div>

        <form onSubmit={handleSubmit}>
            <div className="main--flex">
                <div>
                    <label for="courseTitle">Course Title</label>
                    <input id="courseTitle" name="courseTitle" type="text" />

                    <p>By Joe Smith</p>

                    <label for="courseDescription">Course Description</label>
                    <textarea id="courseDescription" name="courseDescription"></textarea>
                </div>
                <div>
                    <label for="estimatedTime">Estimated Time</label>
                    <input id="estimatedTime" name="estimatedTime" type="text" />

                    <label for="materialsNeeded">Materials Needed</label>
                    <textarea id="materialsNeeded" name="materialsNeeded" placeholder="Enter comma seperated values only. (eg: item one, item two, item three, item four)"></textarea>
                </div>
            </div>
            <button className="button" type="submit">Create Course</button>
            <button class="button button-secondary" onClick={routeChange}>Cancel</button>
        </form>
    </div>
  )

}

export default CreateCourse;
