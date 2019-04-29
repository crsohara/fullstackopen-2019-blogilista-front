import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlogForm from './components/NewBlogForm';

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

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
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

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
		} catch (exception) {
		}
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload()
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
      <p>Käyttäjätunnus: {user.name}. <button type="submit" onClick={handleLogout}>Kirjaudu ulos</button></p>

      <NewBlogForm
        blogs={blogs}
        setBlogs={setBlogs} />

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App