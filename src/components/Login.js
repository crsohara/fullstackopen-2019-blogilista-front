import React, { useEffect } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/styles"
import { createNotification } from "../reducers/notificationReducer"
import { logIn, logOut } from "../reducers/loginReducer"
import DialogLoginForm from "../components/DialogLoginForm"
import { useField } from "../hooks"

const useStyles = makeStyles({
	username: {
		textTransform: "uppercase",
		fontSize: "0.875rem",
		fontWeight: 500,
		letterSpacing: "0.02857em",
		paddingRight: 20
	}
})

const Login = ({ user, createNotification, logOut, logIn }) => {
	const classes = useStyles()

	const username = useField({ type: "text", name: "username" })
	const password = useField({ type: "password", name: "password" })

	useEffect(() => {
		if (user.user) {
			createNotification({
				message: `Käyttäjä ${user.user.username} kirjautui sisään.`,
				type: "note",
				timeout: 4
			})
		}
		if (user.error) {
			createNotification({
				message: `Ongelma: ${user.error}.`,
				type: "error",
				timeout: 4
			})
		}
	}, [user, createNotification])

	/* eslint-disable no-unused-vars */
	let reset, usernameForm, passwordForm
	;({ reset, ...usernameForm } = username)
	;({ reset, ...passwordForm } = password)
	/* eslint-enable no-unused-vars */

	const handleLogin = async event => {
		event.preventDefault()
		logIn({
			username: username.value,
			password: password.value
		})
		username.reset()
		password.reset()
		handleClose()
	}

	const handleLogout = () => {
		logOut()
		createNotification({
			message: `Käyttäjä ${user.user.username} kirjautui ulos.`,
			type: "note",
			timeout: 4
		})
	}

	const [open, setOpen] = React.useState(false)

	function handleClickOpen() {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	if (user.user === null) {
		return (
			<>
				<Button variant="outlined" color="inherit" onClick={handleClickOpen}>
					Kirjaudu sisään
				</Button>
				<DialogLoginForm
					open={open}
					onClose={handleClose}
					handleLogin={handleLogin}
					usernameForm={usernameForm}
					passwordForm={passwordForm}
				/>
			</>
		)
	}

	return (
		<Typography>
			<span className={classes.username}>{user.user.name}</span>
			<Button color="inherit" type="submit" onClick={handleLogout}>
				Kirjaudu ulos
			</Button>
		</Typography>
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
	createNotification: PropTypes.func.isRequired,
	logIn: PropTypes.func.isRequired,
	logOut: PropTypes.func.isRequired,
	user: PropTypes.object
}

export default ConnectedLogin
