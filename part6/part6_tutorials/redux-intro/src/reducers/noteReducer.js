import noteService from '../services/notes'

const initialState = []

const noteReducer = (state = initialState, action) => {
  console.log('ACTION', action)
  switch (action.type) {
    case 'NEW_NOTE':
      return [...state, action.data]

    case 'TOGGLE_IMPORTANCE':      
      const id = action.data.id
      const noteToChange = state.find((note) => note.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      }
      return state.map((note) => note.id !== id ? note : changedNote)

    case 'INIT_NOTES':
      return action.data

    default:
      return state
  }
}

export const createNote = (content) => {
  return async (dispatch) => {
    const newNote = await noteService.createNew(content)
    dispatch({
      type: 'NEW_NOTE',
      data: newNote
    })
  }
}

export const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: { id }
  }
}

export const initialiseNotes = () => {
  return async (dispatch) => {
    const notes = await noteService.getAll()
    dispatch({
      type: 'INIT_NOTES',
      data: notes,
    })
  }
}

export default noteReducer