import React, { useEffect } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { Redirect } from "react-router-dom"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import {
	initializeBlogs,
	likeBlog,
	deleteBlog,
	createComment
} from "../reducers/blogReducer"
import { createNotification } from "../reducers/notificationReducer"
import { useField } from "../hooks"

const Blog = ({
	match,
	blogs,
	user,
	likeBlog,
	deleteBlog,
	createComment,
	createNotification,
	initializeBlogs
}) => {
	useEffect(() => {
		initializeBlogs()
	}, [initializeBlogs])

	const comment = useField({ type: "text", name: "comment" })

	/* eslint-disable no-unused-vars */
	let reset, commentForm
	;({ reset, ...commentForm } = comment)
	/* eslint-enable no-unused-vars */

	const blog = blogs.find(b => b.id === match.params.id)
	if (blog === undefined && blogs.length > 0) return <Redirect to="/" />
	if (blog === undefined) return <h2>Ladataan...</h2>

	const addComment = async event => {
		event.preventDefault()
		try {
			createComment({ comment: comment.value, blogId: blog.id })
			createNotification({
				message: `Lisättiin kommentti "${comment.value}".`,
				type: "note",
				timeout: 4
			})
			comment.reset()
		} catch (exception) {
			createNotification({
				message: `Kommentointi epäonnistui: ${exception}`,
				type: "error",
				timeout: 4
			})
		}
	}

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

	const comments = blog.comments.map(c => (
		<li key={c.id}>
			<Typography>{c.comment}</Typography>
		</li>
	))

	return (
		<div style={blogStyle}>
			<div className="otsikko">
				<Typography variant="h3" gutterBottom>
					{blog.title}
				</Typography>
				<Typography gutterBottom>– {blog.author}</Typography>
			</div>
			<div className="lisätiedot">
				<Typography gutterBottom>
					{blog.url}
					<br />
					{blog.likes} tykkäystä{" "}
					<Button color="primary" onClick={handleLikeButton}>
						Tykkää
					</Button>
					<br />
					Lisäsi {blog.user.username}
					<br />
					{removeButton()}
				</Typography>
			</div>
			<div>
				<Typography variant="h4" gutterBottom>
					Kommentit
				</Typography>
				<form onSubmit={addComment}>
					<input {...commentForm} />
					<button type="submit">Kommentoi</button>
				</form>
				<ul>{comments}</ul>
			</div>
		</div>
	)
}

const mapDispatchToProps = {
	createNotification,
	initializeBlogs,
	likeBlog,
	deleteBlog,
	createComment
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
	createComment: PropTypes.func,
	user: PropTypes.object,
	blogs: PropTypes.array,
	match: PropTypes.object
}

export default ConnectedBlog
