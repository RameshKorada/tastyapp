import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showpassowrd: false,
    errorMessageStatus: false,
    errorMessage: '',
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
  }

  showpassword = () => {
    this.setState(prevState => ({showpassowrd: !prevState.showpassowrd}))
  }

  onUsernameChange = event => {
    this.setState({username: event.target.value})
  }

  usernameAndPasswordSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 50})
    const {history} = this.props
    history.replace('/')
    // console.log(history)
  }

  // form validation

  formValidation = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {
      username,
      password,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const responseData = await fetch(url, options)
    console.log(responseData)
    const jsData = await responseData.json()
    console.log(jsData)
    if (responseData.ok === true) {
      // something u have write heres
      console.log(jsData)
      this.usernameAndPasswordSuccess(jsData.jwt_token)
    } else {
      this.setState({errorMessage: jsData.error_msg, errorMessageStatus: true})
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {
      password,
      username,
      showpassowrd,
      errorMessageStatus,
      errorMessage,
    } = this.state
    console.log(username)
    const passwordStatus = showpassowrd ? 'text' : 'password'
    return (
      <div className="login-container">
        <div className="login-form-image-container">
          <div>
            <img
              className="login-image"
              src="https://res.cloudinary.com/dffvdqu7f/image/upload/v1673446497/Vector_lnt1u6.png"
              alt="website logo"
            />
          </div>
          <h1 className="tasty-catches">Tasty Kitchens</h1>

          <div className="min-width-login-container ">
            <h1 className="login-name">Login</h1>
            <div className="react-image-container">
              <img
                className="rect-image"
                src="https://res.cloudinary.com/dffvdqu7f/image/upload/v1674370806/Rectangle_1457_g6c519.png"
                alt="website login"
              />
            </div>
          </div>
          <div className="form-container">
            <form onSubmit={this.formValidation} className="form">
              <label htmlFor="username" className="login-label-element">
                USERNAME
              </label>
              <br />
              <input
                className="login-input-filed"
                type="text"
                id="username"
                placeholder="USERNAME"
                onChange={this.onUsernameChange}
              />
              <br />
              <label htmlFor="password" className="login-label-element">
                PASSWORD
              </label>
              <br />
              <input
                onChange={this.onPasswordChange}
                value={password}
                className="login-input-filed"
                type={passwordStatus}
                id="password"
                placeholder="PASSWORD"
              />
              <br />
              {errorMessageStatus && (
                <p className="errorName">* {errorMessage}</p>
              )}
              <br />
              <button className="login-button" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
        <div className="logon-image-container">
          <img
            className="website-logo"
            src="https://res.cloudinary.com/dffvdqu7f/image/upload/v1673446467/Rectangle_1456_zbefpt.png"
            alt="website login"
          />
        </div>
      </div>
    )
  }
}
export default Login
