import React from "react"
import propTypes from "prop-types"
import { Link } from "react-router-dom"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"

const UserList = ({ users }) => {
	const userList = users.map(user => {
		return (
			<TableRow key={user.id}>
				<TableCell>
					<Link to={{ pathname: `/users/${user.id}` }}>{user.name}</Link>
				</TableCell>
				<TableCell>{user.blogs.length}</TableCell>
			</TableRow>
		)
	})

	return (
		<Paper>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Käyttäjä</TableCell>
						<TableCell>Blogeja luotu</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>{userList}</TableBody>
			</Table>
		</Paper>
	)
}

UserList.propTypes = {
	users: propTypes.array.isRequired
}

export default UserList
