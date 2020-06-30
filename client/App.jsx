import React, { Component } from 'react';
import { withCookies } from 'react-cookie';

import NavBar from './component/navigationBar/navBar.js';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './component/logedIn/Login.jsx';
import Signup from './component/logedIn/Signup.jsx';
import Canvas from './component/logedIn/canvas.jsx';
import Home from './component/logedIn/home'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logStatus: false
    }
    this.onLogged = this.onLogged.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    console.log(this.props.cookies.cookies.signedin)
    if (this.props.cookies.cookies.signedin) {
      return this.setState({
        logStatus: true
      })
    }
  }

  signOut(e) {
    console.log('signOut invoked');
    const { cookies } = this.props;
    cookies.remove('signedin');

    this.setState({
      ...this.state,
      logStatus: false
    })
  }

  onLogged(username, password) {
    console.log('onLogged invoked')
    console.log(username, password)
    fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
      .then(res => res.json())
      .then(data => {
        console.log('onLogged data:', data);
        this.setState({
          ... this.state,
          logStatus: data.logStatus
        })
      })
      .catch(err => console.log('err onLogged:', err))
  }

  onSignUp(username, password) {
    console.log('onSignUp invoked')
    console.log(username, password)
    fetch('/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
      .then(res => res.json())
      .then(data => {
        console.log('onSignUp data:', data);
        this.setState({
          ... this.state,
          logStatus: data.logStatus
        })
      })
      .catch(err => console.log('err onLogged:', err))
  }

  render() {
    let renderCanvas;
    if (this.state.logStatus) {
      renderCanvas = <Canvas />
    };

    let renderLogin;
    let renderSignUp;
    let renderHome;
    if (!this.state.logStatus) {
      renderLogin = <Route path="/login" render={(routeProps) => (
        <Login onLogged={this.onLogged} />
      )} />

      renderSignUp = <Route path="/signup" render={(routeProps) => (
        <Signup onSignUp={this.onSignUp} />
      )} />

      renderHome = <Route path="/" component={Home} />;
    };


    return (
      <Router>
        <div>
          <NavBar loggedIn={this.state.logStatus} signOut={this.signOut} />
          <Switch>
            {/* <Route path="/login"  component={Login} /> */}
            {renderLogin}
            {renderSignUp}
            {/* <Route path="/canvas"  component={Canvas}/> */}
            {renderHome}
          </Switch>
        </div>
        {renderCanvas}
      </Router>
    )
  }
}


export default withCookies(App);
