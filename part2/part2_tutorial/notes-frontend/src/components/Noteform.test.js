import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import Noteform from './Noteform'

test('<Noteform /> updates parent state and calls onSubmit', () => {
  const createNote = jest.fn()

  const component = render(
    <Noteform createNote={createNote} />
  )

  const input = component.container.querySelector('input')
  const form = component.container.querySelector('form')

  fireEvent.change(input, {
    target: { value: 'testing of forms could be easier' }
  })
  fireEvent.submit(form)

  expect(createNote.mock.calls).toHaveLength(1)
  expect(createNote.mock.calls[0][0].content).toBe('testing of forms could be easier')
})

