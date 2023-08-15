import React, { useRef, useState } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import classes from './AddUser.module.css';

const AddUser = (props) => {
  const inputNameref = useRef();
  const inputAgeref = useRef();
  const inputCollegeref = useRef();
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();

    const inputName = inputNameref.current.value;
    const inputAge = inputAgeref.current.value;
    const inputCollege = inputCollegeref.current.value;

    if (inputName.trim().length === 0 || inputAge.trim().length === 0 || inputCollege.trim().length === 0) {
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age (non-empty values).',
      });
      return;
    }
    if (+inputAge < 1) {
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (> 0).',
      });
      return;
    }
    props.onAddUser(inputName, inputAge, inputCollege);
    inputNameref.current.value = '';
    inputAgeref.current.value = '';
    inputCollegeref.current.value = '';
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            ref={inputNameref}

          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            ref={inputAgeref}

          />
          <label htmlFor="college">College name</label>
          <input
            id="college"
            type="text"
            ref={inputCollegeref}

          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
