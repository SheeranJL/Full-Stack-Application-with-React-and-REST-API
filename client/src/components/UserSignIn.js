import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom'

const UserSignIn = () => {

  //setting email and password states//
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');

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
    e.preventDefault(); //<-- need to remove this eventually
    console.log(email);
    console.log(password);
  }

  //Redirects user to home route when clicking cancel//
  function routeChange() {
    history.push('/');
  }

  return (
    <div className="form--centered">
        <h2>Sign In</h2>

        <form>
            <label for="emailAddress">Email Address</label>
            <input onChange={handleChange} id="emailAddress" name="emailAddress" type="email" value={email}/>

            <label for="password">Password</label>
            <input onChange={handleChange} id="password" name="password" type="password" value={password}/>

            <button className="button" type="submit" onClick={handleSubmit}>Sign In</button>
            <button className="button button-secondary" onClick={routeChange}>Cancel</button>
        </form>

        <Link to="/signup">Don't have a user account? Click here to sign up </Link>
    </div>
  )
}

export default UserSignIn;
