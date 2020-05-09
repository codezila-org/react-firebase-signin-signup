import React from 'react'
import SignOut from '../SignOut'
import { withFirebase } from '../Firebase'

const HomePage = (props) => (
    <div>
        <h1>HomePage</h1>
        {props.firebase.user && <SignOut /> }
    </div>
)

export default withFirebase(HomePage)