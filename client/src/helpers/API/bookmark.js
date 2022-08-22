import axios from 'axios'
import { configAxios } from '../constant'

const server = process.env.REACT_APP_SERVER_QUOTE

export const addToBookmark = async qId => {
  const res = { data: '', status: 200 }

  try {
    const val = await axios.post(`${server}/Bookmark/${qId}`, {}, configAxios())

    res.data = val.data
    res.status = val.status
  } catch (error) {
    res.data = error.message
    res.status = error.response.status
  }

  return res
}
