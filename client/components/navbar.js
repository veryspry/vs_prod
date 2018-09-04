import React from 'react'


const Navbar = () => {
  return (
    <nav id="large-navigation">
      <ul id="#nav-items">
        <li className="nav-icon"><a href="#top-of-page">Home</a></li>
        <li className="nav-icon"><a href="#music">Music</a></li>
        <li className="nav-icon"><a href="#development">Development</a></li>
        <li className="nav-icon"><a href="#contact">Contact</a></li>

        <li className="social-icon"><a href="https://github.com/veryspry" target="_blank" > <i className="fa fa-github" /></a></li>
        <li className="social-icon"><a href="https://twitter.com/MattEhlinger" target="_blank" > <i className="fa fa-twitter" /></a></li>
        <li className="social-icon" ><a href="https://www.instagram.com/veryspry/" target="_blank" > <i className="fa fa-instagram" /></a></li>
      </ul>
    </nav>
  )
}

export default Navbar
