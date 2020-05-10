import React from 'react'
import SignOut from '../SignOut'
import { withAuthorization } from '../Session'

const HomePage = (props) => (
    <div>
        <h1>HomePage</h1>
        <p>Welcome </p>
        {props.firebase.user && <SignOut /> }
    </div>
)

const condition = authUser => !!authUser

export default withAuthorization(condition)(HomePage)