import { useState } from 'react';

const Blog = ({ blog, user, updateBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLikeClick = () => {
    const updatedLikes = { ...blog, likes: blog.likes + 1 };
    updateBlog(updatedLikes);
  };

  const handleRemoveClick = () => {
    const ok = `Remove ${blog.title} by ${blog.author}?`;
    if (window.confirm(ok)) {
      deleteBlog(blog);
    }
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button style={hideWhenVisible} onClick={() => setVisible(true)}>
          view
        </button>
        <button style={showWhenVisible} onClick={() => setVisible(false)}>
          hide
        </button>
        <div style={showWhenVisible}>
          <a href={blog.url}>{blog.url}</a>
          <br />
          likes {blog.likes} <button onClick={handleLikeClick}>like</button>
          <br />
          {blog.user.name}
          <div>
            {blog.user.name === user?.name ? (
              <button onClick={handleRemoveClick}>remove</button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
