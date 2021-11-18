import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Importing components//
import Header from './components/Header';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import NotFound from './components/NotFound';
import MainPage from './components/MainPage';
import ErrorPage from './components/Error';
import PrivateRoute from './PrivateRoute';
import Forbidden from './components/Forbidden';

//Setting up different app routes//
const routes = () => (
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
          <Route path="/signout" component={UserSignOut} />
          <Route component={NotFound} />
        </Switch>
      </main>
  </Router>
)

export default routes;
