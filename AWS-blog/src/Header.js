import React from 'react';
import { Link } from 'react-router-dom'
// import logo from './logo.svg';
import './styles/App.css';

const Header = () => {
  return (
    <header className="App-header">
      <div>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <h1 className="App-title">Welcome to this blog!</h1>
      </div>
      <nav className="nav-wrapper">
        <li><Link to="/demos/awsblog/posts" >All Posts</Link></li>
        <li><Link to="/demos/awsblog/posts/add" >Write New Post</Link></li>
      </nav>
    </header>
  );
}

export default Header;
