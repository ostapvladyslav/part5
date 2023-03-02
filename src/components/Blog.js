import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, updateBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleLikeClick = () => {
    const updatedLikes = { ...blog, likes: blog.likes + 1 }
    updateBlog(updatedLikes)
  }

  const handleRemoveClick = () => {
    const ok = `Remove ${blog.title} by ${blog.author}?`
    if (window.confirm(ok)) {
      deleteBlog(blog)
    }
  }

  const deleteButton = () => {
    if (user && blog.user.name === user.name) {
      return <button onClick={handleRemoveClick}>remove</button>
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        <span className='blogTitle'>{blog.title}</span>
        <span className='blogAuthor'>{blog.author}</span>
        <button
          style={hideWhenVisible}
          onClick={() => setVisible(true)}
          className='btnView'
        >
          view
        </button>
        <button style={showWhenVisible} onClick={() => setVisible(false)}>
          hide
        </button>
        <div style={showWhenVisible}>
          <a className='blogUrl' href={blog.url}>
            {blog.url}
          </a>
          <br />
          <span className='blogLikes'>likes {blog.likes}</span>
          <button onClick={handleLikeClick} className='btnLike'>
            like
          </button>
          <br />
          {blog.user.name}
          <div>{deleteButton()}</div>
        </div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

export default Blog
