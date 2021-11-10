import React, {useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


//importing components//
import Header from './components/Header';
import CourseDetail from './components/CourseDetail';
import Course from './components/Course';
import CreateCourse from './components/CreateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import NotFound from './components/NotFound';
import MainPage from './components/MainPage';


export default () => (

  <Router>
  <body>
    <div id="root">
      <Header />
      <main>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/course" component={Course} />
          <Route path="/courses/:id" component={CourseDetail} />
          <Route path="/signin" component={UserSignIn} />
          <Route path="/signup" component={UserSignUp} />
          <Route component={NotFound} />
          </Switch>
      </main>
    </div>
  </body>
  </Router>


)
