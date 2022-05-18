import {Component} from 'react'
import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import {FaBars, FaTimes} from 'react-icons/fa'
import './index.css'

class NavBar extends Component {
  state = {
    click: false,
  }

  handleClick = () => {
    this.setState(prev => ({
      click: !prev.click,
    }))
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')

    history.replace('/login')
  }

  render() {
    const {click} = this.state

    return (
      <>
        <div className="navbar">
          <Link to="/" className="nav-logo">
            <img
              src="https://res.cloudinary.com/usgheroop/image/upload/v1645431204/Books%20Hub%20Mini%20Proj/Group_7731_fw9vij.png"
              alt="website logo"
              className="nav-logo"
            />
          </Link>

          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className="nav-item">
              <Link
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={this.handleClick}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/shelf"
                activeClassName="active"
                className="nav-links"
                onClick={this.handleClick}
              >
                Bookshelves
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={this.onClickLogout}
                className="logout-btn"
              >
                Logout
              </button>
            </li>
          </ul>

          <div className="nav-icon">
            <button
              type="button"
              className="mobile-btn"
              onClick={this.handleClick}
            >
              {click ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </>
    )
  }
}
export default withRouter(NavBar)
