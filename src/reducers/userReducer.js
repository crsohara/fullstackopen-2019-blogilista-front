import axios from "axios"
const baseUrl = "/api/login"

const SET_USER = "SET_USER"
const USER_FROM_STORAGE = "USER_FROM_STORAGE"
const LOG_OUT = "LOG_OUT"

export const setUser = user => {
	return {
		type: SET_USER,
		user
	}
}

export const logOut = () => {
	return {
		type: LOG_OUT
	}
}

export const userFromStorage = () => {
	return {
		type: USER_FROM_STORAGE
	}
}

export const logIn = credentials => {
	return async dispatch => {
		const response = await axios.post(baseUrl, credentials)
		const user = response.data
		dispatch(setUser(user))
	}
}

const userReducer = (state = null, action) => {
	switch (action.type) {
		case USER_FROM_STORAGE: {
			const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
			return loggedUserJSON ? JSON.parse(loggedUserJSON) : state
		}
		case SET_USER: {
			window.localStorage.setItem(
				"loggedBlogappUser",
				JSON.stringify(action.user)
			)
			return action.user
		}
		case LOG_OUT: {
			window.localStorage.removeItem("loggedBlogappUser")
			return null
		}
		default:
			return state
	}
}

export default userReducer
