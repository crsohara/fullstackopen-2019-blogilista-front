import React, { useEffect } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Blogs from "./views/Blogs"
import Users from "./views/Users"
import Notification from "./components/Notification"
import User from "./components/User"
import Blog from "./components/Blog"
import Navigation from "./components/Navigation"
import { initializeBlogs } from "./reducers/blogReducer"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import Container from "@material-ui/core/Container"

const App = ({ initializeBlogs }) => {
	useEffect(() => {
		initializeBlogs()
	}, [initializeBlogs])

	return (
		<Router>
			<Navigation />
			<Container>
				<Notification />
				<Route exact path="/" render={() => <Blogs />} />
				<Route exact path="/users" render={() => <Users />} />
				<Route exact path="/users/:id" component={User} />
				<Route exact path="/blogs/:id" component={Blog} />
			</Container>
		</Router>
	)
}

const mapDispatchToProps = {
	initializeBlogs
}

const ConnectedApp = connect(
	null,
	mapDispatchToProps
)(App)

App.propTypes = {
	initializeBlogs: PropTypes.func
}

export default ConnectedApp
