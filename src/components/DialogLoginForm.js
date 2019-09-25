import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import Button from "@material-ui/core/Button"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import Dialog from "@material-ui/core/Dialog"
import TextField from "@material-ui/core/TextField"

const DialogLoginForm = ({
	handleLogin,
	onClose,
	open,
	usernameForm,
	passwordForm
}) => {
	function handleClose() {
		onClose()
	}

	return (
		<Dialog
			onClose={handleClose}
			aria-labelledby="loginDialogTitle"
			open={open}
		>
			<DialogTitle id="loginDialogTitle">Kirjaudu sisään</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					margin="dense"
					id="username"
					label="Käyttäjätunnus"
					fullWidth
					{...usernameForm}
				/>
				<TextField
					margin="dense"
					id="password"
					label="Salasana"
					fullWidth
					{...passwordForm}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary" data-cy="cancel">
					Peruuta
				</Button>
				<Button onClick={handleLogin} color="primary" data-cy="login">
					Kirjaudu
				</Button>
			</DialogActions>
		</Dialog>
	)
}

const mapStateToProps = state => {
	return {
		user: state.user
	}
}

const ConnectedDialogLoginForm = connect(mapStateToProps)(DialogLoginForm)

DialogLoginForm.propTypes = {
	handleLogin: PropTypes.func.isRequired,
	usernameForm: PropTypes.object.isRequired,
	passwordForm: PropTypes.object.isRequired,
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired
}

export default ConnectedDialogLoginForm
