import axios from "axios"
const baseUrl = "/api/blogs"

export const REQUEST_BLOGS = "REQUEST_BLOGS"
export const RECEIVE_BLOGS = "RECEIVE_BLOGS"
export const SET_TOKEN = "SET_TOKEN"
export const ADD_LIKE = "ADD_LIKE"
export const REMOVE_BLOG = "REMOVE_BLOG"

export const fetchBlogs = () => {
	return {
		type: REQUEST_BLOGS
	}
}

export const receiveBlogs = blogs => {
	return {
		type: RECEIVE_BLOGS,
		blogs
	}
}

export const setToken = token => {
	return {
		type: SET_TOKEN,
		token
	}
}

const addLike = blogId => {
	return {
		type: ADD_LIKE,
		blogId
	}
}

const removeBlog = blogId => {
	return {
		type: REMOVE_BLOG,
		blogId
	}
}

export const likeBlog = blogId => {
	return async (dispatch, getState) => {
		dispatch(addLike(blogId))
		const blogToUpdate = getState().blogs.blogs.find(blog => blog.id === blogId)
		const config = {
			headers: { Authorization: `bearer ${getState().blogs.token}` }
		}
		await axios.put(`${baseUrl}/${blogId}`, blogToUpdate, config)
	}
}

export const deleteBlog = blogId => {
	return async (dispatch, getState) => {
		const config = {
			headers: { Authorization: `bearer ${getState().blogs.token}` }
		}
		await axios.delete(`${baseUrl}/${blogId}`, config)
		dispatch(removeBlog(blogId))
	}
}

const shouldFetchBlogs = state => {
	const blogs = state.blogs
	if (blogs.blogs.length < 1) {
		return true
	} else if (blogs.isFetching) {
		return false
	}
	return false
}

export const initializeBlogs = () => {
	return async (dispatch, getState) => {
		if (shouldFetchBlogs(getState())) {
			dispatch(fetchBlogs())
			const response = await axios.get(baseUrl)
			const blogs = response.data
			dispatch(receiveBlogs(blogs))
		}
	}
}

const blogReducer = (
	state = { isFetching: false, blogs: [], token: "" },
	action
) => {
	switch (action.type) {
		case REQUEST_BLOGS:
			return Object.assign({}, state, { isFetching: true })
		case RECEIVE_BLOGS:
			return Object.assign({}, state, {
				isFetching: false,
				blogs: action.blogs
			})
		case SET_TOKEN:
			return Object.assign({}, state, { token: action.token })
		case ADD_LIKE: {
			const likedBlog = state.blogs.find(blog => blog.id === action.blogId)
			likedBlog.likes++
			const newBlogs = state.blogs.map(blog =>
				blog.id === likedBlog.id ? likedBlog : blog
			)
			return Object.assign({}, state, { blogs: newBlogs })
		}
		case REMOVE_BLOG: {
			const newBlogs = state.blogs.filter(blog => blog.id !== action.blogId)
			return Object.assign({}, state, { blogs: newBlogs })
		}
		default:
			return state
	}
}

export default blogReducer
