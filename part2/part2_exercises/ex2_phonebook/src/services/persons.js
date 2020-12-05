import axios from 'axios'

const baseurl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseurl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseurl, newObject)
  return request.then(response => response.data)
}

const remove = id => {
  return axios.delete(`${baseurl}/${id}`)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseurl}/${id}`, newObject)
  return request.then(response => response.data)
}

// eslint-disable-next-line
export default { getAll, create, remove, update }