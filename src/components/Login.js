import React, { useEffect, useState } from "react";
import {useHistory} from 'react-router-dom';
import axios from "axios";

const initialState = {
  username: '',
  password: '',
};
const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [credentials, setCredentials] = useState(initialState);
  const urlBase = 'http://localhost:5000/api';
  const { push } = useHistory();

  const handleChange = e => {
    setCredentials({
        ...credentials, 
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    axios.post(`${urlBase}/login`, credentials)
    .then(res => {
      localStorage.setItem('token', res.data.payload)
      push(`/BubblePage`)

    })
    .catch(err => {
      console.log(err)
    })
  }



  return (
    <>
      <div className='login-page'>
      <h1>
        Welcome to the Bubble App!
        <p>-Login-</p>
      </h1>
      <form onSubmit={handleSubmit} className='login-form'>
        <p>Username:</p>
        <input 
        type='text'
        name='username'
        value={credentials.username}
        onChange={handleChange}
        placeholder='Lambda School'
        />
        <br/>
        <p>Password:</p>
        <input 
        type='password'
        name='password'
        value={credentials.password}
        onChange={handleChange}
        placeholder='i<3Lambd4'
        />
        <button>Login</button>
      </form>
      </div>
    </>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE THAT FORM INPUTS INCLUDE THE LABEL TEST "username" and "password" RESPECTIVELY.
//4. If either the username or password is not displaied display EXACTLY the following words: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.

//first make form inputs
//then add a change handler and submit handler
//make a login button
//in the submit handler, create an axios that only runs with an if statement
//if password === Lambda School 