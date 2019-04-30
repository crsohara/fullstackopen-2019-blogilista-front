import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
	test('Komponentti renderöi otsikon, tekijän ja tykkäykset', () => {
		const blog = {
			title: 'Blogin otsikko',
			author: 'Blogin tekijä',
			likes: 10,
		}
		const component = render(
			<SimpleBlog blog={blog} />
		)

		const titleAuthor = component.container.querySelector('.titleAuthor')
		expect(titleAuthor).toHaveTextContent('Blogin otsikko')
		expect(titleAuthor).toHaveTextContent('Blogin tekijä')

		const likes = component.container.querySelector('.likes')
		expect(likes).toHaveTextContent(/^10$/)
	})

	test('Tykkäysnapin painaminen kaksi kertaa tekee kaksi event handler -kutsua', async () => {
		const blog = {
			title: 'Blogin otsikko',
			author: 'Blogin tekijä',
			likes: 10,
		}

		const mockHandler = jest.fn()

		const { getByText } = render(
			<SimpleBlog blog={blog} onClick={mockHandler}/>
		)

		const button = getByText('like')
		fireEvent.click(button)
		fireEvent.click(button)

		expect(mockHandler.mock.calls.length).toBe(2)
	})

})