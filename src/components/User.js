import React, { useEffect } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import Typography from "@material-ui/core/Typography"
import { initializeUsers } from "../reducers/userReducer"

const User = ({ initializeUsers, user }) => {
	useEffect(() => {
		initializeUsers()
	}, [initializeUsers])

	if (user === undefined)
		return <Typography variant="h2">Ladataan...</Typography>

	const addedBlogs = user.blogs.map(blog => (
		<li key={blog.id}>
			<Link to={{ pathname: `/blogs/${blog.id}` }}>
				<Typography>{blog.title}</Typography>
			</Link>
		</li>
	))
	return (
		<div>
			<Typography variant="h2" gutterBottom>
				{user.name}
			</Typography>
			<Typography variant="h3" gutterBottom>
				Lisätyt blogit
			</Typography>

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
