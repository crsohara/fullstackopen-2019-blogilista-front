import axios from "axios"
const baseUrl = "/api/users"

export const REQUEST_USERS = "REQUEST_USERS"
export const RECEIVE_USERS = "RECEIVE_USERS"

export const fetchUsers = () => {
	return {
		type: REQUEST_USERS
	}
}

export const receiveUsers = users => {
	return {
		type: RECEIVE_USERS,
		users
	}
}

const shouldFetchUsers = state => {
	const users = state.users
	if (users.users.length < 1) {
		return true
	} else if (users.isFetching) {
		return false
	}
	return false
}

export const initializeUsers = () => {
	return async (dispatch, getState) => {
		if (shouldFetchUsers(getState())) {
			dispatch(fetchUsers())
			const response = await axios.get(baseUrl)
			const users = response.data
			dispatch(receiveUsers(users))
		}
	}
}

const userReducer = (state = { isFetching: false, users: [] }, action) => {
	switch (action.type) {
		case REQUEST_USERS:
			return Object.assign({}, state, { isFetching: true })
		case RECEIVE_USERS:
			return Object.assign({}, state, {
				isFetching: false,
				users: action.users
			})
		default:
			return state
	}
}

export default userReducer
