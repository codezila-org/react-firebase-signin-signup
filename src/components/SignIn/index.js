import React from 'react'
import { SignUpLink } from '../SignUp'
import { UrlStrings } from '../../constants/routes'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import { withFirebase } from '../Firebase'
import { PasswordForgetLink } from '../PasswordForget'
import { AuthUserContext } from '../Session'
import SignOut from '../SignOut'

const SignInPage = ({ authUser }) => (
    <AuthUserContext.Consumer>
        {authUser =>
            !!authUser ?  
            <div>
                <p>Already Login</p>
                <SignOut />
            </div> 
            :
            <div>
                <h1>SignIn</h1>
                <SignInForm />
                <PasswordForgetLink />
                <SignUpLink />
            </div>
        }
    </AuthUserContext.Consumer>
)

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
}

class SignInFormBase extends React.Component {
    constructor(props){
        super(props)

        this.state = { ...INITIAL_STATE }
    }

    onSubmit = event => {
        const { email, password } = this.state

        this.props.firebase 
            .doSignInWithEmailAndPassword(email, password)
            .then( () => {
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
        const { email, password, error } = this.state

        const isInvalid = password === '' || email === ''
        
        return (
            <form onSubmit={this.onSubmit} >
                <input
                    name='email'
                    value={email}
                    onChange={this.onChange}
                    type="email"
                    placeholder="Email"
                />
                <input 
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password"
                />
                <button disabled={isInvalid} type="submit" >
                    Sign In
                </button>

                {error && <p>{ error.message }</p>}
            </form>
        )
    }
}

const SignInForm = compose(
    withRouter,
    withFirebase,
)(SignInFormBase)

export default SignInPage

export {  SignInForm  }