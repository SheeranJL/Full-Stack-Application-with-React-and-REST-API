import React, {useState, useEffect, useContext} from 'react';
import {appContext} from '../Context';
import {Link, useHistory} from 'react-router-dom';
import CourseComponent from './DetailCourse';
import AdminButtons from './AdminButtons';

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
        .then(response => response.json())
        .then(data => setCourse(data.course))
        .finally(() => setLoading(false))
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


  async function splitString(string) {
    if (course.materialsNeeded) {
      let materials = string.split(', ')
      materials.forEach(material => materialsList.push(material))
    } else {
      materialsList.push('Nothing! Just your brilliant mind!')
    }
  }
  splitString(course.materialsNeeded)


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
                <p>By {course.Enrolled.firstName} {course.Enrolled.lastName}</p>
                <div className="main--flex">
                  <div>
                      <h3 className="course--detail--title">Course</h3>
                      <h4 className="course--name">{course.title}</h4>

                      <p>{course.description}</p>
                      <p></p>
                  </div>
                  <div>
                      <h3 className="course--detail--title">Estimated Time</h3>
                      <p>{course.estimatedTime || 'No time provided'}</p>
                      <h3 className="course--detail--title">Materials Needed</h3>
                      <ul className="course--detail--list">
                          {materialsList.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
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
