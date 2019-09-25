import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import Typography from "@material-ui/core/Typography"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import Togglable from "../components/Togglable"
import NewBlogForm from "../components/NewBlogForm"
import { initializeBlogs } from "../reducers/blogReducer"

const Blogs = ({ blogs, user }) => {
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
			<Typography variant="h2" gutterBottom>
				Blogit
			</Typography>

			{user.user ? newBlogForm() : null}

			<List id="blogs">
				{blogs.map(blog => {
					return (
						<ListItem key={blog.id}>
							<Link to={{ pathname: `/blogs/${blog.id}` }}>
								<Typography>{blog.title}</Typography>
							</Link>
						</ListItem>
					)
				})}
			</List>
		</>
	)
}

const mapDispatchToProps = {
	initializeBlogs
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
	initializeBlogs: PropTypes.func,
	blogs: PropTypes.array,
	user: PropTypes.object
}

export default ConnectedBlogs
