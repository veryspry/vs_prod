import React from 'react'


class Navbar extends React.Component {

  state = {
    width: window.innerWidth,
  }

  componentDidMount() {
    window.addEventListener('resize', this.getWidth)
  }

  getWidth = () => {
    this.setState({width: window.innerWidth})
  }

  render() {

    if (this.state.width > 800) {
      return (
        <nav className="large-navigation">
          <ul>
            <li className="nav-icon"><a href="/">Home</a></li>
            <li className="nav-icon"><a href="/timeline">Blog</a></li>
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
          </ul>
          <div className="nav-pic"><img src="/img/IMG_9263_sq.jpg"/></div>
        </nav>
      )
    } else {
      return (
        <nav className="small-navigation">
          <div className="small-nav-pic"><img src="/img/IMG_9263_sq.jpg"/></div>
          <ul>
            <li className="nav-icon"><a href="/">Home</a></li>
            <li className="nav-icon"><a href="/timeline">Blog</a></li>
          </ul>
          <ul>
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
        </nav>
      )
    }
  }
}

export default Navbar
