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

export const getOfferDetailsApi = async id => {
  const res = { data: '', status: 200 }

  try {
    const val = await axios.get(
      `${server}/getOfferDetails/${id}`,
      configAxios()
    )

    res.data = val.data
    res.status = val.status
  } catch (error) {
    res.data = error.message
    res.status = error.response.status
  }

  console.log(res)

  return res
}

export const postCommentApi = async (content, user_Id, offer_Id) => {
  const res = { data: '', status: 200 }

  user_Id = parseInt(user_Id)
  offer_Id = parseInt(offer_Id)

  try {
    const val = await axios.post(
      `${server}/comment`,
      {
        content,
        user_Id,
        offer_Id,
      },
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

export const getCommentsApi = async id => {
  const res = { data: '', status: 200 }

  try {
    const val = await axios.get(`${server}/comments/${id}`, configAxios())

    res.data = val.data
    res.status = val.status
  } catch (error) {
    res.data = error.message
    res.status = error.response.status
  }

  return res
}

export const likeOfferApi = async (empId, ofId) => {
  const res = { data: '', status: 200 }

  try {
    const val = await axios.post(
      `${server}/engageOffer?Id=${ofId}&Emp_Id=${empId}`,
      {},
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
