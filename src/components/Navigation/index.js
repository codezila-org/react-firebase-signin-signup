import React from 'react'
import {  Link  } from 'react-router-dom'

import {HeaderData} from '../../constants/routes'

const Navigation = () => (
    <header>
        <h4><strong>{HeaderData.title}</strong></h4>
        <ul>
        { HeaderData.tabs.map(({ label, path }) => ( 
            <li>
                <Link to={path}>{label}</Link>
            </li>
        ))}
        </ul>
    </header>
)

export default Navigation