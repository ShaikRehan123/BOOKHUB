import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderLoginSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  renderLoginError = error => {
    this.setState({
      showError: true,
      errorMsg: error,
      username: '',
      password: '',
    })
  }

  onClickSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.renderLoginSuccess(data.jwt_token)
    } else {
      this.renderLoginError(data.error_msg)
    }
  }

  render() {
    const {username, password, showError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-div">
        <img
          src="https://res.cloudinary.com/usgheroop/image/upload/v1645430653/Books%20Hub%20Mini%20Proj/Rectangle_1467_vi4nij.jpg"
          alt="website login"
          className="log-img"
        />
        <form className="login-form" onSubmit={this.onClickSubmit}>
          <img
            src="https://res.cloudinary.com/usgheroop/image/upload/v1645431204/Books%20Hub%20Mini%20Proj/Group_7731_fw9vij.png"
            alt="login website logo"
            className="login-logo"
          />
          <div className="inputs-div">
            <label className="user-label" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="input"
              placeholder="Username"
              value={username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="inputs-div">
            <label className="user-label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="input"
              placeholder="Password"
              value={password}
              onChange={this.onChangePassword}
            />
          </div>
          {showError && <p className="login-error">{errorMsg}</p>}
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default Login
