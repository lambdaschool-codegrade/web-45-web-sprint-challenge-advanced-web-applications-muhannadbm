import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import Login from "./components/Login";
import "./styles.scss";
import PrivateRoute from "./components/PrivateRoute";
import BubblePage from './components/BubblePage'
import axios from "axios";

function App() {
  const [render, setRender] = useState(false)
  const Logout = (e) => {
    e.preventDefault()
    axios.post('http://localhost:5000/api/logout')
    .then(
      localStorage.removeItem('token'),
      window.location.href = '/login'
    )
    .catch(e => console.log(e))
  }
  return (
    <Router>
      <div className="App">
        <header>
          Color Picker Sprint Challenge
          <Link to="/" >Home</Link>
          <Link to="/login" >Login</Link>
          <Link to="/bubbles" >list</Link>
          <a data-testid="logoutButton" href="#" onClick={(e)=> Logout(e)}>logout</a>
        </header>
        <Route exact path="/login" render={(props)=> <Login {...props} setRender={setRender} />} />
        <PrivateRoute  path="/bubbles" component={BubblePage} />
        <Route exact path="/" render={(props)=> <Login {...props} setRender={setRender} />} />
      </div>
    </Router>
  );
}

export default App;

//Task List:
//1. Add in two routes that link to the Login Component, one for the default path '/' and one for the '/login'.
//2. Render BubblePage as a PrivateRoute
//2. Build the logout button to call the logout endpoint, remove the localStorage Item and redirect to the login page.