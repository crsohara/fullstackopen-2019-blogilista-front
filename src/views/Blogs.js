import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import Blog from "../components/Blog"
import Togglable from "../components/Togglable"
import NewBlogForm from "../components/NewBlogForm"
import {
	createNotification,
	clearNotification
} from "../reducers/notificationReducer"
import { initializeBlogs, likeBlog, deleteBlog } from "../reducers/blogReducer"

const Blogs = ({ user, blogs, likeBlog, createNotification, deleteBlog }) => {
	const handleLikeButton = async blogId => {
		try {
			likeBlog(blogId)
			const likedBlogTitle = blogs.find(blog => blog.id === blogId).title
			createNotification({
				message: `Tykättiin blogista ${likedBlogTitle}.`,
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

	const handleRemoveButton = async blogId => {
		const blogToRemove = blogs.find(blog => blog.id === blogId)

		window.confirm(`Haluatko varmasti poistaa blogin ${blogToRemove.title}?`)

		try {
			deleteBlog(blogToRemove.id)
			createNotification({
				message: `Poistettiin blogi ${blogToRemove.title}.`,
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

	const newBlogFormRef = React.createRef()

	const newBlogForm = () => {
		return (
			<Togglable buttonLabel="Tallenna uusi blogi" ref={newBlogFormRef}>
				<NewBlogForm visibilityToggleRef={newBlogFormRef} />
			</Togglable>
		)
	}

	blogs.sort((a, b) => b.likes - a.likes)
	return (
		<>
			<h2>Blogit</h2>

			{newBlogForm()}

			<div id="blogs">
				{blogs.map(blog => (
					<Blog
						key={blog.id}
						blog={blog}
						likeButtonHandler={() => handleLikeButton(blog.id)}
						removeButtonHandler={() => handleRemoveButton(blog.id)}
						currentUser={user.username}
					/>
				))}
			</div>
		</>
	)
}

const mapDispatchToProps = {
	createNotification,
	clearNotification,
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

const ConnectedBlogs = connect(
	mapStateToProps,
	mapDispatchToProps
)(Blogs)

Blogs.propTypes = {
	createNotification: PropTypes.func,
	clearNotification: PropTypes.func,
	initializeBlogs: PropTypes.func,
	likeBlog: PropTypes.func,
	deleteBlog: PropTypes.func,
	blogs: PropTypes.array,
	user: PropTypes.object
}

export default ConnectedBlogs
