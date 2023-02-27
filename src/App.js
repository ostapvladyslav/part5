import { useState, useEffect, useRef } from 'react';
import BlogList from './components/BlogList';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [info, setInfo] = useState({ message: null });

  const blogFormRef = useRef();

  const notifyWith = (message, type = 'info') => {
    setInfo({
      message,
      type,
    });
    setTimeout(() => {
      setInfo({ message: null });
    }, 5000);
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (loginObject) => {
    try {
      const user = await loginService.login(loginObject);

      blogService.setToken(user.token);
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user));
      setUser(user);
    } catch (exception) {
      notifyWith('wrong username or password', 'error');
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const createBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility();
      const newBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(newBlog));

      notifyWith(`${newBlog.title} added!`);
    } catch (exception) {
      notifyWith('Error adding new blog', 'error');
    }
  };

  return (
    <div>
      <Notification info={info} />
      {!user && (
        <Togglable buttonLabel='log in'>
          <LoginForm handleSubmit={handleLogin} />
        </Togglable>
      )}

      {user && (
        <div>
          <h2>blogs</h2>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
        </div>
      )}

      <div>
        <BlogList blogs={blogs} />
      </div>
    </div>
  );
};

export default App;
