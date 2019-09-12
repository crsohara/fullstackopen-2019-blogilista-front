import React from "react"
import { connect } from "react-redux"
import propTypes from "prop-types"
import Input from "@material-ui/core/Input"
import Typography from "@material-ui/core/Typography"
import { useField } from "../hooks"
import { createNotification } from "../reducers/notificationReducer"
import { createBlog } from "../reducers/blogReducer"

const NewBlogForm = ({
	createNotification,
	createBlog,
	visibilityToggleRef
}) => {
	const title = useField({ type: "text", name: "title" })
	const author = useField({ type: "text", name: "author" })
	const blogURL = useField({ type: "text", name: "blogURL" })

	const handleNewBlogSubmit = async event => {
		event.preventDefault()
		visibilityToggleRef.current.toggleVisibility()
		const blogObject = {
			title: title.value,
			author: author.value,
			url: blogURL.value
		}
		try {
			createBlog(blogObject)

			title.reset()
			author.reset()
			blogURL.reset()
			createNotification({
				message: `Uusi blogi lisätty: ${blogObject.title} (${blogObject.author}).`,
				type: "note",
				timeout: 4
			})
		} catch (error) {
			createNotification({
				message: `Tapahtui virhe: ${error}!`,
				type: "error",
				timeout: 4
			})
		}
	}

	/* eslint-disable no-unused-vars */
	let reset, titleForm, authorForm, blogURLForm
	;({ reset, ...titleForm } = title)
	;({ reset, ...authorForm } = author)
	;({ reset, ...blogURLForm } = blogURL)
	/* eslint-enable no-unused-vars */

	return (
		<>
			<Typography variant="h3">Luo uusi blogi</Typography>
			<form onSubmit={handleNewBlogSubmit}>
				<Typography>Otsikko </Typography>
				<Input {...titleForm} />
				<br />
				<Typography>Tekijä</Typography> <Input {...authorForm} />
				<br />
				<Typography>URL</Typography> <Input {...blogURLForm} />
				<br />
				<Input type="submit" value="Tallenna" />
			</form>
		</>
	)
}

NewBlogForm.propTypes = {
	visibilityToggleRef: propTypes.object.isRequired,
	createNotification: propTypes.func.isRequired,
	createBlog: propTypes.func.isRequired
}

const mapDispatchToProps = {
	createNotification,
	createBlog
}

const ConnectedNewBlogForm = connect(
	null,
	mapDispatchToProps
)(NewBlogForm)

export default ConnectedNewBlogForm
