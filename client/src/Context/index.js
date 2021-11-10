import React, {useState} from 'react';

import {appSettings} from '../config';

export const appContext = React.createContext();

export const Provider = (props) => {

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

  const getCourse = async (id) => {
    const response = await api(`/courses/${id}`)
    return response;
  }




  return (
    <appContext.Provider value={ { actions: { getCourses, getCourse } } }>
      {props.children}
    </appContext.Provider>
  );
}
