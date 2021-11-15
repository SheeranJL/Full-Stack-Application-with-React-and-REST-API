import React, {useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Importing components//
import Header from './components/Header';
import CourseDetail from './components/CourseDetail';
import Course from './components/Course';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import NotFound from './components/NotFound';
import MainPage from './components/MainPage';
import ErrorPage from './components/Error';
import PrivateRoute from './PrivateRoute';
import Forbidden from './components/Forbidden';

//Setting up different app routes//
export default () => (
  <Router>
      <Header />
      <main>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <PrivateRoute path="/courses/create" component={CreateCourse} />
          <PrivateRoute path="/courses/:id/update" component={UpdateCourse} />
          <Route path="/courses/:id" component={CourseDetail} />
          <Route path="/signin" component={UserSignIn} />
          <Route path="/signup" component={UserSignUp} />
          <Route path="/notfound" component={NotFound} />
          <Route path="/error" component={ErrorPage} />
          <Route path="/forbidden" component={Forbidden} />
          <Route component={NotFound} />
        </Switch>
      </main>
  </Router>
)
