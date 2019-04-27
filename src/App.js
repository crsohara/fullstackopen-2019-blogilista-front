import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
			const user = await loginService.login({
				username, password,
			})

			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
		} catch (exception) {
		}
  }

  if (user === null) {
    return (
      <div>
        <h2>Kirjaudu sisään</h2>
        <form onSubmit={handleLogin}>
          Käyttäjätunnus <input type="text" value={username} name="username" onChange={handleUsernameChange} /><br />
          Salasana <input type="password" value={password} name="password" onChange={handlePasswordChange} /><br />
          <button type="submit">Kirjaudu</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogit</h2>
      <p>Käyttäjätunnus: {user.name}.</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App