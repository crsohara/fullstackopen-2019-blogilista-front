import React, { useEffect } from "react"
import { connect } from "react-redux"
import Typography from "@material-ui/core/Typography"
import { initializeUsers } from "../reducers/userReducer"
import PropTypes from "prop-types"
import UserList from "../components/UserList"

const Users = ({ initializeUsers, users }) => {
	useEffect(() => {
		initializeUsers()
	}, [initializeUsers])

	return (
		<div>
			<Typography variant="h2" gutterBottom>
				Käyttäjät
			</Typography>
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
