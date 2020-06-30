
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import '../../Style.css'
const image = '../../asset/image.png'
export default class NavBar extends Component {
  render() {
    return (
      <nav >
        <div className='nav-elem'>
          <ul>
            <img src={image} />
            {this.props.loggedIn ? <Link to={"/Login"}><li className='shoot'><button className='login' onClick={this.props.signOut} >Sign out</button> </li></Link> : <Link to={"/Login"}><li className='shoot'><button className='login'>Sign in</button> </li></Link>}
            <Link to={"/canvas"}><li className='nav-li'>Canvas</li></Link>
            <Link to={"/"}><li className='nav-li'>Home</li></Link>
          </ul>
        </div>
      </nav>
    )
  }
}