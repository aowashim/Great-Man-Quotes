import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  Button,
  Container,
  makeStyles,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { useFormik } from 'formik'
import { issueValidation } from '../helpers/yupValidation'
import NavBar from '../components/NavBar'
import { Navigate, useLocation } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import UserContext from '../store/UserContext'
import { errMsg, sesExpMsg } from '../helpers/constant'
import useLogout from '../helpers/hooks/useLogout'
import { addQuote, raiseIssue } from '../helpers/API/quote'
import MyCard from '../components/MyCard'
import CenterElement from '../components/CenterElement'
import useDocTitle from '../helpers/hooks/useDocTitle'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(3),
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
}))

toast.configure()
export default function Issue(props) {
  const classes = useStyles()
  const { pathname } = useLocation()
  const { user } = useContext(UserContext)
  const handleLogout = useLogout()
  const [isPosting, setIsPosting] = useState(false)
  const changeTitle = useDocTitle()

  useEffect(() => {
    changeTitle('Raise Issue')
  }, [])

  const formik = useFormik({
    initialValues: {
      email: '',
      subject: '',
      body: '',
    },
    validationSchema: issueValidation,
    onSubmit: (values, { resetForm }) => {
      handleRaiseIssue(values, resetForm)
    },
  })

  const notifyError = msg =>
    toast.error(msg, { position: toast.POSITION.TOP_CENTER })

  const notifySuccess = msg =>
    toast.success(msg, { position: toast.POSITION.TOP_CENTER })

  const handleRaiseIssue = async (values, resetForm) => {
    setIsPosting(true)

    const res = await raiseIssue(values)

    if (res.status === 200) {
      notifySuccess(
        `Issue raised successfully, you will soon receive a confirmation email`
      )
      resetForm()
    } else if (res.status === 401) {
      handleLogout()
      notifyError(sesExpMsg)
    } else {
      notifyError(errMsg)
    }

    setIsPosting(false)
  }

  return user.type ? (
    <div>
      <NavBar path={pathname} />
      <Toolbar />
      <Container component='main' maxWidth='sm'>
        <CenterElement>
          <MyCard>
            <div className={classes.paper}>
              <Typography component='h5' variant='h5'>
                Raise Issue
              </Typography>

              <div style={{ width: '100%' }}>
                <form className={classes.form} onSubmit={formik.handleSubmit}>
                  <TextField
                    variant='outlined'
                    fullWidth
                    margin='normal'
                    id='email'
                    name='email'
                    label='Your Email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />

                  <TextField
                    variant='outlined'
                    fullWidth
                    margin='normal'
                    id='subject'
                    name='subject'
                    label='Title'
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.subject && Boolean(formik.errors.subject)
                    }
                    helperText={formik.touched.subject && formik.errors.subject}
                  />

                  <TextField
                    variant='outlined'
                    fullWidth
                    margin='normal'
                    id='body'
                    name='body'
                    label='Description'
                    value={formik.values.body}
                    onChange={formik.handleChange}
                    error={formik.touched.body && Boolean(formik.errors.body)}
                    helperText={formik.touched.body && formik.errors.body}
                  />

                  <Button
                    type='submit'
                    fullWidth
                    disabled={isPosting ? true : false}
                    variant='contained'
                    color='primary'
                    className={classes.submit}
                  >
                    {isPosting ? 'Please wait...' : 'Submit'}
                  </Button>
                </form>
              </div>
            </div>
          </MyCard>
        </CenterElement>
      </Container>
    </div>
  ) : (
    <Navigate to='/' />
  )
}
