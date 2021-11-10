import React, {useState, useEffect, useContext} from 'react';
import {appContext} from '../Context';
import CourseComponent from './DetailCourse';

const CourseDetail = (props) => {

  let [course, setCourse] = useState([]);
  let [loading, setLoading] = useState(true);
  let [materials, setMaterials] = useState([])

  const {actions} = useContext(appContext)
  // let id = props.history.match.params.id;
  let id = props.match.params.id
  let materialsList = [];

  useEffect( () => {
    const getCourse = async () => {
      await actions.getCourse(id)
        .then(response => response.json())
        .then(data => setCourse(data.course))
        .finally(setLoading(false))
    }
    getCourse();
  }, []);

  async function splitString(string) {
    if (course.materialsNeeded) {
      let materials = string.split(', ')
      materials.forEach(material => materialsList.push(material))
    } else {
      materialsList.push('Nothing! Just your brilliant mind!')
    }
  }
  splitString(course.materialsNeeded)




  return (

    <div className="wrap">
        <h2>Course Detail</h2>
        <form>
          {
            loading
              ? <h1>Loading...</h1>
              : <div className="main--flex">
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
          }
        </form>
    </div>

  )
}

export default CourseDetail;
