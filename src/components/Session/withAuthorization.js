import React from 'react'

import {  UrlStrings  } from '../../constants/routes'
import { withRouter } from 'react-router-dom'
import {  withFirebase  } from '../Firebase'
import { compose } from 'recompose'

const withAuthorization = condition => Component => {
    class WithAuthorization extends React.Component {
        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged(
                authUser => {
                    if (!condition(authUser)) {
                        this.props.history.push(UrlStrings.SIGN_IN)
                    }
                }
            )
        }

        componentWillUnmount() {
            this.listener()
        }

        render() {
            return (
                 <Component {...this.props} />
            )
        }
    }

    return compose(
        withRouter,
        withFirebase,
    )(WithAuthorization)
}

export default withAuthorization