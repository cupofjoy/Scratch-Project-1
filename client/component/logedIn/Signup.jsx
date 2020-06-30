import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../Style.css'

const Signup = (props) => {
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
    props.onSignUp(username, password);
  }

  return (
    <div className='form'>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input name="username" type="text" placeholder="username" id="username" onChange={(e) => handleChange(e)}></input>
        <input name="password" type="password" placeholder="password" id="password" onChange={(e) => handleChange(e)}></input>
        <button type='submit' value='Register' id="signup">Register</button>
      </form>
      <span>Already have an account? </span> <Link to='/login'>Login</Link>
      <button>
        <a href="https://github.com/login/oauth/authorize?client_id=7767f930d994a15db0d0&redirect_uri=http://localhost:8080/github/callback">Login with Github</a>
      </button>
    </div>
  )
}

export default Signup;