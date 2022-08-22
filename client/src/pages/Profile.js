import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Container, makeStyles, Toolbar, Typography } from '@material-ui/core'
import { Navigate, useLocation } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Grid from '@material-ui/core/Grid'
import EmailIcon from '@material-ui/icons/Email'
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import { useContext, useEffect, useState } from 'react'
import UserContext from '../store/UserContext'
import { getEmpProfileApi } from '../helpers/API/employee'
import Loading from '../components/Loading'
import { appCardColor, sesExpMsg } from '../helpers/constant'
import useLogout from '../helpers/hooks/useLogout'

const useStyles = makeStyles(theme => ({
  cont: {
    // height: '80vh',
    marginTop: '5rem',
    marginBottom: '1rem',
    paddingTop: 15,
    paddingBottom: 15,
    boxShadow: '0px 0px 10px 0px rgba(94,94,94,0.64)',
    borderRadius: '20px',
    backgroundColor: appCardColor,
  },
  profileDetails: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}))

toast.configure()
function Profile() {
  const classes = useStyles()
  const { pathname } = useLocation()
  const { user } = useContext(UserContext)
  const [data, setData] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const handleLogout = useLogout()

  useEffect(() => {
    if (user.id) {
      handleGetProfile()
    }
  }, [])

  const notifyError = msg =>
    toast.error(msg, { position: toast.POSITION.TOP_CENTER })

  const notifySuccess = msg =>
    toast.success(msg, { position: toast.POSITION.TOP_CENTER })

  const handleGetProfile = async () => {
    const res = await getEmpProfileApi(user.id)

    if (res.status === 200) {
      setData(res.data.value)
      setIsLoaded(true)
    } else if (res.status === 401) {
      handleLogout()
      notifyError(sesExpMsg)
    } else {
      notifyError('An error occurred, please try again...')
    }
  }

  return user.id ? (
    <>
      <NavBar path={pathname} />
      <Toolbar />
      {isLoaded ? (
        <Container maxWidth='sm' className={classes.cont}>
          <Grid
            container
            spacing={0}
            direction='column'
            alignItems='center'
            justify='center'
          >
            <Grid item xs={6} sm={6} md={6}>
              {/* <Typography variant='title' component='h6'> */}
              <img
                src='./Image/profile.png'
                alt='logo'
                style={{ height: '120px' }}
              />
              {/* </Typography> */}
            </Grid>
            <Grid item>
              <div style={{ display: 'flex', padding: 5 }}>
                <Typography variant='h5' component='div'>
                  <b>{data.empName}</b>
                </Typography>
              </div>
            </Grid>
            <Grid item>
              <div style={{ display: 'flex' }}>
                <Typography variant='subtitle' component='div'>
                  <b>{data.designation}</b>
                </Typography>
              </div>
            </Grid>
            <Grid item>
              <div style={{ display: 'flex', marginTop: 5 }}>
                <Typography variant='subtitle1' component='div'>
                  <b>ID : {data.empId}</b>
                </Typography>
              </div>
            </Grid>
            <Grid item>
              <div style={{ display: 'flex' }}>
                <EmailIcon style={{ marginRight: 7, marginTop: 3 }} />
                <Typography variant='subtitle1' component='div'>
                  <b>{data.email}</b>
                </Typography>
              </div>
            </Grid>

            <Grid item>
              <div
                className='lst'
                style={{ display: 'flex', justifyContent: 'flex-start' }}
              >
                <div
                  style={{
                    backgroundColor: '#17282F',
                    display: 'flex',
                    padding: 10,
                    backgroundColor: '#50C878',
                    borderRadius: '10px',
                    marginRight: 40,
                    marginTop: 10,
                  }}
                >
                  <LocationOnIcon fontSize='small' style={{ marginRight: 4 }} />
                  <Typography>
                    <b>{data.office_Location}</b>
                  </Typography>
                </div>
                <div
                  style={{
                    color: '#17282F',
                    display: 'flex',
                    padding: 15,
                    backgroundColor: '#ffd300',
                    borderRadius: '10px',
                    marginTop: 10,
                  }}
                >
                  <EmojiEventsIcon
                    // fontSize='small'
                    style={{ marginTop: 3, marginRight: 5 }}
                  />
                  <Typography variant='h5'>
                    <b>{data.points_Gained}</b>
                  </Typography>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      ) : (
        <Loading color='primary' size={50} />
      )}
    </>
  ) : (
    <Navigate to='/' />
  )
}

export default Profile
