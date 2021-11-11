import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {appContext} from '../Context';

const Authenticated = () => {

  const history = useHistory();

  function routeChange() {
    history.push('/');
  }


  return (
    <main>
        <div class="wrap">
            <h2>Login success</h2>
            <p>Welcome</p>
            <button className="button button-secondary" onClick={routeChange}>Home</button>
        </div>
    </main>
  )
}

export default Authenticated;
