import React, {useState, useContext} from 'react';
import {Link, useHistory} from 'react-router-dom'
import {appContext} from '../Context';

const UserSignIn = () => {

  //setting email and password states//
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [fail, setFail] = useState(false);
  let [attempts, setAttempts] = useState(5)
  const {actions} = useContext(appContext);

  //using history hook to be used when clicking cancel button//
  const history = useHistory();

  //sets email/password variables in state when user types into input fields//
  function handleChange(e) {
    if (e.target.name === 'emailAddress') {
      setEmail(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value)
    }
  }


  //handles form submission//
  function handleSubmit(e) {
    e.preventDefault();
    actions.signIn(email, password)
      .then(response => {
        if (response.status === 200) {
          console.log(response);
          setFail(false);
          console.log(`Success. ${email} is now logged in`)
          history.push('/authenticated');
        } else {
          console.log('fail')
          setFail(true);
        }
      })
      .catch(err => console.log(err))
  }
  //Redirects user to home route when clicking cancel//
  function routeChange() {
    history.push('/');
  }

  return (
    <div className="form--centered">

        {
          fail
          ?  (

              <div className="validation--errors">
              <p>Incorrect login, try again.</p>
              </div>

          )
          : <></>

        }

        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
            <label for="emailAddress">Email Address</label>
            <input onChange={handleChange} id="emailAddress" name="emailAddress" type="email" value={email}/>

            <label for="password">Password</label>
            <input onChange={handleChange} id="password" name="password" type="password" value={password}/>

            <button className="button" type="submit" >Sign In</button>
            <button className="button button-secondary" onClick={routeChange}>Cancel</button>
        </form>
        <Link to="/signup">Don't have a user account? Click here to sign up </Link>
    </div>
  )
}

export default UserSignIn;
