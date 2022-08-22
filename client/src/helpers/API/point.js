import axios from 'axios'
import { configAxios } from '../constant'

const server = process.env.REACT_APP_SERVER_POINT

export const refreshPointApi = async offer => {
  const res = { data: '', status: 200 }

  try {
    const val = await axios.post(
      `${server}/refreshPointsOfEmployee`,
      offer,
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
