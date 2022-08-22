import {
  Avatar,
  Button,
  Container,
  makeStyles,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useFormik } from 'formik'
import { signUpValidation } from '../helpers/yupValidation'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import NavBar from '../components/NavBar'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { signUpApi } from '../helpers/API/auth'
import { useContext, useState } from 'react'
import MyCard from '../components/MyCard'
import CenterElement from '../components/CenterElement'
import UserContext from '../store/UserContext'

const useStyles = makeStyles(theme => ({
  paper: {
    // marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}))

toast.configure()
export default function SignUp(props) {
  const classes = useStyles()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [isSigningUp, setIsSigningUp] = useState(false)
  const { user } = useContext(UserContext)

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      city: '',
    },
    validationSchema: signUpValidation,
    onSubmit: values => {
      handleSignUp(values)
    },
  })

  // this handles sign up by calling the signup api
  const handleSignUp = async values => {
    setIsSigningUp(true)
    const res = await signUpApi(values)

    if (res.status === 200) {
      notifySuccess('Sign Up successfull, please sign in to continue...')
      navigate('/signin')
    } else {
      notifyError('An error occurred, please try again...')
    }

    setIsSigningUp(false)
  }

  const notifyError = msg =>
    toast.error(msg, { position: toast.POSITION.TOP_CENTER })

  const notifySuccess = msg =>
    toast.success(msg, { position: toast.POSITION.TOP_CENTER })

  return !user.token ? (
    <div>
      <NavBar path={pathname} />
      <Toolbar />
      <Container component='main' maxWidth='sm'>
        <CenterElement>
          <MyCard>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component='h1' variant='h5'>
                Sign Up
              </Typography>

              <div style={{ width: '100%' }}>
                <form className={classes.form} onSubmit={formik.handleSubmit}>
                  <TextField
                    variant='outlined'
                    fullWidth
                    margin='normal'
                    id='name'
                    name='name'
                    label='Name'
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />

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
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />

                  <TextField
                    variant='outlined'
                    fullWidth
                    margin='normal'
                    id='confirmPassword'
                    name='confirmPassword'
                    label='Confirm Password'
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.confirmPassword &&
                      Boolean(formik.errors.confirmPassword)
                    }
                    helperText={
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                    }
                  />

                  <TextField
                    variant='outlined'
                    fullWidth
                    margin='normal'
                    id='city'
                    name='city'
                    label='City'
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    error={formik.touched.city && Boolean(formik.errors.city)}
                    helperText={formik.touched.city && formik.errors.city}
                  />

                  <Button
                    type='submit'
                    fullWidth
                    disabled={isSigningUp ? true : false}
                    variant='contained'
                    color='primary'
                    className={classes.submit}
                  >
                    {isSigningUp ? 'Signing Up...' : 'Sign Up'}
                  </Button>
                </form>
              </div>
            </div>
          </MyCard>
        </CenterElement>
      </Container>
    </div>
  ) : (
    <Navigate to='/quotes' />
  )
}
