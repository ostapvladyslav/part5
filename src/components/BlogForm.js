const BlogForm = ({
  user,
  title,
  author,
  url,
  setTitle,
  setAuthor,
  setUrl,
  handleLogout,
  createBlog,
}) => {
  return (
    <div>
      <h2>blogs</h2>
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>

      <h2>create new</h2>
      <form onSubmit={createBlog}>
        <div>
          title
          <input
            type='text'
            value={title}
            name='Title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

        <div>
          author
          <input
            type='text'
            value={author}
            name='Author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>

        <div>
          url
          <input
            type='text'
            value={url}
            name='Url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>

        <button type='submit'>create</button>
      </form>

      <br />
    </div>
  );
};

export default BlogForm;
