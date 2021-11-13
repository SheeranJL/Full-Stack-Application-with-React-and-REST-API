import React, {useContext} from 'react';
import {appContext} from '../Context';
import {useHistory} from 'react-router-dom';

const Authenticated = () => {

  const {actions} = useContext(appContext);
  const user = actions.authUser.firstName;
  const history = useHistory();

  function routeChange() {
    history.push('/');
  }


  return (
    <main>
        <div className="wrap">
            <h2>Login success</h2>
            <p>Welcome, {user}</p>
            <button className="button button-secondary" onClick={routeChange}>Home</button>
        </div>
    </main>
  )
}

export default Authenticated;
