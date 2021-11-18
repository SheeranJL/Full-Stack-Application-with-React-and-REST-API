import {useContext} from 'react';
import {appContext} from './Context';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
  const {actions} = useContext(appContext); //grabbing actions object from context so we can get the authenticated user to conditionally render

  return (
      <div>
      {
        <Route {...rest} render={props => actions.authUser ? <Component {...props} /> : <Redirect to='/signin'/> } />
      }
    </div>
  )

};

export default PrivateRoute;
