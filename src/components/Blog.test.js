import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'Neverwinter',
    author: 'Robert Salvatore',
    url: 'https://cloud.mongodb.com',
    likes: 25,
    user: {
      username: 'test',
      name: 'Vladyslav Ostapchuk',
      id: '63fd55b6f3707d4bbc541480',
    },
  }
  const updateBlog = jest.fn()
  const deleteBlog = jest.fn()
  const user = null
  let container

  beforeEach(() => {
    container = render(
      <Blog
        blog={blog}
        user={user}
        updateBlog={updateBlog}
        deleteBlog={deleteBlog}
      />
    ).container
  })

  test('renders title and author, but not url or likes', () => {
    const blogTitle = container.querySelector('.blogTitle')
    const blogAuthor = container.querySelector('.blogAuthor')
    const blogUrl = container.querySelector('.blogUrl')
    const blogLikes = container.querySelector('.blogLikes')
    expect(blogTitle).toBeVisible()
    expect(blogAuthor).toBeVisible()
    expect(blogUrl).not.toBeVisible()
    expect(blogLikes).not.toBeVisible()
  })

  test('clicking the button reveals url and likes', async () => {
    const userEv = userEvent.setup()
    const button = container.querySelector('.btnView')
    await userEv.click(button)

    const blogUrl = container.querySelector('.blogUrl')
    const blogLikes = container.querySelector('.blogLikes')
    expect(blogUrl).toBeVisible()
    expect(blogLikes).toBeVisible()
  })
})
