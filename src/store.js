import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"

import notificationReducer from "./reducers/notificationReducer"
import blogReducer from "./reducers/blogReducer"
import loginReducer from "./reducers/loginReducer"
import userReducer from "./reducers/userReducer"

const reducer = combineReducers({
	notification: notificationReducer,
	blogs: blogReducer,
	user: loginReducer,
	users: userReducer
})

const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
const user = loggedUserJSON ? JSON.parse(loggedUserJSON) : null
const stateFromStorage = { user: { user } }
const store = createStore(
	reducer,
	stateFromStorage,
	composeWithDevTools(applyMiddleware(thunk))
)

store.subscribe(() => {
	if (store.getState().user.user !== null) {
		window.localStorage.setItem(
			"loggedBlogappUser",
			JSON.stringify(store.getState().user.user)
		)
	}
	if (store.getState().user.user === null) {
		window.localStorage.removeItem("loggedBlogappUser")
	}
})

export default store
