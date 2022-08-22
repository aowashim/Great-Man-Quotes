export const appPrimary = '#00838f'
export const appBackground = '#c1d6d3'
export const appCardColor = '#dfe8e8'

export const configAxios = () => {
  const token = localStorage.getItem('token')

  return {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }
}

export const sesExpMsg = 'Your session has expired, please login again...'

export const userInfo = { token: '', type: '' }
