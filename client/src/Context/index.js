import React, {useState} from 'react';

import {appSettings} from '../config';

export const appContext = React.createContext();

export const Provider = (props) => {

  const [authUser, setAuthUser] = useState(null);

  const api = (path, method = 'GET', body = null, requiresAuth = false, credentials = null) => {
    const url = appSettings.apiBaseUrl + path;
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };
    options.url = url;

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options)
      .then(response => response)
  }

  //Get user function//
  const getUser = async(username, password) => {
    const response = api('/users', 'GET', null, true, {username, password})
    return response;
  }

  const getCourses = async() => {
    const response = await api('/courses');
    return response;
  }

  const getCourse = async(id) => {
    const response = await api(`/courses/${id}`)
    return response;
  }



  //Sign in function//
  const signIn = async(username, password) => {
    const user = await getUser(username, password);
    if (user !== null) {
      setAuthUser(username)
    }
    return user;
  }

  //Sign up function//
  const signUp = async(user) => {
    const response = api('/users', 'POST', user);
    return response;
  }



  return (
    <appContext.Provider value={ { actions: {
       getCourses,
       getCourse,
       signIn,
       signUp,
       authUser
     }}}>
      {props.children}
    </appContext.Provider>
  );
}
