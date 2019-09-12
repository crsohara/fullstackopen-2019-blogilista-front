import React from "react"
import { Link as RouterLink } from "react-router-dom"
import Typography from "@material-ui/core/Typography"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Link from "@material-ui/core/Link"
import { makeStyles } from "@material-ui/styles"
import Login from "../components/Login"

const useStyles = makeStyles({
	link: {
		color: "white",
		marginRight: 20
	},
	navMenu: {
		flexGrow: 1
	},
	title: {
		fontSize: "1.5rem",
		fontWeight: 700,
		marginRight: 20
	},
	bar: {
		marginBottom: 20
	}
})

const Navigation = () => {
	const classes = useStyles()
	return (
		<AppBar position="static" className={classes.bar}>
			<Toolbar>
				<Typography variant="h1" className={classes.title}>
					Blogilista
				</Typography>
				<Typography className={classes.navMenu}>
					<Link component={RouterLink} to="/" className={classes.link}>
						Blogit
					</Link>
					<Link component={RouterLink} to="/users" className={classes.link}>
						Käyttäjät
					</Link>
				</Typography>
				<Login />
			</Toolbar>
		</AppBar>
	)
}

export default Navigation
