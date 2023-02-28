import Blog from './Blog';

const BlogList = ({ blogs, user, updateBlog }) => {
  return (
    <>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} updateBlog={updateBlog} />
        ))}
    </>
  );
};

export default BlogList;
