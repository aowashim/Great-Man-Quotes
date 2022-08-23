import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { useFormik } from 'formik'
import { signInValidation } from '../helpers/yupValidation'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { Toolbar } from '@material-ui/core'
import { signInApi } from '../helpers/API/auth'
import UserContext from '../store/UserContext'
import CenterElement from '../components/CenterElement'
import MyCard from '../components/MyCard'
import useDocTitle from '../helpers/hooks/useDocTitle'

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <a href='https://mui.com/'>Corporate Classifieds</a>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles(theme => ({
  paper: {
    // marginTop: theme.spacing(8),
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
}))

toast.configure()
export default function SignIn() {
  const classes = useStyles()
  const { pathname } = useLocation()
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const [signingIn, setSigningIn] = useState(false)
  const changeTitle = useDocTitle()

  useEffect(() => {
    changeTitle('Sign In')
  }, [])

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: signInValidation,
    onSubmit: values => {
      handleSignIn(values)
    },
  })

  const notifyError = msg =>
    toast.error(msg, { position: toast.POSITION.TOP_CENTER })

  const notifySuccess = msg =>
    toast.success(msg, { position: toast.POSITION.TOP_CENTER })

  // this handles sign in by calling the signin api
  const handleSignIn = async values => {
    setSigningIn(true)
    const res = await signInApi(values)

    if (res.status === 200) {
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('type', res.data.type)

      setUser({ token: res.data.token, type: res.data.type })

      notifySuccess('Successfully Signed In')

      navigate('/quotes')
    } else {
      notifyError('Invalid Username or Password')
    }

    setSigningIn(false)
  }

  return !user.token ? (
    <div>
      <NavBar path={pathname} />
      <Toolbar />
      <Container component='main' maxWidth='xs'>
        <CenterElement>
          <MyCard>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component='h1' variant='h5'>
                Sign in
              </Typography>

              <form className={classes.form} onSubmit={formik.handleSubmit}>
                <TextField
                  variant='outlined'
                  fullWidth
                  margin='normal'
                  id='email'
                  name='email'
                  label='Email'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />

                <TextField
                  variant='outlined'
                  fullWidth
                  margin='normal'
                  id='password'
                  name='password'
                  label='Password'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />

                <Button
                  type='submit'
                  fullWidth
                  disabled={signingIn ? true : false}
                  variant='contained'
                  color='primary'
                  className={classes.submit}
                >
                  {signingIn ? 'Signing In...' : 'Sign In'}
                </Button>

                <Box align='center'>
                  <Link to='/signup'>{"Don't have an account? Sign Up"}</Link>
                </Box>
              </form>
            </div>
            <div style={{ marginTop: 20 }}>
              <Copyright />
            </div>
          </MyCard>
        </CenterElement>
      </Container>
    </div>
  ) : (
    <Navigate to='/quotes' />
  )
}
