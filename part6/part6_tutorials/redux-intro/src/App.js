import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initialiseNotes } from './reducers/noteReducer'

import Notes from './components/Notes'
import NewNote from './components/NewNote'
import VisibilityFilter from './components/VisibilityFilter'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialiseNotes())
  }, [dispatch])

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App