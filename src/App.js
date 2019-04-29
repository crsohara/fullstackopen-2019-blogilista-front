import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
	const [ notificationState, setNotificationState ] = useState({
		message: null,
		type: null
	})

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
      
      setNotificationState({ message: `Käyttäjä ${user.username} kirjautui sisään.`, type: 'note' })
      setTimeout(() => {
        setNotificationState({...notificationState, message: null})
      }, 4000)
    } catch (exception) {
      setNotificationState({ message: `Väärä käyttäjätunnus tai salasana.`, type: 'error' })
      setTimeout(() => {
        setNotificationState({...notificationState, message: null})
      }, 4000)
    }
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    setNotificationState({ message: `Käyttäjä ${user.username} kirjautui ulos.`, type: 'note' })
    setTimeout(() => {
      setNotificationState({...notificationState, message: null})
    window.location.reload()
    }, 2000)
  }

  const newBlogFormRef = React.createRef()

  const newBlogForm = () => {
    return (
      <Togglable buttonLabel='Tallenna uusi blogi' ref={newBlogFormRef}>
        <NewBlogForm
          blogs={blogs}
          setBlogs={setBlogs}
          notificationState={notificationState}
          setNotificationState={setNotificationState}
          visibilityToggleRef={newBlogFormRef} />
      </Togglable>
    )
  }

  if (user === null) {
    return (
      <div>
        <h2>Kirjaudu sisään</h2>

        <Notification state={notificationState}/>

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

      <Notification state={notificationState}/>

      <p>Käyttäjätunnus: {user.name}. <button type="submit" onClick={handleLogout}>Kirjaudu ulos</button></p>

      {newBlogForm()}

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App