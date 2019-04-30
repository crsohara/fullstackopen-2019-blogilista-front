import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import Blog from './Blog'

describe('<Blog />', () => {
	test('näyttää blogista vain otsikon ja kirjoittajan', () => {
		const blog = {
			title: 'Otsikko',
			author: 'Tekijä',
			likes: 10,
			url: 'http://www.example.com/',
			user: {
				username: 'Lisääjä',
			},
		}

		const emptyFunction = function() { return undefined }
		const component = render(
			<Blog blog={blog} likeButtonHandler={emptyFunction} removeButtonHandler={emptyFunction} currentUser={'Käyttäjätunnus'} />
		)

		const titleAuthor = component.container.querySelector('.otsikko')
		expect(titleAuthor).toHaveTextContent('Otsikko')
		expect(titleAuthor).toHaveTextContent('Tekijä')

		const moreInfo = component.container.querySelector('.lisätiedot')
		expect(moreInfo).toHaveStyle('display: none')
	})

	test('otsikon klikkaaminen avaa lisätiedot näkyville', async () => {
		const blog = {
			title: 'Otsikko',
			author: 'Tekijä',
			likes: 10,
			url: 'http://www.example.com/',
			user: {
				username: 'Lisääjä',
			},
		}

		const emptyFunction = function() { return undefined }
		const component = render(
			<Blog blog={blog} likeButtonHandler={emptyFunction} removeButtonHandler={emptyFunction} currentUser={'Käyttäjätunnus'} />
		)

		const blogTitle = component.container.querySelector('.otsikko')
		fireEvent.click(blogTitle)

		const moreInfo = component.container.querySelector('.lisätiedot')
		expect(moreInfo).not.toHaveStyle('display: none')
	})

})