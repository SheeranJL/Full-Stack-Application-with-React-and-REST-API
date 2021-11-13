import React, {useState, useContext, useEffect} from 'react';
import {appContext} from '../Context';
import {Link, useHistory} from 'react-router-dom';

const UpdateCourse = (props) => {

  let identifier = props.match.params.id;
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(true);
  const {actions} = useContext(appContext);
  const user = actions.authUser;

  const [id, setId] = useState(null);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [time, setTime] = useState('');
  const [materials, setMaterials] = useState('');

  const history = useHistory();
  const routeChange = () => {
    history.push(`/courses/${id}`);
  }

  useEffect( () => {
    const getCourse = async () => {
      await actions.getCourse(identifier)
        .then(response => {
          if (response.status === 200) {
            response.json()
              .then(data => {
                setCourse(data.course)
                return data.course;
              })
              .then((course) => {
                setTitle(course.title);
                setDesc(course.description);
                setTime(course.estimatedTime);
                setMaterials(course.materialsNeeded);
                setId(course.id);
                return course;
              })
              .then(setLoading(false))
          } else {
            history.push('/error')
          }
        }
      )
      }
      getCourse();
  }, [])

  const onChange = (e) => {
    e.preventDefault();
    if (e.target.name === 'courseTitle') {
      setTitle(e.target.value);
    } else if (e.target.name === 'courseDescription') {
      setDesc(e.target.value);
    } else if (e.target.name === 'estimatedTime') {
      setTime(e.target.value);
    } else if (e.target.name === 'materialsNeeded') {
      setMaterials(e.target.value);
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    let body = {
      title: title,
      description: desc,
      estimatedTime: time,
      materialsNeeded: materials
    };
    await actions.updateCourse(identifier, body, actions.authUser.emailAddress, actions.authUser.password)
    setTimeout(() => {
      history.push(`/courses/${identifier}`)
    }, 500);
  }


  return (
    <main>
    {
      loading
      ? <h1>Loading...</h1>
      : (
        <div className="wrap">
          <h2>Update Course</h2>
          <form onSubmit={handleSubmit}>
              <div className="main--flex">
                  <div>
                      <label for="courseTitle">Course Title</label>
                      <input onChange={onChange} id="courseTitle" name="courseTitle" type="text" value={title} />

                      <p></p>

                      <label for="courseDescription">Course Description</label>
                      <textarea onChange={onChange} id="courseDescription" name="courseDescription" value={desc}></textarea>
                  </div>
                  <div>
                      <label for="estimatedTime">Estimated Time</label>
                      <input onChange={onChange} id="estimatedTime" name="estimatedTime" type="text" value={time} />

                      <label for="materialsNeeded">Materials Needed</label>
                      <textarea onChange={onChange} id="materialsNeeded" name="materialsNeeded" value={materials}></textarea>
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
