import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import Togglable from "../components/Togglable"
import NewBlogForm from "../components/NewBlogForm"
import { initializeBlogs } from "../reducers/blogReducer"

const Blogs = ({ blogs }) => {
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

			<ul id="blogs">
				{blogs.map(blog => {
					return (
						<li key={blog.id}>
							<Link to={{ pathname: `/blogs/${blog.id}` }}>{blog.title}</Link>
						</li>
					)
				})}
			</ul>
		</>
	)
}

const mapDispatchToProps = {
	initializeBlogs
}

const mapStateToProps = state => {
	return {
		blogs: state.blogs.blogs
	}
}

const ConnectedBlogs = connect(
	mapStateToProps,
	mapDispatchToProps
)(Blogs)

Blogs.propTypes = {
	initializeBlogs: PropTypes.func,
	blogs: PropTypes.array
}

export default ConnectedBlogs
