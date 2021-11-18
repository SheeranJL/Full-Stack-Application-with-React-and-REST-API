//Update Course component//
import {useState, useContext, useEffect} from 'react';
import {appContext} from '../Context';
import {useHistory} from 'react-router-dom';

const UpdateCourse = (props) => {

  let identifier = props.match.params.id;
  const {actions} = useContext(appContext);

  //Setting local state//
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [id, setId] = useState(null);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [time, setTime] = useState('');
  const [materials, setMaterials] = useState('');

  const history = useHistory();
  const routeChange = () => {
    history.push(`/courses/${id}`);
  }


  //When the page loads, the useEffect hook will render the selected course//
  //It will render the course details in the respective text/input boxes//
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
  }, [actions, history, identifier])

  //When a user inputs text with the input/text fields, this function will update local state to hold these changes//
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

  //When the form is submitted, this function will create a body object containing all of the new text data//
  //After successful submission, the course will be updated and the user will be redirected to the course detail screen//
  const handleSubmit = async(e) => {
    e.preventDefault();
    let body = {
      title: title,
      description: desc,
      estimatedTime: time,
      materialsNeeded: materials
    };

    const response = actions.updateCourse(identifier, body, actions.authUser.emailAddress, actions.authUser.password)
      .then(response => {
        if (response.status === 204) {
          setTimeout(() => {
            history.push(`/courses/${identifier}`)
          }, 500)
        } else if (response.status === 400) {
          response.json().then(response => {
            setErrors(response);
            console.log(course);
          })
        }
      })
      console.log(response);
  }

  return (
    <main>
    {
      loading
      ? <h1>Loading...</h1>
      : (
        <div className="wrap">
        {
          (errors.length !== 0)
          ? <div className="validation--errors">
            <h3>Validation Errors</h3>
              <ul>
                {errors.message}
              </ul>
          </div>
          : null
        }
          <h2>Update Course</h2>
          <form onSubmit={handleSubmit}>
              <div className="main--flex">
                  <div>
                      <label htmlFor="courseTitle">Course Title</label>
                      <input onChange={onChange} id="courseTitle" name="courseTitle" type="text" value={title} />

                      <p></p>

                      <label htmlFor="courseDescription">Course Description</label>
                      <textarea onChange={onChange} id="courseDescription" name="courseDescription" value={desc}></textarea>
                  </div>
                  <div>
                      <label htmlFor="estimatedTime">Estimated Time</label>
                      <input onChange={onChange} id="estimatedTime" name="estimatedTime" type="text" value={time} />

                      <label htmlFor="materialsNeeded">Materials Needed</label>
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
