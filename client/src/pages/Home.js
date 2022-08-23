import React, { useContext, useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'
import {
  createTheme,
  responsiveFontSizes,
  MuiThemeProvider,
} from '@material-ui/core'
import { Navigate, useNavigate } from 'react-router-dom'
import UserContext from '../store/UserContext'
import useDocTitle from '../helpers/hooks/useDocTitle'

let theme = createTheme()
theme = responsiveFontSizes(theme)

const useStyles = makeStyles(theme => ({
  '@global': {
    '@keyframes fadeIn': {
      '0%': {
        opacity: 1,
        transform: 'translateY(2rem)',
      },
      '50%': {
        opacity: 1,
        transform: 'translateY(0)',
      },
      '100%': {
        opacity: 1,
        transform: 'translateY(2rem)',
      },
    },
  },
  root: {
    marginTop: '5vh',
    height: '80vh',
  },
  image: {
    // animation: 'fadeIn 2s ease-in-out infinite',
    height: '75vh',
    // backgroundColor: theme.palette.secondary.main,
    backgroundImage: 'url(homePageImage.png)',
    backgroundRepeat: 'no-repeat',
    // backgroundColor:
    //   theme.palette.type === "light"
    //     ? theme.palette.grey[50]
    //     : theme.palette.grey[900],
    backgroundSize: '70%',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  toolbar: {
    minHeight: '70px',
  },

  txtMain: {
    fontWeight: 800,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingTop: '3vw',
    [theme.breakpoints.down('md')]: {
      paddingTop: '5vw',
    },
  },
}))

export default function Home() {
  const classes = useStyles()
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const changeTitle = useDocTitle()

  useEffect(() => {
    changeTitle('Great Man Quotes')
  }, [])

  return !user.token ? (
    <>
      <div className='home-nav'>
        <AppBar className='nav-bar' position='static'>
          <Toolbar className={classes.toolbar}>
            <Typography variant='h6'>Great Man Quotes</Typography>
          </Toolbar>
        </AppBar>
      </div>
      {/* <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <div className="banner">
            <img src="./Image/banner2.png" alt="logo" height={60} />
          </div>
          <div className="ttle">
            <h1>This is the title</h1>
          </div>
        </Grid>
      </Grid> */}

      <Grid container component='main' className={classes.root}>
        <Grid item xs={12} sm={12} md={6} className={classes.image} />
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          style={{ height: '80vh' }}
          elevation={6}
        >
          <Typography
            style={{
              // color: '#8363DA',
              fontWeight: 800,
              textAlign: 'center',
              paddingTop: '4vw',
            }}
            variant='h1'
            // component='h1'
            gutterBottom
          >
            GREAT MAN QUOTES
          </Typography>
          <Typography
            style={{
              fontWeight: 'bold',
              textAlign: 'center',
              fontStyle: 'italic',
            }}
            variant='h6'
            gutterBottom
          >
            Find all your favourite quotes at one place
          </Typography>

          <Grid container justify='center'>
            <Button
              style={{
                // textTransform: 'none',
                // padding: '1rem 3rem',
                // textAlign: 'Center',
                paddingLeft: 40,
                paddingRight: 40,
                marginTop: 25,
              }}
              size='large'
              color='primary'
              variant='contained'
              onClick={() => navigate('/signin')}
            >
              Sign in
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  ) : (
    <Navigate to='/quotes' />
  )
}
