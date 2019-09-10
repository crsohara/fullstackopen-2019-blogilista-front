import React from "react"
import propTypes from "prop-types"

const UserList = ({ users }) => {
	const userList = users.map(user => {
		return (
			<tr key={user.id}>
				<td>{user.name}</td>
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
