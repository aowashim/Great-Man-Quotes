import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useContext, useEffect, useRef, useState } from 'react'
import { editOfferApi, getOfferDetailsApi } from '../helpers/API/quote'
import UserContext from '../store/UserContext'
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { useFormik } from 'formik'
import { postOfferValidation } from '../helpers/yupValidation'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { jsonToNormalDate } from '../helpers/convertDate'
import Loading from '../components/Loading'
import NavBar from '../components/NavBar'
import { sesExpMsg } from '../helpers/constant'
import useLogout from '../helpers/hooks/useLogout'

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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  formControl: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(1),
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

toast.configure()
function EditOffer() {
  const classes = useStyles()
  const { id } = useParams()
  const { pathname } = useLocation()
  const [refresh, setRefresh] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [category, setCategory] = useState(1)
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const handleLogout = useLogout()
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (user.id) {
      handleGetOfferDetails()
    }
  }, [])

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      startDate: '',
      endDate: '',
    },
    validationSchema: postOfferValidation,
    onSubmit: values => {
      handleEditOffer(values)
    },
  })

  const notifyError = msg =>
    toast.error(msg, { position: toast.POSITION.TOP_CENTER })

  const notifySuccess = msg =>
    toast.success(msg, { position: toast.POSITION.TOP_CENTER })

  const handleChangeCatg = event => {
    setCategory(event.target.value)
  }

  const handleEditOffer = async values => {
    setIsEditing(true)
    const res = await editOfferApi(values, category, id)

    if (res.status === 200) {
      notifySuccess('Offer edited successfully, Opening offer details page...')
      navigate(`/offer/${res.data}`)
    } else if (res.status === 401) {
      handleLogout()
      notifyError(sesExpMsg)
    } else {
      notifyError('An error occurred, please try again...')
    }

    setIsEditing(false)
  }

  const handleGetOfferDetails = async () => {
    const res = await getOfferDetailsApi(id)

    if (res.status === 200) {
      const data = res.data[0].o

      if (data.emp_Id == user.id) {
        formik.initialValues.title = data.title
        formik.initialValues.description = data.description
        formik.initialValues.startDate = jsonToNormalDate(data.start_Date)
        formik.initialValues.endDate = jsonToNormalDate(data.end_Date)

        setCategory(data.category_Id)
        setIsLoaded(true)
      } else {
        notifyError('You can edit your offers only...')
        navigate('/offers')
      }
    } else if (res.status === 401) {
      handleLogout()
      notifyError(sesExpMsg)
    } else {
      notifyError('An error occurred, please try again...')
      navigate('/offers')
    }
  }

  return user.id ? (
    <div>
      <NavBar path={pathname} />
      <Toolbar />

      {isLoaded ? (
        <Container component='main' maxWidth='sm'>
          <div className={classes.paper}>
            <Typography component='h5' variant='h5'>
              Edit your offer
            </Typography>

            <div style={{ width: '100%' }}>
              <FormControl className={classes.formControl}>
                <InputLabel shrink id='category-select-label'>
                  Category
                </InputLabel>
                <Select
                  labelId='category-select-label'
                  id='category-select'
                  value={category}
                  onChange={handleChangeCatg}
                  className={classes.selectEmpty}
                >
                  <MenuItem value={1}>Electronics</MenuItem>
                  <MenuItem value={2}>Home Goods</MenuItem>
                  <MenuItem value={3}>Education</MenuItem>
                  <MenuItem value={4}>Clothing</MenuItem>
                </Select>
              </FormControl>

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
                  id='description'
                  name='description'
                  label='Description'
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                />

                <TextField
                  variant='outlined'
                  fullWidth
                  margin='normal'
                  id='startDate'
                  name='startDate'
                  label='Start Date'
                  value={formik.values.startDate}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.startDate && Boolean(formik.errors.startDate)
                  }
                  helperText={
                    formik.touched.startDate && formik.errors.startDate
                  }
                />

                <TextField
                  variant='outlined'
                  fullWidth
                  margin='normal'
                  id='endDate'
                  name='endDate'
                  label='End Date'
                  value={formik.values.endDate}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.endDate && Boolean(formik.errors.endDate)
                  }
                  helperText={formik.touched.endDate && formik.errors.endDate}
                />

                <Button
                  type='submit'
                  fullWidth
                  disabled={isEditing ? true : false}
                  variant='contained'
                  color='primary'
                  className={classes.submit}
                >
                  {isEditing ? 'Editing...' : 'Edit Offer'}
                </Button>
              </form>
            </div>
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

export default EditOffer
