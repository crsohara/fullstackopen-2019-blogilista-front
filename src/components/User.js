import React, { useEffect } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { initializeUsers } from "../reducers/userReducer"

const User = ({ initializeUsers, user }) => {
	useEffect(() => {
		initializeUsers()
	}, [initializeUsers])

	if (user === undefined) return <h2>Ladataan...</h2>

	const addedBlogs = user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)
	return (
		<div>
			<h2>{user.name}</h2>
			<h3>Lisätyt blogit</h3>

			<ul>{addedBlogs}</ul>
		</div>
	)
}

const mapDispatchToProps = {
	initializeUsers
}

const mapStateToProps = (state, ownProps) => {
	return {
		user: state.users.users.find(u => u.id === ownProps.match.params.id)
	}
}

const ConnectedUser = connect(
	mapStateToProps,
	mapDispatchToProps
)(User)

User.propTypes = {
	user: PropTypes.object,
	initializeUsers: PropTypes.func,
	match: PropTypes.object.isRequired
}

export default ConnectedUser
