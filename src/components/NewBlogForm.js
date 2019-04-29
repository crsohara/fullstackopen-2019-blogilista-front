import React, { useState } from 'react'
import blogService from '../services/blogs'
import propTypes from 'prop-types'

const NewBlogForm = ({ blogs, setBlogs, notificationState, setNotificationState, visibilityToggleRef }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [blogURL, setBlogURL] = useState('')

	const handleTitleChange = (event) => {
		setTitle(event.target.value)
	}

	const handleAuthorChange = (event) => {
		setAuthor(event.target.value)
	}

	const handleBlogURLChange = (event) => {
		setBlogURL(event.target.value)
	}

	const handleNewBlogSubmit = async (event) => {
		event.preventDefault()
		visibilityToggleRef.current.toggleVisibility()
		const blogObject = {
			title: title,
			author: author,
			url: blogURL,
		}

		const addedBlog = await blogService.create(blogObject)
		if (addedBlog) {
			const newBlogs = blogs.concat(addedBlog)
			setBlogs(newBlogs)
			setTitle('')
			setAuthor('')
			setBlogURL('')
			setNotificationState({ message: `Uusi blogi lisätty: ${addedBlog.title} (${addedBlog.author}).`, type: 'note' })
			setTimeout(() => {
				setNotificationState({ ...notificationState, message: null })
			}, 4000)

		}
	}

	return (
	<>
	<h2>Luo uusi blogi</h2>
	<form onSubmit={handleNewBlogSubmit}>
		Otsikko <input type="text" value={title} name="title" onChange={handleTitleChange} /><br />
		Tekijä <input type="text" value={author} name="author" onChange={handleAuthorChange} /><br />
		URL <input type="text" value={blogURL} name="blogURL" onChange={handleBlogURLChange} /><br />
		<input type="submit" value="Tallenna"/>
	</form>
	</>
	)
}

NewBlogForm.propTypes = {
	blogs: propTypes.array.isRequired,
	setBlogs: propTypes.func.isRequired,
	notificationState: propTypes.object.isRequired,
	setNotificationState: propTypes.func.isRequired,
	visibilityToggleRef: propTypes.object.isRequired,
}

export default NewBlogForm