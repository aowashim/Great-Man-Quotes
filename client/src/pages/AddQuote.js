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
import { addQuoteValidation } from '../helpers/yupValidation'
import NavBar from '../components/NavBar'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import UserContext from '../store/UserContext'
import { errMsg, sesExpMsg } from '../helpers/constant'
import useLogout from '../helpers/hooks/useLogout'
import { addQuote } from '../helpers/API/quote'
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
export default function AddQuote(props) {
  const classes = useStyles()
  const { pathname } = useLocation()
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const handleLogout = useLogout()
  const [isPosting, setIsPosting] = useState(false)

  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
    },
    validationSchema: addQuoteValidation,
    onSubmit: (values, { resetForm }) => {
      handleAddQuote(values, resetForm)
    },
  })

  const notifyError = msg =>
    toast.error(msg, { position: toast.POSITION.TOP_CENTER })

  const notifySuccess = msg =>
    toast.success(msg, { position: toast.POSITION.TOP_CENTER })

  const handleAddQuote = async (values, resetForm) => {
    setIsPosting(true)

    const res = await addQuote(values)

    if (res.status === 201) {
      notifySuccess('Quote added successfully')
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
                Add Quote
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
                    error={formik.touched.title && Boolean(formik.errors.title)}
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
