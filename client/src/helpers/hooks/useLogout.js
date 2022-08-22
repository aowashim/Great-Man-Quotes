import { useContext } from 'react'
import UserContext from '../../store/UserContext'

const useLogout = () => {
  const { setUser } = useContext(UserContext)

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('type')

    setUser({ token: '', type: '' })
  }

  return handleLogout
}

export default useLogout
