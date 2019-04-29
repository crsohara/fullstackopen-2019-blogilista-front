import React from 'react'
import { render } from 'react-testing-library'
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
	})
})