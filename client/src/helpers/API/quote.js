import axios from 'axios'
import { configAxios } from '../constant'

const server = process.env.REACT_APP_SERVER_QUOTE

export const getAllQuotes = async () => {
  const res = { data: '', status: 200 }

  try {
    const val = await axios.get(`${server}/Quotes`, configAxios())

    res.data = val.data
    res.status = val.status
  } catch (error) {
    res.data = error.message
    res.status = error.response.status
  }

  return res
}

export const deleteQuote = async qId => {
  const res = { data: '', status: 200 }

  try {
    const val = await axios.delete(`${server}/Quotes/${qId}`, configAxios())

    res.data = val.data
    res.status = val.status
  } catch (error) {
    res.data = error.message
    res.status = error.response.status
  }

  return res
}

export const addQuote = async values => {
  const res = { data: '', status: 200 }

  try {
    const val = await axios.post(`${server}/Quotes`, values, configAxios())

    res.data = val.data
    res.status = val.status
  } catch (error) {
    res.data = error.message
    res.status = error.response.status
  }

  return res
}

export const editQuote = async values => {
  const res = { data: '', status: 200 }

  try {
    const val = await axios.put(`${server}/Quotes`, values, configAxios())

    res.data = val.data
    res.status = val.status
  } catch (error) {
    res.data = error.message
    res.status = error.response.status
  }

  return res
}

export const raiseIssue = async values => {
  const res = { data: '', status: 200 }

  try {
    const val = await axios.post(
      `${server}/Quotes/issue`,
      values,
      configAxios()
    )

    res.data = val.data
    res.status = val.status
  } catch (error) {
    res.data = error.message
    res.status = error.response.status
  }

  return res
}
