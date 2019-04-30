const blogs = [
	{
		'title': 'Jonnan kakkublogi',
		'author': 'Jonna Paakari',
		'url': 'https://www.kakkublogi.fi/',
		'likes': 13,
		'user': {
			'username': 'mikko',
			'name': 'Mikko Saari',
			'id': '5cbec6758248440332f0b119'
		},
		'id': '5cbec95509ffec05fb19ae1f'
	},
	{
		'title': 'Hannan kakkublogi',
		'author': 'Hanna Paakari',
		'url': 'https://www.kakkublogi.fi/',
		'likes': 12,
		'user': {
			'username': 'mikko',
			'name': 'Mikko Saari',
			'id': '5cbec6758248440332f0b119'
		},
		'id': '5cbf074eae62202b208b461b'
	},
	{
		'title': 'Sepon makkarablogi',
		'author': 'Seppo Hovi',
		'url': 'http://www.makkarat.fi/',
		'likes': 7,
		'user': {
			'username': 'mikko',
			'name': 'Mikko Saari',
			'id': '5cbec6758248440332f0b119'
		},
		'id': '5cc43c6b49dad77ab001af4c'
	},
	{
		'title': 'Sannan sohvablog',
		'author': 'Sanna Ottomaani',
		'url': 'http://sohvat.example.com/',
		'likes': 2,
		'user': {
			'username': 'mikko',
			'name': 'Mikko Saari',
			'id': '5cbec6758248440332f0b119'
		},
		'id': '5cc6915649dad77ab001af4e'
	}
]

const getAll = () => {
	return Promise.resolve(blogs)
}

export default { getAll }