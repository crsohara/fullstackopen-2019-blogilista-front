import React from "react"
import { render, waitForElement } from "react-testing-library"
jest.mock("./services/blogs")
import App from "./App"
import { Provider } from "react-redux"
import store from "./store"

describe("<App />", () => {
	test("If no user is logged in, blogs are not shown", async () => {
		const component = render(
			<Provider store={store}>
				<App />
			</Provider>
		)
		component.rerender(
			<Provider store={store}>
				<App />
			</Provider>
		)

		await waitForElement(() => component.getByText("Kirjaudu"))

		const usernameInput = component.container.querySelector(
			'input[name="username"]'
		)
		expect(usernameInput).toBeInTheDocument()

		const blogs = component.container.querySelector("#blogs")
		expect(blogs).not.toBeInTheDocument()
	})

	test("If user is logged in, 4 blogs render", async () => {
		const user = {
			username: "testuser",
			token: "1234567890",
			name: "Test User"
		}

		localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
		const component = render(
			<Provider store={store}>
				<App />
			</Provider>
		)
		component.rerender(
			<Provider store={store}>
				<App />
			</Provider>
		)

		await waitForElement(() => component.getByText("Tallenna uusi blogi"))

		const blogs = component.container.querySelector("#blogs")
		expect(blogs).toBeInTheDocument()

		const allBlogs = component.container.querySelectorAll(".otsikko")
		expect(allBlogs.length).toBe(4)
	})
})
