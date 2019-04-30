import React from 'react'
import { render, waitForElement } from 'react-testing-library'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
	test('If no user is logged in, blogs are not shown', async () => {
		const component = render(
			<App />
		)
		component.rerender(<App />)

		await waitForElement(
			() => component.getByText('Kirjaudu')
		)

		const usernameInput = component.container.querySelector('input[name="username"]')
		expect(usernameInput).toBeInTheDocument()

		const blogs = component.container.querySelector('#blogs')
		expect(blogs).not.toBeInTheDocument()
	})
})