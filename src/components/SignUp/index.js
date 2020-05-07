import React from 'react'
import {Link, withRouter} from 'react-router-dom'

import {  withFirebase  } from '../Firebase'

import {UrlStrings} from '../../constants'
import { compose } from 'recompose'

const SignUpPage = () => (
    <div>
        <h1>SignUP</h1>
        <SignUpForm />
    </div>
)

const INITIAL_STATE = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
}

class SignUpFormBase extends React.Component {
    constructor(props){
        super(props)

        this.state = { ...INITIAL_STATE }
    }

    onSubmit = event => {
        const { username, email, passwordOne } = this.state

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                this.setState({ ...INITIAL_STATE })
                this.props.history.push(UrlStrings.HOME)
            })
            .catch(error => {
                this.setState({ error })
            })

            event.preventDefault()
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        const {
            username,
            firstName,
            lastName,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return (
          <form onSubmit={this.onSubmit}>
            <input 
                name="username"
                value={username}
                onChange={this.onChange}
                type="text"
                placeholder="Username"
            /> 
            <input 
                name="firstName"
                value={firstName}
                onChange={this.onChange}
                type="text"
                placeholder="First Name"
            /> 
            <input 
                name="lastName"
                value={lastName}
                onChange={this.onChange}
                type="text"
                placeholder="Last Name"
            />    
            <input 
                name="email"
                value={email}
                onChange={this.onChange}
                type="email"
                placeholder="Email"
            />   
            <input 
                name="passwordOne"
                value={passwordOne}
                onChange={this.onChange}
                type="password"
                placeholder="Password"
            />    
            <input 
                name="passwordTwo"
                value={passwordTwo}
                onChange={this.onChange}
                type="password"
                placeholder="Confirm Password"
            />   
            <button disabled={isInvalid} type="submit" >Sign Up</button>
            {error && <p>{error.message}</p>}
          </form>   
        )
    }
}

const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={UrlStrings.SIGN_UP} />
    </p>
)

const SignUpForm = compose(
    withRouter,
    withFirebase,
    )(SignUpFormBase)

export default SignUpPage

export {  SignUpForm, SignUpLink  }