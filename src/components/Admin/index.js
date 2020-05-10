import React from 'react'

import * as ROLES from '../../constants/roles'
import { withAuthorization } from '../Session'
import { withFirebase } from '../Firebase'

class AdminPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            users: [],
        }
    }

    componentDidMount() {
        this.setState({ loading: true })

        this.props.firebase.users().on('value', snapshot => {
            const usersObject = snapshot.val()

            const userList = Object.keys(usersObject).map(key => ({
                ...usersObject[key],
                uid: key,
            }))

            this.setState({
                users: userList,
                loading: false,
            })
        })
    }

    componentWillUnmount() {
        this.props.firebase.users().off()
    }

    render() {
        const { users, loading } = this.state

        return (
            <div>
                <h1>Admin</h1>
                {loading && <p>Loading...</p>}

                <UserList users={users} />
            </div>
        );
    }
}

const UserList = ({ users }) => (
    <div>
        {users.map(user => (
            
            <ul>
                <li key={user.uid}>
                <li>
                    <span>
                        <strong>ID:</strong> { user.uid }
                    </span>
                </li>
                <li>
                    <span>
                        <strong>E-Mail:</strong> { user.email }
                    </span>
                </li>
                <li>
                    <span>
                        <strong>Username:</strong> { user.username }
                    </span>
                </li>
                </li>
            
            </ul>
        ))}
    </div>
)

const condition = authUser => !!authUser

export default withAuthorization(condition)(withFirebase(AdminPage))