import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createTheme, CssBaseline, ThemeProvider } from '@material-ui/core'
import PostOffer from './pages/PostOffer'
import Profile from './pages/Profile'
import UserContext from './store/UserContext'
import { useEffect, useMemo, useState } from 'react'
import Offer from './pages/Offer'
import Loading from './components/Loading'
import EditOffer from './pages/EditOffer'
import Home from './pages/Home'
import Quotes from './pages/Quotes'

const theme = createTheme({
  palette: {
    // primary: teal,
    primary: {
      main: '#2d8a8a',
    },
    // text: {
    //   secondary: '#262525',
    // },
  },
})

function App() {
  const [user, setUser] = useState({ token: '', type: '' })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    const savedType = localStorage.getItem('type')

    if (savedToken && savedType) {
      setUser({ token: savedToken, type: savedType })
    }

    setIsLoaded(true)
  }, [])

  const userMemo = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user.token]
  )

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {isLoaded ? (
          <BrowserRouter>
            <UserContext.Provider value={userMemo}>
              <Routes>
                <Route index element={<Home />} />
                <Route path='quotes' element={<Quotes />} />
                <Route path='signin' element={<SignIn />} />
                <Route path='signup' element={<SignUp />} />
                <Route path='postoffer' element={<PostOffer />} />
                <Route path='profile' element={<Profile />} />
                <Route path='offer/:id' element={<Offer />} />
                <Route path='edit/:id' element={<EditOffer />} />
              </Routes>
            </UserContext.Provider>
          </BrowserRouter>
        ) : (
          <Loading color='primary' size={50} />
        )}
      </ThemeProvider>
    </>
  )
}

export default App
