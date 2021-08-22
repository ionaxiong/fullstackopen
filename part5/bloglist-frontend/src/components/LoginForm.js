import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = (props) => {
  LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={props.handleLogin}>
        <div>
          username
          <input
            type="text"
            value={props.username}
            name="Username"
            onChange={props.handleUsernameChange}
          ></input>
        </div>
        <div>
          password
          <input
            type="password"
            value={props.password}
            name="Password"
            onChange={props.handlePasswordChange}
          ></input>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
