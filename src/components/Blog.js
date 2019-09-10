import React, { useEffect } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { Redirect } from "react-router-dom"
import { initializeBlogs, likeBlog, deleteBlog } from "../reducers/blogReducer"
import { createNotification } from "../reducers/notificationReducer"

const Blog = ({
	match,
	blogs,
	user,
	likeBlog,
	deleteBlog,
	createNotification,
	initializeBlogs
}) => {
	useEffect(() => {
		initializeBlogs()
	}, [initializeBlogs])

	const blog = blogs.find(b => b.id === match.params.id)
	if (blog === undefined && blogs.length > 0) return <Redirect to="/" />
	if (blog === undefined) return <h2>Ladataan...</h2>

	const handleLikeButton = () => {
		try {
			likeBlog(blog.id)
			createNotification({
				message: `Tykättiin blogista ${blog.title}.`,
				type: "note",
				timeout: 4
			})
		} catch (exception) {
			createNotification({
				message: `Blogin tykkääminen epäonnistui: ${exception}`,
				type: "error",
				timeout: 4
			})
		}
	}

	const handleRemoveButton = async () => {
		window.confirm(`Haluatko varmasti poistaa blogin ${blog.title}?`)

		try {
			deleteBlog(blog.id)
			createNotification({
				message: `Poistettiin blogi ${blog.title}.`,
				type: "note",
				timeout: 4
			})
		} catch (exception) {
			createNotification({
				message: `Blogin poistaminen epäonnistui: ${exception}`,
				type: "error",
				timeout: 4
			})
		}
	}

	const blogStyle = {
		padding: 10,
		border: "thin solid black",
		marginTop: 10
	}

	const removeButton = () => {
		return user.username === blog.user.username ? (
			<button onClick={handleRemoveButton}>Poista</button>
		) : null
	}

	return (
		<div style={blogStyle}>
			<div className="otsikko">
				{blog.title} {blog.author}
			</div>
			<div className="lisätiedot">
				{blog.url}
				<br />
				{blog.likes} tykkäystä{" "}
				<button onClick={handleLikeButton}>Tykkää</button>
				<br />
				Lisäsi {blog.user.username}
				<br />
				{removeButton()}
			</div>
		</div>
	)
}

const mapDispatchToProps = {
	createNotification,
	initializeBlogs,
	likeBlog,
	deleteBlog
}

const mapStateToProps = state => {
	return {
		blogs: state.blogs.blogs,
		user: state.user
	}
}

const ConnectedBlog = connect(
	mapStateToProps,
	mapDispatchToProps
)(Blog)

Blog.propTypes = {
	createNotification: PropTypes.func,
	initializeBlogs: PropTypes.func,
	likeBlog: PropTypes.func,
	deleteBlog: PropTypes.func,
	user: PropTypes.object,
	blogs: PropTypes.array,
	match: PropTypes.object
}

export default ConnectedBlog
