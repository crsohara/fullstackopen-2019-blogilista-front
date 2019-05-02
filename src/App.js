import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useField } from './hooks'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const username = useField({ type: 'text', name: 'username' })
	const password = useField({ type: 'password', name: 'password' })
	const [user, setUser] = useState(null)
	const [notificationState, setNotificationState] = useState({
		message: null,
		type: null
	})

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs( blogs )
		)
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username: username.value,
				password: password.value,
			})

			window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
			blogService.setToken(user.token)
			setUser(user)
			username.reset()
			password.reset()

			setNotificationState({ message: `Käyttäjä ${user.username} kirjautui sisään.`, type: 'note' })
			setTimeout(() => {
				setNotificationState({ ...notificationState, message: null })
			}, 4000)
		} catch (exception) {
			setNotificationState({ message: 'Väärä käyttäjätunnus tai salasana.', type: 'error' })
			setTimeout(() => {
				setNotificationState({ ...notificationState, message: null })
			}, 4000)
		}
	}

	const handleLogout = (event) => {
		window.localStorage.removeItem('loggedBlogappUser')
		setNotificationState({ message: `Käyttäjä ${user.username} kirjautui ulos.`, type: 'note' })
		setTimeout(() => {
			setNotificationState({ ...notificationState, message: null })
			window.location.reload()
		}, 2000)
	}

	const handleLikeButton = async (blogId) => {
		const likedBlog = blogs.find(blog => blog.id === blogId)
		likedBlog.likes++

		try {
			await blogService.update(likedBlog.id, likedBlog)
			setNotificationState({ message: `Tykättiin blogista ${likedBlog.title}.`, type: 'note' })
			setTimeout(() => {
				setNotificationState({ ...notificationState, message: null })
			}, 4000)
			const newBlogs = blogs.map(blog => {
				if (blog.id === likedBlog.id) {
					blog.likes = likedBlog.likes
				}
				return blog
			})
			setBlogs(newBlogs)
		} catch (exception) {
			setNotificationState({ message: `Blogin tykkääminen epäonnistui: ${exception}`, type: 'error' })
			setTimeout(() => {
				setNotificationState({ ...notificationState, message: null })
			}, 4000)
		}
	}

	const handleRemoveButton = async (blogId) => {
		const blogToRemove = blogs.find(blog => blog.id === blogId)

		window.confirm(`Haluatko varmasti poistaa blogin ${blogToRemove.title}?`)

		try {
			await blogService.deleteBlog(blogToRemove.id)
			setNotificationState({ message: `Poistettiin blogi ${blogToRemove.title}.`, type: 'note' })
			setTimeout(() => {
				setNotificationState({ ...notificationState, message: null })
			}, 4000)
			const newBlogs = blogs.filter(blog => blog.id !== blogToRemove.id)
			setBlogs(newBlogs)
		} catch (exception) {
			setNotificationState({ message: `Blogin poistaminen epäonnistui: ${exception}`, type: 'error' })
			setTimeout(() => {
				setNotificationState({ ...notificationState, message: null })
			}, 4000)
		}
	}

	const newBlogFormRef = React.createRef()

	const newBlogForm = () => {
		return (
			<Togglable buttonLabel='Tallenna uusi blogi' ref={newBlogFormRef}>
				<NewBlogForm
					blogs={blogs}
					setBlogs={setBlogs}
					notificationState={notificationState}
					setNotificationState={setNotificationState}
					visibilityToggleRef={newBlogFormRef} />
			</Togglable>
		)
	}

	if (user === null) {
		return (
			<div>
				<h2>Kirjaudu sisään</h2>

				<Notification state={notificationState}/>

				<form onSubmit={handleLogin}>
			Käyttäjätunnus <input { ...username} /><br />
			Salasana <input {...password} /><br />
					<button type="submit">Kirjaudu</button>
				</form>
			</div>
		)
	}

	blogs.sort((a, b) => b.likes - a.likes)
	return (
		<div>
			<h2>Blogit</h2>

			<Notification state={notificationState}/>

			<p>Käyttäjätunnus: {user.name}. <button type="submit" onClick={handleLogout}>Kirjaudu ulos</button></p>

			{newBlogForm()}

			<div id='blogs'>
				{blogs.map(blog =>
					<Blog
						key={blog.id}
						blog={blog}
						likeButtonHandler={() => handleLikeButton(blog.id)}
						removeButtonHandler={() => handleRemoveButton(blog.id)}
						currentUser={user.username} />
				)}
			</div>
		</div>
	)
}

export default App