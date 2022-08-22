import React, { useContext, useRef } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NavBar from '../components/NavBar'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { deleteQuote, getAllQuotes } from '../helpers/API/quote'
import Loading from '../components/Loading'
import { Toolbar } from '@material-ui/core'
import UserContext from '../store/UserContext'
import Pagination from '@material-ui/lab/Pagination'
import { appCardColor, errMsg, sesExpMsg } from '../helpers/constant'
import useLogout from '../helpers/hooks/useLogout'
import { addToBookmark } from '../helpers/API/bookmark'
import QuoteMenu from '../components/QuoteMenu'

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(2),
  },
  formControl: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(1),
    width: '100%',
  },
  card: {
    // boxShadow: "0px 0px 27px 0px rgba(94,94,94,0.64)",
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: appCardColor,
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  iconTextCont: { display: 'flex', flexDirection: 'row' },
}))

const dataPerPage = 6

toast.configure()
export default function Quotes(props) {
  const classes = useStyles()

  const [isLoaded, setIsLoaded] = useState(false)
  const items = useRef([])
  const data = useRef([])
  const numOfPages = useRef(1)
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [refresh, setRefresh] = useState(false)
  const handleLogout = useLogout()

  const { pathname } = useLocation()

  useEffect(() => {
    if (user.token) {
      handleGetQuotes()
    }
  }, [])

  const notifyError = msg =>
    toast.error(msg, { position: toast.POSITION.TOP_CENTER })

  const notifySuccess = msg =>
    toast.success(msg, { position: toast.POSITION.TOP_CENTER })

  const handleChange = (event, value) => {
    setIsLoaded(false)
    setPage(value)
    // data.current = []
    setSlicedData(value)
  }

  // sets the data to be shown at each page
  const setSlicedData = val => {
    const startIdx = (val - 1) * dataPerPage

    const endIdx =
      val === numOfPages.current ? items.current.length : val * dataPerPage

    const curData = items.current.slice(startIdx, endIdx)

    data.current = curData
    setIsLoaded(true)
  }

  const handleGetQuotes = async () => {
    const res = await getAllQuotes()

    if (res.status === 200) {
      data.current = []
      numOfPages.current = Math.ceil(res.data.length / dataPerPage)
      setRefresh(!refresh)
      items.current = res.data
      setPage(1)
      setSlicedData(1)
    } else if (res.status === 401) {
      handleLogout()
      notifyError(sesExpMsg)
    } else {
      notifyError('An error occurred, please try again...')
    }
  }

  const handleViewOfferDetails = id => {
    navigate(`/offer/${id}`)
  }

  const handleEditOffer = id => {
    navigate(`/edit/${id}`)
  }

  const handleAddToBookmark = async qId => {
    const res = await addToBookmark(qId)

    if (res.status === 200) {
      notifySuccess('Added to bookmark successfully')
    } else if (res.status === 401) {
      handleLogout()
      notifyError(sesExpMsg)
    } else {
      notifyError('Qoute already in your bookmark')
    }
  }

  const handleDeleteQuote = async (qId, idx) => {
    const res = await deleteQuote(qId)

    if (res.status === 200) {
      data.current.splice(idx, 1)
      setRefresh(!refresh)
      notifySuccess('Quote deleted successfully')
    } else if (res.status === 401) {
      handleLogout()
      notifyError(sesExpMsg)
    } else {
      notifyError(errMsg)
    }
  }

  return user.token ? (
    <>
      <NavBar path={pathname} />
      <Toolbar />
      {isLoaded ? (
        <div>
          <Container
            component='main'
            className={classes.cardGrid}
            maxWidth='md'
          >
            <Grid container spacing={3}>
              {data.current.map((val, idx) => (
                <Grid item key={val.id} xs={12}>
                  <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <div>
                          <Typography
                            gutterBottom
                            variant='h6'
                            component='h1'
                            style={{
                              // color: '#1e1233',
                              fontStyle: 'italic',
                            }}
                          >
                            "{val.title}"
                          </Typography>

                          <Typography
                            variant='subtitle1'
                            // align='right'
                            style={{
                              fontStyle: 'italic',
                            }}
                          >
                            - {val.author}
                          </Typography>
                        </div>

                        <div style={{ marginLeft: 10 }}>
                          <QuoteMenu
                            id={val.id}
                            idx={idx}
                            userType={user.type}
                            handleAddToBookmark={handleAddToBookmark}
                            handleDeleteQuote={handleDeleteQuote}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <div
              style={{
                marginTop: 30,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Pagination
                count={numOfPages.current}
                page={page}
                variant='outlined'
                shape='rounded'
                color='secondary'
                onChange={handleChange}
              />
            </div>
          </Container>
        </div>
      ) : (
        <Loading color='primary' size={50} />
      )}
    </>
  ) : (
    <Navigate to='/' />
  )
}
