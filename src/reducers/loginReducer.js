import axios from "axios"
const baseUrl = "/api/login"

const SET_USER = "SET_USER"
const LOG_OUT = "LOG_OUT"
const LOGIN_FAILURE = "LOGIN_FAILURE"

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

export const loginFailure = error => {
	return {
		type: LOGIN_FAILURE,
		error
	}
}

export const logIn = credentials => {
	return async dispatch => {
		try {
			const response = await axios.post(baseUrl, credentials)
			const user = response.data
			dispatch(setUser(user))
		} catch (error) {
			dispatch(loginFailure(error))
		}
	}
}

const loginReducer = (state = { user: null, error: null }, action) => {
	switch (action.type) {
		case SET_USER: {
			return { user: action.user, error: null }
		}
		case LOG_OUT: {
			return { user: null, error: null }
		}
		case LOGIN_FAILURE: {
			return { user: null, error: action.exception }
		}
		default:
			return state
	}
}

export default loginReducer
