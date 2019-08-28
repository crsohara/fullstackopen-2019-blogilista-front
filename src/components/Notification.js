import React, { useEffect } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { clearNotification } from "../reducers/notificationReducer"

const Notification = ({ clearNotification, message, type, timeout }) => {
	useEffect(() => {
		setTimeout(() => {
			clearNotification()
		}, timeout * 1000)
	}, [clearNotification, timeout])

	if (!message) {
		return <></>
	}

	const baseStyle = {
		background: "lightgrey",
		fontSize: "20px",
		borderStyle: "solid",
		borderRadius: "5px",
		padding: "10px",
		marginBottom: "10px"
	}

	let notificationStyle = null
	if (type === "error") {
		notificationStyle = { ...baseStyle, color: "red" }
	} else {
		notificationStyle = { ...baseStyle, color: "green" }
	}

	return <div style={notificationStyle}>{message}</div>
}

const mapStateToProps = state => {
	return {
		message: state.message,
		type: state.type
	}
}

Notification.propTypes = {
	message: PropTypes.string,
	type: PropTypes.string,
	timeout: PropTypes.number,
	clearNotification: PropTypes.func
}

const ConnectedNotification = connect(
	mapStateToProps,
	{ clearNotification }
)(Notification)

export default ConnectedNotification
