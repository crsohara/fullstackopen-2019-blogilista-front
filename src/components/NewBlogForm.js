import React from 'react'
import blogService from '../services/blogs'
import propTypes from 'prop-types'
import { useField } from '../hooks'

const NewBlogForm = ({ blogs, setBlogs, notificationState, setNotificationState, visibilityToggleRef }) => {
	const title = useField({ type: 'text', name: 'title' })
	const author = useField({ type: 'text', name: 'author' })
	const blogURL = useField({ type: 'text', name: 'blogURL' })

	const handleNewBlogSubmit = async (event) => {
		event.preventDefault()
		visibilityToggleRef.current.toggleVisibility()
		const blogObject = {
			title: title.value,
			author: author.value,
			url: blogURL.value,
		}

		const addedBlog = await blogService.create(blogObject)
		if (addedBlog) {
			const newBlogs = blogs.concat(addedBlog)
			setBlogs(newBlogs)
			title.reset()
			author.reset()
			blogURL.reset()
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
		Otsikko <input { ...title } /><br />
		Tekijä <input { ...author } /><br />
		URL <input { ...blogURL } /><br />
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