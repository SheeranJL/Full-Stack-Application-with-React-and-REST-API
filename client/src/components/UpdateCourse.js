import React, {useState, useContext, useEffect} from 'react';
import {appContext} from '../Context';
import {Link, useHistory} from 'react-router-dom';

const UpdateCourse = (props) => {


  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);
  const {actions} = useContext(appContext);
  let id = props.match.params.id;

  useEffect( () => {
    const getCourse = async () => {
      await actions.getCourse(id)
        .then(response => response.json())
        .then(data => setCourse(data.course))
        if (course) {
          setLoading(false);
        }
      }
    getCourse();
  }, [])


  const history = useHistory();
  const routeChange = () => {
    history.push(`/courses/${course.id}`);
  }


  return (

    <main>
    {
      loading
      ? <h1>Loading...</h1>
      : (
        <div className="wrap">
          <h2>Update Course</h2>
          <form>
              <div className="main--flex">
                  <div>
                      <label for="courseTitle">Course Title</label>
                      <input id="courseTitle" name="courseTitle" type="text" value={`${course.title}`} />

                      <p>{`By ${course.Enrolled.firstName} ${course.Enrolled.lastName}`}</p>

                      <label for="courseDescription">Course Description</label>
                      <textarea id="courseDescription" name="courseDescription">{`${course.description}`}</textarea>
                  </div>
                  <div>
                      <label for="estimatedTime">Estimated Time</label>
                      <input id="estimatedTime" name="estimatedTime" type="text" value={`${course.estimatedTime}`} />

                      <label for="materialsNeeded">Materials Needed</label>
                      <textarea id="materialsNeeded" name="materialsNeeded">{`${course.materialsNeeded}`}</textarea>
                  </div>
              </div>
              <button className="button" type="submit">Update Course</button>
              <button className="button button-secondary" onClick={routeChange}>Cancel</button>
          </form>
      </div>
    )
    }
    </main>
  )




}


export default UpdateCourse;
