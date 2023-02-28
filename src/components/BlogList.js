import Blog from './Blog';

const BlogList = ({ blogs, user, updateBlog }) => {
  return (
    <>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} updateBlog={updateBlog} />
      ))}
    </>
  );
};

export default BlogList;
