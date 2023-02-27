import Blog from './Blog';

const BlogList = ({ blogs }) => {
  return (
    <>
      <br />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default BlogList;
