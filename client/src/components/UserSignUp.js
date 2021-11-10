import React, {useState, useContext} from 'react';
import {Link, useHistory} from 'react-router-dom';


const UserSignUp = () => {

  let [firstName, setFirstName] = useState('');
  let [lastName, setLastName] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');

  function handleChange(e) {
    if (e.target.name === 'firstName') {
      setFirstName(e.target.value);
    } else if (e.target.name === 'lastName') {
      setLastName(e.target.value);
    } else if (e.target.name === 'emailAddress') {
      setEmail(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  }

  function handleSubmit(e) {
    e.preventDefault(); //<-- need to remove
    console.log(firstName, lastName, email, password)
  }

  const history = useHistory()
  function routeChange() {
    history.push('/')
  }

  return (
    <div className="form--centered">
        <h2>Sign Up</h2>

        <form>
            <label for="firstName">First Name</label>
            <input onChange={handleChange} id="firstName" name="firstName" type="text" value={firstName} />

            <label for="lastName">Last Name</label>
            <input onChange={handleChange} id="lastName" name="lastName" type="text" value={lastName} />

            <label for="emailAddress">Email Address</label>
            <input onChange={handleChange} id="emailAddress" name="emailAddress" type="email" value={email} />

            <label for="password">Password</label>
            <input onChange={handleChange} id="password" name="password" type="password" value={password} />

            <button onClick={handleSubmit} className="button" type="submit">Sign Up</button>
            <button onClick={routeChange} className="button button-secondary">Cancel</button>
        </form>
        <Link to='/signin'>Already have a user account? Click here to sign in!</Link>
    </div>
  )

}

export default UserSignUp;
