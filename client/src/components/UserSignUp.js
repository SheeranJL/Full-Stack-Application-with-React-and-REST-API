import React, {useState, useContext} from 'react';
import {appContext} from '../Context';
import {Link, useHistory} from 'react-router-dom';
import ValidationError from './ValidationError';

const UserSignUp = () => {

  let [firstName, setFirstName] = useState('');
  let [lastName, setLastName] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [errors, setErrors] = useState([]);

  const {actions} = useContext(appContext);

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

  function handleSubmit(event) {
    event.preventDefault();

    const user = {
      firstName: firstName,
      lastName: lastName,
      emailAddress: email,
      password: password
    };

    actions.signUp(user)
      .then(response => {
        if (response.status === 201) {
          console.log('success')
        } else if (response.status === 400) {
          response.json().then(data => setErrors([data]))
        } else {
          history.push('/error');
        }
      })
      .catch(error => console.log(error))
  }

  const history = useHistory()
  function routeChange() {
    history.push('/')
  }

  console.log(errors);

  return (
    <div className="form--centered">
        <h2>Sign Up</h2>

        {
          (errors.length !== 0)
          ? errors.map((error, index) => <ValidationError key={index} data={errors}/>)
          : <h1> </h1>
        }


        <form onSubmit={handleSubmit}>
            <label for="firstName">First Name</label>
            <input onChange={handleChange} id="firstName" name="firstName" type="text" value={firstName} />

            <label for="lastName">Last Name</label>
            <input onChange={handleChange} id="lastName" name="lastName" type="text" value={lastName} />

            <label for="emailAddress">Email Address</label>
            <input onChange={handleChange} id="emailAddress" name="emailAddress" type="email" value={email} />

            <label for="password">Password</label>
            <input onChange={handleChange} id="password" name="password" type="password" value={password} />

            <button className="button" type="submit">Sign Up</button>
            <button onClick={routeChange} className="button button-secondary">Cancel</button>
        </form>
        <Link to='/signin'>Already have a user account? Click here to sign in!</Link>
    </div>
  )

}

export default UserSignUp;
