import React, { useState } from 'react'
const Blog = ({ blog, likeButtonHandler, removeButtonHandler, currentUser }) => {
  const [moreVisible, setMoreVisible] = useState(null)

  const blogStyle = {
    padding: 10,
    border: 'thin solid black',
    marginTop: 10,
  }

  const toggleMoreVisibility = () => {
    setMoreVisible(!moreVisible)
  }

  const moreVisibilityStyle = {
    display: moreVisible ? '' : 'none',
    paddingTop: 10,
  }

  const removeButton = () => {
    return currentUser === blog.user.username
      ? (<button onClick={removeButtonHandler}>Poista</button>)
      : (<></>)
  }

  return (
    <div style={blogStyle}>
      <div onClick={toggleMoreVisibility}>{blog.title} {blog.author}</div>
      <div style={moreVisibilityStyle}>{blog.url}<br />
      {blog.likes} tykkäystä <button onClick={likeButtonHandler} >Tykkää</button><br />
      Lisäsi {blog.user.username}<br />
      {removeButton()}</div>
    </div>
)}

export default Blog