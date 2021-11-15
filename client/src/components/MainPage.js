//Main Page (index) component//
import {useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import {appContext} from '../Context';
import Course from './Course'

const MainPage = () => {


  const [courses, setCourses] = useState([]);
  const {actions} = useContext(appContext);

  //When the app loads, the useEffect hook will execute and load all courses via getCourses API function//
  useEffect( () => {
    const getCourses = async () => {
      await actions.getCourses()
        .then(response => response.json())
        .then(data => setCourses(data))
        .then(console.log)
    }
    getCourses();
  }, [])


  return (
    <div className="wrap main--grid">
    {
      courses
        ? courses.map((course, index) => <Course key={index} data={course} /> )
        : <span>nothing</span>
    }
    <Link className="course--module course--add--module" to="/courses/create">
        <span className="course--add--title">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
            New Course
        </span>
    </Link>
    </div>
  )
}


export default MainPage;
