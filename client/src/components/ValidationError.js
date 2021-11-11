import React, {useState, useEffect} from 'react';

const ValidationError = (props) => {

  const errors = [props.data];

  const errorLength = props.data.length

  return (
    <div className="validation--errors">
        <h3>Validation Errors</h3>
        <ul>
        {
          errors[0][0].errors.map((error, index) => (
            <li>{`${errors[0][0].errors[index]}`}</li>
          ))
        }
        </ul>
    </div>
  )


}

export default ValidationError;
