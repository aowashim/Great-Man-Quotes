import React, { useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NavBar from '../components/NavBar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import { Box, Button, Toolbar } from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
// import CalendarMonthIcon from '@material-ui/icons/CalendarMonth'
import Comment from '../components/Comment'
import Divider from '@material-ui/core/Divider'
import WriteComment from '../components/WriteComment'
import {
  getCommentsApi,
  getOfferDetailsApi,
  likeOfferApi,
} from '../helpers/API/quote'
import Loading from '../components/Loading'
import { jsonToNormalDate } from '../helpers/convertDate'
import UserContext from '../store/UserContext'
import Alert from '@material-ui/lab/Alert'
import { appCardColor, sesExpMsg } from '../helpers/constant'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import { refreshPointApi } from '../helpers/API/point'
import LaptopIcon from '@material-ui/icons/Laptop'
import HomeIcon from '@material-ui/icons/Home'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import useLogout from '../helpers/hooks/useLogout'
import { useRef } from 'react'

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://mui.com/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

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
  bnn: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 20,
    marginLeft: 140,
    marginRight: 140,
  },
  cmtsec: {
    marginBottom: 30,
    marginTop: 30,
  },
  card: {
    height: '100%',
    boxShadow: '0px 0px 10px 0px rgba(94,94,94,0.64)',
    display: 'flex',
    border: '1rem',
    padding: '2rem 5rem',
    borderRadius: '10px',
    flexDirection: 'column',
    marginTop: 30,
    marginBottom: 30,
    backgroundColor: appCardColor,
  },
}))

toast.configure()
export default function Offer() {
  const classes = useStyles()
  const { pathname } = useLocation()
  const { id } = useParams()
  const [isLoaded, setIsLoaded] = useState(false)
  const [offerData, setOfferData] = useState('')
  const { user } = useContext(UserContext)
  const [viewComment, setViewComment] = useState(false)
  const [commentData, setCommentData] = useState([])
  const [commentLoaded, setCommentLoaded] = useState(false)
  const handleLogout = useLogout()
  const likeCount = useRef(0)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    if (user.id) {
      handleGetOfferDetails()
    }
  }, [])

  const notifyError = msg =>
    toast.error(msg, { position: toast.POSITION.TOP_CENTER })

  const notifySuccess = msg =>
    toast.success(msg, { position: toast.POSITION.TOP_CENTER })

  const handleGetOfferDetails = async () => {
    const res = await getOfferDetailsApi(id)
    likeCount.current = res.data[0].o.n_Likes

    if (res.status === 200) {
      setOfferData(res.data[0])
      setIsLoaded(true)
    } else if (res.status === 401) {
      handleLogout()
      notifyError(sesExpMsg)
    } else {
      alert('An error occurred, please try again...')
    }
  }

  const handleGetComments = async () => {
    if (viewComment) {
      setViewComment(!viewComment)
      return
    }

    setViewComment(!viewComment)

    const res = await getCommentsApi(offerData.o.id)

    if (res.status === 200) {
      setCommentData(res.data)
      setCommentLoaded(true)
    } else if (res.status === 401) {
      handleLogout()
      notifyError(sesExpMsg)
    } else {
      notifyError('An error occurred, please try again...')
    }
  }

  const handleLike = async () => {
    const res = await likeOfferApi(user.id, offerData.o.id)
    refreshPointApi(offerData.o)

    if (res.status === 200) {
      likeCount.current += 1
      setRefresh(!refresh)
      // notifySuccess('Offer liked successfully')
    } else if (res.status === 401) {
      handleLogout()
      notifyError(sesExpMsg)
    } else {
      notifyError('An error occurred, please try again...')
    }
  }

  return user.id ? (
    <div>
      <NavBar path={pathname} />
      <Toolbar />

      {/* <div className={classes.heroContent}></div> */}

      {isLoaded ? (
        <Container component='main' className={classes.card} maxWidth='md'>
          <Typography align='center' variant='h4' style={{ margin: 20 }}>
            {offerData.o.title}
          </Typography>

          <Typography
            variant='subtitle1'
            align='left'
            style={{ marginBottom: 5 }}
          >
            {/* <u>Posted by</u> : <b>{offerData.empName}</b> */}
            <b>Seller: {offerData.empName}</b>
          </Typography>

          <Typography
            variant='body1'
            align='justify'
            style={{ marginBottom: 5 }}
          >
            {offerData.o.description}
          </Typography>

          <Typography variant='subtitle2' align='left'>
            {/* <u>Category</u> : {offerData.o.offer_Category.name} */}

            <div
              className='cat'
              style={{
                display: 'flex',
                justifyContent: 'space-evenly',
                margin: 30,
              }}
            >
              <div className={classes.circl}>
                <LaptopIcon
                  color={
                    offerData.o.category_Id === 1 ? 'secondary' : 'disabled'
                  }
                />
              </div>
              <div className={classes.circl}>
                <HomeIcon
                  color={
                    offerData.o.category_Id === 2 ? 'secondary' : 'disabled'
                  }
                />
              </div>
              <div className={classes.circl}>
                <MenuBookIcon
                  color={
                    offerData.o.category_Id === 3 ? 'secondary' : 'disabled'
                  }
                />
              </div>
              <div className={classes.circl}>
                <ShoppingBasketIcon
                  color={
                    offerData.o.category_Id === 4 ? 'secondary' : 'disabled'
                  }
                />
              </div>
            </div>
          </Typography>

          <div align='center'>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-evenly',
                // width: '50%',
              }}
            >
              <Alert style={{ marginRight: 10 }} severity='success'>
                Starts On : {jsonToNormalDate(offerData.o.start_Date)}
              </Alert>
              <Button
                variant='outlined'
                size='large'
                color='secondary'
                style={{ marginBottom: 20 }}
                onClick={handleLike}
              >
                <Typography variant='h6' style={{ marginRight: 7 }}>
                  {likeCount.current}
                </Typography>
                <FavoriteIcon fontSize='small' style={{ marginRight: 5 }} />
              </Button>
              <Alert style={{ marginRight: 10 }} severity='error'>
                Ends On : {jsonToNormalDate(offerData.o.end_Date)}
              </Alert>
            </div>
          </div>

          <Divider variant='fullWidth' style={{ marginTop: 40 }} />

          <Container className={classes.cmtsec}>
            <WriteComment eid={user.id} oid={offerData.o.id} />
          </Container>

          <div>
            <Button
              type='submit'
              variant='outlined'
              color='primary'
              onClick={handleGetComments}
            >
              {viewComment ? 'Hide Comments' : 'View Comments'}
            </Button>

            {viewComment && (
              <div style={{ marginLeft: 10, marginTop: 25 }}>
                {commentLoaded ? (
                  commentData.map(item => <Comment key={item.id} data={item} />)
                ) : (
                  <Loading color='primary' size={30} />
                )}
              </div>
            )}
          </div>
        </Container>
      ) : (
        <Loading color='primary' size={50} />
      )}
    </div>
  ) : (
    <Navigate to='/' />
  )
}
