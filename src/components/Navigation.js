import React from "react"
import { Link } from "react-router-dom"
import Login from "../components/Login"

const Navigation = () => {
	return (
		<div>
			<Link to="/">Blogit</Link>
			<Link to="/users">Käyttäjät</Link>
			<Login />
		</div>
	)
}

export default Navigation
