import React from 'react'


const Navbar = () => {
  return (
    <nav id="large-navigation">
      <ul>
        <li className="nav-icon"><a href="/">Home</a></li>
        <li className="nav-icon"><a href="/timeline">Blog</a></li>
        {/* <li className="nav-icon"><a href="#music">Music</a></li> */}
        {/* <li className="nav-icon"><a href="#development">Development</a></li> */}
        {/* <li className="nav-icon"><a href="#contact">Contact</a></li> */}

        <li className="social-icon">
          <a href="https://github.com/veryspry" target="_blank" rel="noopener noreferrer" >
          <i className="fa fa-github" /></a>
        </li>
        <li className="social-icon">
          <a href="https://twitter.com/MattEhlinger" target="_blank" rel="noopener noreferrer" >
          <i className="fa fa-twitter" /></a>
        </li>
        <li className="social-icon" >
          <a href="https://www.instagram.com/veryspry/" target="_blank" rel="noopener noreferrer" >
          <i className="fa fa-instagram" /></a>
        </li>

        {/* <li className="nav-pic"><img src="/img/Headshots/square/IMG_9263_sq.jpg"/></li> */}
      </ul>
      <div className="nav-pic"><img src="/img/Headshots/square/IMG_9263_sq.jpg"/></div>
    </nav>
  )
}

export default Navbar
