import React, { useEffect } from "react"
import Blog from "./components/Blog"
import NewBlogForm from "./components/NewBlogForm"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import { useField } from "./hooks"
import {
	createNotification,
	clearNotification
} from "./reducers/notificationReducer"
import { initializeBlogs, likeBlog, deleteBlog } from "./reducers/blogReducer"
import { logOut, userFromStorage, logIn } from "./reducers/userReducer"
import { connect } from "react-redux"
import PropTypes from "prop-types"

const App = ({
	user,
	blogs,
	initializeBlogs,
	createNotification,
	likeBlog,
	deleteBlog,
	userFromStorage,
	logOut,
	logIn
}) => {
	const username = useField({ type: "text", name: "username" })
	const password = useField({ type: "password", name: "password" })

	useEffect(() => {
		initializeBlogs()
	}, [initializeBlogs])

	useEffect(() => {
		userFromStorage()
	}, [userFromStorage])

	const handleLogin = async event => {
		event.preventDefault()
		try {
			logIn({
				username: username.value,
				password: password.value
			})
			createNotification({
				message: `Käyttäjä ${username.value} kirjautui sisään.`,
				type: "note",
				timeout: 4
			})
			username.reset()
			password.reset()
		} catch (exception) {
			createNotification({
				message: `Väärä käyttäjätunnus tai salasana. ${exception}`,
				type: "error",
				timeout: 4
			})
		}
	}

	const handleLogout = () => {
		logOut()
		createNotification({
			message: `Käyttäjä ${user.username} kirjautui ulos.`,
			type: "note",
			timeout: 4
		})
	}

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

	/* eslint-disable no-unused-vars */
	let reset, usernameForm, passwordForm
	;({ reset, ...usernameForm } = username)
	;({ reset, ...passwordForm } = password)
	/* eslint-enable no-unused-vars */

	if (user === null) {
		return (
			<div>
				<h2>Kirjaudu sisään</h2>

				<Notification />

				<form onSubmit={handleLogin}>
					Käyttäjätunnus <input {...usernameForm} />
					<br />
					Salasana <input {...passwordForm} />
					<br />
					<button type="submit">Kirjaudu</button>
				</form>
			</div>
		)
	}

	blogs.sort((a, b) => b.likes - a.likes)
	return (
		<div>
			<h2>Blogit</h2>

			<Notification />

			<p>
				Käyttäjätunnus: {user.name}.{" "}
				<button type="submit" onClick={handleLogout}>
					Kirjaudu ulos
				</button>
			</p>

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
		</div>
	)
}

const mapDispatchToProps = {
	createNotification,
	clearNotification,
	initializeBlogs,
	likeBlog,
	deleteBlog,
	userFromStorage,
	logOut,
	logIn
}

const mapStateToProps = state => {
	return {
		blogs: state.blogs.blogs,
		isFetching: state.blogs.isFetching,
		user: state.user
	}
}

const ConnectedApp = connect(
	mapStateToProps,
	mapDispatchToProps
)(App)

App.propTypes = {
	createNotification: PropTypes.func,
	clearNotification: PropTypes.func,
	initializeBlogs: PropTypes.func,
	likeBlog: PropTypes.func,
	deleteBlog: PropTypes.func,
	userFromStorage: PropTypes.func,
	logOut: PropTypes.func,
	logIn: PropTypes.func,
	blogs: PropTypes.array,
	user: PropTypes.object
}

export default ConnectedApp
