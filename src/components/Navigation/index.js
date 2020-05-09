import React from 'react'
import {  Link  } from 'react-router-dom'

import SignOutButton from '../SignOut'
import {HeaderData, UrlStrings} from '../../constants/routes'
import { AuthUserContext } from '../Session'

const Navigation = ({ authUser }) => (
    <AuthUserContext.Consumer>
        {authUser =>
            authUser ? <NavigationAuth /> : <NavigationNonAuth />
        }
    </AuthUserContext.Consumer>
)

const NavigationAuth = () => (
    <header>
        <h4><strong>{HeaderData.title}</strong></h4>
        <ul>
        { HeaderData.tabs.map(({ label, path }) => ( 
            <li>
                <Link to={path}>{label}</Link>
            </li>
        ))}
            <li>
                <SignOutButton />
            </li>
        </ul>
    </header>
)

const NavigationNonAuth = () => (
    <header>
        <h4><strong>{HeaderData.title}</strong></h4>
        <ul> 
            <li>
                <Link to={UrlStrings.LANDING}>Landing</Link>
            </li>
            <li>
                <Link to={UrlStrings.SIGN_IN}>Sign In</Link>
            </li>
        </ul>
    </header>
)

export default Navigation