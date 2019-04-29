import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
	<div>
		<div className='titleAuthor'>
			{blog.title} {blog.author}
		</div>
		<div>
			blog has <span className='likes'>{blog.likes}</span> likes
			<button onClick={onClick}>like</button>
		</div>
	</div>
)

export default SimpleBlog