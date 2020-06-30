import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../Style.css'

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleChange(e) {
    if (e.target.name === 'username') {
      setUsername(e.target.value);
    }

    if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(username);
    props.onLogged(username, password);
  }

  return (
    <div className='form-container'>
      <form className='form' onSubmit={(e) => handleSubmit(e)}>
        <input name="username" type="text" placeholder="username" id="username" onChange={(e) => handleChange(e)}></input>
        <input name="password" type="password" placeholder="password" id="password" onChange={(e) => handleChange(e)}></input>
        <button type='submit' value='Log In' id="login" >Login</button>
        <span>Don't have an account? </span> <Link to='/signup'>Register</Link>
      </form>
    </div>
  )
}

export default Login;

