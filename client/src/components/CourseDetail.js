import React, {useState, useEffect, useContext} from 'react';
import {appContext} from '../Context';
import {Link, useHistory} from 'react-router-dom';
import CourseComponent from './DetailCourse';
import AdminButtons from './AdminButtons';
import ReactMarkdown from 'react-markdown';

const CourseDetail = (props) => {

  let [course, setCourse] = useState([]);
  let [loading, setLoading] = useState(true);
  let [materials, setMaterials] = useState([]);
  let [user, setUser] = ('');
  const {actions, authUser} = useContext(appContext)
  const history = useHistory();

  let id = props.match.params.id
  let materialsList = [];

  useEffect( () => {
    const getCourse = async () => {
      await actions.getCourse(id)
        .then(response => {
          if (response.status === 200) {
            response.json()
              .then(data => setCourse(data.course))
              .finally(() => setLoading(false))
          } else if (response.status === 401) {
            history.push('/notfound')
          } else {
            history.push('/error')
          }
        })
    }
    getCourse();
  }, []);

  //Function to check whether the course ID is the same as the user ID therefore granting conditional access to admin buttons//
  function checkAuthUser() {
    try {
    if (actions.authUser) {
      if (actions.authUser.id === course.Enrolled.id) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    console.log('TEST')
    return false;
  }
}


  //Delete course function//
  const deleteCourse = async() => {
    await actions.deleteCourse(id, actions.authUser.emailAddress, actions.authUser.password)
    setTimeout(() => {
      history.push('/');
    }, 500);
  };


  return (
    <div className="wrap">
          {
            loading
              ? <h1>Loading...</h1>
              : (
              <form>
                  <div className="actions--bar">
                      <div className="wrap">
                    {
                      (checkAuthUser()) ?
                        <>
                        <AdminButtons deleteCourse={deleteCourse} data={course}/>
                        </>
                        : null
                    }
                        <Link className="button button-secondary" to={'/'}>Return to List</Link>
                      </div>
                  </div>
                <h2>Course Detail</h2>

                <div className="main--flex">
                  <div>
                      <h3 className="course--detail--title">Course</h3>
                      <h4 className="course--name">{course.title}</h4>
                      <p>By {course.Enrolled.firstName} {course.Enrolled.lastName}</p>
                      <ReactMarkdown>{course.description}</ReactMarkdown>
                      <p></p>
                  </div>
                  <div>
                      <h3 className="course--detail--title">Estimated Time</h3>
                      <p>{course.estimatedTime || 'No time provided'}</p>
                      <h3 className="course--detail--title">Materials Needed</h3>
                      <ul className="course--detail--list">
                          <ReactMarkdown>{course.materialsNeeded || '* Nothing!'}</ReactMarkdown>
                      </ul>
                  </div>
              </div>
            </form>
            )
          }
    </div>
  )
}

export default CourseDetail;
