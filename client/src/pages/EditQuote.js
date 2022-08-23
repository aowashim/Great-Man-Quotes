import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useContext, useState } from 'react'
import { editQuote } from '../helpers/API/quote'
import UserContext from '../store/UserContext'
import {
  Button,
  Container,
  makeStyles,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { useFormik } from 'formik'
import { addQuoteValidation } from '../helpers/yupValidation'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import NavBar from '../components/NavBar'
import { errMsg, sesExpMsg } from '../helpers/constant'
import useLogout from '../helpers/hooks/useLogout'
import MyCard from '../components/MyCard'
import CenterElement from '../components/CenterElement'

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
function EditQuote() {
  const classes = useStyles()
  const { pathname } = useLocation()
  const [isLoaded, setIsLoaded] = useState(true)
  const { user } = useContext(UserContext)
  const handleLogout = useLogout()
  const [isEditing, setIsEditing] = useState(false)
  const { state } = useLocation()

  const formik = useFormik({
    initialValues: {
      title: state.title,
      author: state.author,
    },
    validationSchema: addQuoteValidation,
    onSubmit: values => {
      handleEditQuote(values)
    },
  })

  const notifyError = msg =>
    toast.error(msg, { position: toast.POSITION.TOP_CENTER })

  const notifySuccess = msg =>
    toast.success(msg, { position: toast.POSITION.TOP_CENTER })

  const handleEditQuote = async values => {
    setIsEditing(true)

    const res = await editQuote({ ...values, id: state.id })

    if (res.status === 200) {
      notifySuccess('Quote edited successfully')
    } else if (res.status === 401) {
      handleLogout()
      notifyError(sesExpMsg)
    } else {
      notifyError(errMsg)
    }

    setIsEditing(false)
  }

  return user.token ? (
    <div>
      <NavBar path={pathname} />
      <Toolbar />

      {isLoaded ? (
        <Container component='main' maxWidth='sm'>
          <CenterElement>
            <MyCard>
              <div className={classes.paper}>
                <Typography component='h5' variant='h5'>
                  Edit Quote
                </Typography>

                <div style={{ width: '100%' }}>
                  <form className={classes.form} onSubmit={formik.handleSubmit}>
                    <TextField
                      variant='outlined'
                      fullWidth
                      margin='normal'
                      id='title'
                      name='title'
                      label='Title'
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.title && Boolean(formik.errors.title)
                      }
                      helperText={formik.touched.title && formik.errors.title}
                    />

                    <TextField
                      variant='outlined'
                      fullWidth
                      margin='normal'
                      id='author'
                      name='author'
                      label='Author'
                      value={formik.values.author}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.author && Boolean(formik.errors.author)
                      }
                      helperText={formik.touched.author && formik.errors.author}
                    />

                    <Button
                      type='submit'
                      fullWidth
                      disabled={isEditing ? true : false}
                      variant='contained'
                      color='primary'
                      className={classes.submit}
                    >
                      {isEditing ? 'Please wait...' : 'Submit'}
                    </Button>
                  </form>
                </div>
              </div>
            </MyCard>
          </CenterElement>
        </Container>
      ) : (
        <Loading color='primary' size={50} />
      )}
    </div>
  ) : (
    <Navigate to='/' />
  )
}

export default EditQuote
