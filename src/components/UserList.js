import React from "react"
import propTypes from "prop-types"
import { Link } from "react-router-dom"

const UserList = ({ users }) => {
	const userList = users.map(user => {
		return (
			<tr key={user.id}>
				<td>
					<Link to={{ pathname: `/users/${user.id}` }}>{user.name}</Link>
				</td>
				<td>{user.blogs.length}</td>
			</tr>
		)
	})

	return (
		<table>
			<thead>
				<tr>
					<th>Käyttäjä</th>
					<th>Blogeja luotu</th>
				</tr>
			</thead>
			<tbody>{userList}</tbody>
		</table>
	)
}

UserList.propTypes = {
	users: propTypes.array.isRequired
}

export default UserList
