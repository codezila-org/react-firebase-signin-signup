import React from 'react'
import {  
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'

import Navigation from '../Navigation'
import LandingPage from '../Landing'
import SignUpPage from '../SignUp'
import SignInPage from '../SignIn'
//import PasswordForgetPage from '../PasswordForget'
import HomePage from '../Home'
//import AccountPage from '../Account'
//import AdminPage from '../Admin'

import {UrlStrings} from '../../constants/routes'
import { withFirebase } from '../Firebase'

class App extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      authUser: null,
    };
  }

  componentDidMount(){
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
      ? this.setState({ authUser })
      : this.setState({ authUser: null })
    })
  }

  componentWillUnmount(){
    this.listener()
  }
 
  render() {
    return (
        <Router>
            <div>
                <Navigation authUser={this.state.authUser} />
                <hr/>

                <Route exact path={UrlStrings.LANDING} component={LandingPage} />
                <Route path={UrlStrings.SIGN_UP} component={SignUpPage} />
                <Route path={UrlStrings.SIGN_IN} component={SignInPage} />
                {/* <Route path={UrlStrings.PASSWORD_FORGET} component={PasswordForgetPage} /> */}
                <Route path={UrlStrings.HOME} component={HomePage} />
                {/* <Route path={UrlStrings.ACCOUNT} component={AccountPage} /> */}
                {/* <Route path={UrlStrings.ADMIN} component={AdminPage} /> */}

            </div>
        </Router>
    )
  }
}

export default withFirebase(App)