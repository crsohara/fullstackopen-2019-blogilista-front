import React, { useEffect } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Blogs from "./views/Blogs"
import Users from "./views/Users"
import Notification from "./components/Notification"
import Login from "./components/Login"
import User from "./components/User"
import Blog from "./components/Blog"
import { initializeBlogs } from "./reducers/blogReducer"
import { userFromStorage } from "./reducers/loginReducer"
import { connect } from "react-redux"
import PropTypes from "prop-types"

const App = ({ initializeBlogs, userFromStorage }) => {
	useEffect(() => {
		initializeBlogs()
	}, [initializeBlogs])

	useEffect(() => {
		userFromStorage()
	}, [userFromStorage])

	return (
		<div>
			<h1>Blogilista</h1>
			<Notification />
			<Login />
			<Router>
				<Route exact path="/" render={() => <Blogs />} />
				<Route exact path="/users" render={() => <Users />} />
				<Route exact path="/users/:id" component={User} />
				<Route exact path="/blogs/:id" component={Blog} />
			</Router>
		</div>
	)
}

const mapDispatchToProps = {
	initializeBlogs,
	userFromStorage
}

const ConnectedApp = connect(
	null,
	mapDispatchToProps
)(App)

App.propTypes = {
	initializeBlogs: PropTypes.func,
	userFromStorage: PropTypes.func
}

export default ConnectedApp
