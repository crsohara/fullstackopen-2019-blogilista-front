import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { createNotification } from "../reducers/notificationReducer"
import { logOut, logIn } from "../reducers/loginReducer"
import { useField } from "../hooks"

const Login = ({ user, createNotification, logOut, logIn }) => {
	const username = useField({ type: "text", name: "username" })
	const password = useField({ type: "password", name: "password" })

	/* eslint-disable no-unused-vars */
	let reset, usernameForm, passwordForm
	;({ reset, ...usernameForm } = username)
	;({ reset, ...passwordForm } = password)
	/* eslint-enable no-unused-vars */

	const handleLogin = async event => {
		event.preventDefault()
		try {
			logIn({
				username: username.value,
				password: password.value
			})
			createNotification({
				message: `Käyttäjä ${username.value} kirjautui sisään.`,
				type: "note",
				timeout: 4
			})
			username.reset()
			password.reset()
		} catch (exception) {
			createNotification({
				message: `Väärä käyttäjätunnus tai salasana. ${exception}`,
				type: "error",
				timeout: 4
			})
		}
	}

	const handleLogout = () => {
		logOut()
		createNotification({
			message: `Käyttäjä ${user.username} kirjautui ulos.`,
			type: "note",
			timeout: 4
		})
	}
	if (user === null) {
		return (
			<form onSubmit={handleLogin}>
				Käyttäjätunnus <input {...usernameForm} />
				<br />
				Salasana <input {...passwordForm} />
				<br />
				<button type="submit">Kirjaudu</button>
			</form>
		)
	}

	return (
		<p>
			Käyttäjätunnus: {user.name}.{" "}
			<button type="submit" onClick={handleLogout}>
				Kirjaudu ulos
			</button>
		</p>
	)
}

const mapDispatchToProps = {
	createNotification,
	logIn,
	logOut
}

const mapStateToProps = state => {
	return {
		user: state.user
	}
}

const ConnectedLogin = connect(
	mapStateToProps,
	mapDispatchToProps
)(Login)

Login.propTypes = {
	createNotification: PropTypes.func,
	logIn: PropTypes.func,
	logOut: PropTypes.func,
	user: PropTypes.object
}

export default ConnectedLogin
