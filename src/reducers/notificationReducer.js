export const createNotification = ({ message, type, timeout }) => {
	return {
		type: "NEW_NOTIFICATION",
		data: {
			message,
			type,
			timeout
		}
	}
}

export const clearNotification = () => {
	return {
		type: "CLEAR_NOTIFICATION"
	}
}

const notificationReducer = (
	state = [{ message: null, type: null, timeout: 0 }],
	action
) => {
	switch (action.type) {
		case "NEW_NOTIFICATION":
			return action.data
		case "CLEAR_NOTIFICATION":
			return { message: null, type: null, timeout: 0 }
		default:
			return state
	}
}

export default notificationReducer
