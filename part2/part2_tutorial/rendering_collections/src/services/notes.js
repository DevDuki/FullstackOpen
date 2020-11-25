import axios from 'axios'

const baseurl = 'http://localhost:3001/notes'

const getAll = () => {
  const request = axios.get(baseurl)
  const nonExisting = {
    id: 10000,
    content: 'This note is not saved to the server',
    date: 'some date',
    important: true
  }
  return request.then(response => response.data.concat(nonExisting))
}

const create = newObject => {
  const request = axios.post(baseurl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseurl}/${id}`, newObject)
  return request.then(response => response.data)
}

// eslint-disable-next-line
export default { getAll, create, update }