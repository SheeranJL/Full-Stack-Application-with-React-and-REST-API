import React, {useState} from 'react';

import {appSettings} from '../config';

export const appContext = React.createContext();

export const Provider = (props) => {

  const [authUser, setAuthUser] = useState('');

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

    return fetch(url, options)
      .then(response => response)
  }


  const getCourses = async() => {
    const response = await api('/courses');
    return response;
  }

  const getCourse = async(id) => {
    const response = await api(`/courses/${id}`)
    return response;
  }

  const getUser = async(username, password) => {
    const response = api('/users', 'GET', null, true, {username, password})
    return response;
  }

  const signIn = async(username, password) => {
    let user;
    const response = getUser(username, password);
    if (response.status === 200) {
      console.log('yes')
    } else {
      console.log('no')
    }
  }




  return (
    <appContext.Provider value={ { actions: {
       getCourses,
       getCourse,
       signIn,
     }}}>
      {props.children}
    </appContext.Provider>
  );
}
