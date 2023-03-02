import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  let container
  const createBlog = jest.fn()

  beforeEach(() => {
    container = render(<BlogForm createBlog={createBlog} />).container
  })

  test('form calls event handler with right details', async () => {
    const formTitle = container.querySelector('input[name="Title"]')
    const formAuthor = container.querySelector('input[name="Author"]')
    const formUrl = container.querySelector('input[name="Url"]')
    const btnSubmit = container.querySelector('button[type="submit"]')

    const newTitle = 'New Exciting Story'
    const newAuthor = 'New Amazing Author'
    const newUrl = 'https://destination_of_story.com/'
    const newObj = { title: newTitle, author: newAuthor, url: newUrl }

    const user = userEvent.setup()
    await user.type(formTitle, newTitle)
    await user.type(formAuthor, newAuthor)
    await user.type(formUrl, newUrl)
    await user.click(btnSubmit)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toStrictEqual(newObj)
  })
})
