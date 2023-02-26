import { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';

import blogService from './services/blogs';
import loginService from './services/login';
import BlogList from './components/BlogList';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [info, setInfo] = useState({ message: null });

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

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);

      setUsername('');
      setPassword('');
    } catch (exception) {
      notifyWith('wrong username or password', 'error');
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const createBlog = async (event) => {
    event.preventDefault();
    try {
      const blogObject = {
        title,
        author,
        url,
      };
      const newBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(newBlog));
      notifyWith(`${newBlog.title} added!`);

      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (exception) {
      notifyWith('Error adding new blog', 'error');
    }
  };

  return (
    <div>
      <Notification info={info} />
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      ) : (
        <>
          <BlogForm
            user={user}
            title={title}
            author={author}
            url={url}
            setTitle={setTitle}
            setAuthor={setAuthor}
            setUrl={setUrl}
            handleLogout={handleLogout}
            createBlog={createBlog}
          />
          <BlogList blogs={blogs} />
        </>
      )}
    </div>
  );
};

export default App;
