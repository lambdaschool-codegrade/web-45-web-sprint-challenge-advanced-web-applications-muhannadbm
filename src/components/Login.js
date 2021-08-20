import axios from "axios";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";


const inititalState = {
  username: '',
  password: ''
}

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [credentials, setCredentials] = useState(inititalState)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/login', credentials)
    .then(res=>{
      localStorage.setItem('token', res.data.payload);
      console.log('inside then login');
      props.history.push('/bubbles') }
    )
    .catch(e => setError(e.response.data.error)
    )

  }

  const handleChange = (e) => {
    const {name, value} = e.target
    setCredentials({...credentials,  [name]: value})
  }

  //replace with error state
 if(!localStorage.getItem('token')) {
  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <h2>Build login form here</h2>
        <form onSubmit={e=>handleSubmit(e)}>
          <label> Username
          <input id="username" name ="username" type="text" onChange={(e)=>handleChange(e)} value={credentials.username}/>
          </label>
          <label>Password
          <input id="password" name="password" type="password" onChange={(e)=>handleChange(e)} value={credentials.password}/>
          </label>
          <button id="submit">Submit</button>
        </form>
      </div>

      <p id="error" className="error">{error}</p>
    </div>
  );
}
else { return <Redirect to="/bubbles" />}

}


export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state necessary for form functioning.
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to "Lambda" / "School", save that token to localStorage and redirect to a BubblePage route.
//6. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE id="username" and id="password"
//7. MAKE SURE YOUR SUBMIT BUTTON INCLUDES id="submit"
//8. MAKE SURE YOUR ERROR p tag contains the id="error"