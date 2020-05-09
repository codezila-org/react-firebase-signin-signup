import React from 'react'
import { compose } from 'recompose'
import { withFirebase } from '../Firebase'
import { Link } from 'react-router-dom'
import { UrlStrings } from '../../constants/routes'

const PasswordForgetPage = () => (
    <div>
        <h1>Forget Password?</h1>
        <PasswordForgetForm />
    </div>
)

const INITIAL_STATE = {
    email: '',
    error: null,
}

class PasswordForgetFormBase extends React.Component {
    constructor(props){
        super(props)

        this.state = { ...INITIAL_STATE }
    }

    onSubmit = event => {
        const { email } = this.state

        this.props.firebase
            .doPasswordReset(email)
            .then( () => {
                this.setState({ ...INITIAL_STATE })
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
        const { email, error } = this.state

        const isInvalid = email === ''

        return (
             <form onSubmit={this.onSubmit}>
                <input 
                    name='email'
                    value={email}
                    onChange={this.onChange}
                    type="email"
                    placeholder="Email"
                />
                <button disabled={isInvalid} type="submit">
                    Reset Password
                </button>

                {error && <p>{error.message}</p>}
             </form>
        )
    }
}

const PasswordForgetLink = () => (
    <p>
        <Link to={UrlStrings.PASSWORD_FORGET}>Forget Password?</Link>
    </p>
)

export default PasswordForgetPage

const PasswordForgetForm = withFirebase(PasswordForgetFormBase)

export { PasswordForgetForm, PasswordForgetLink }