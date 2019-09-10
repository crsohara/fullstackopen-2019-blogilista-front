import React, { useEffect } from "react"
import { connect } from "react-redux"
import { initializeUsers } from "../reducers/userReducer"
import PropTypes from "prop-types"
import UserList from "../components/UserList"

const Users = ({ initializeUsers, users }) => {
	useEffect(() => {
		initializeUsers()
	}, [initializeUsers])

	return (
		<div>
			<h2>Käyttäjät</h2>
			<UserList users={users} />
		</div>
	)
}

const mapDispatchToProps = {
	initializeUsers
}

const mapStateToProps = state => {
	return {
		users: state.users.users
	}
}

const ConnectedUsers = connect(
	mapStateToProps,
	mapDispatchToProps
)(Users)

Users.propTypes = {
	users: PropTypes.array,
	initializeUsers: PropTypes.func
}

export default ConnectedUsers
