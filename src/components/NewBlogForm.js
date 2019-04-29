import React, { useState } from 'react'
import blogService from '../services/blogs'

const NewBlogForm = ({blogs, setBlogs}) => {
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

export default NewBlogForm