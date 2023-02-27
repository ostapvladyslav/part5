import Blog from './Blog';

const BlogList = ({ blogs, user }) => {
  return (
    <>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </>
  );
};

export default BlogList;
