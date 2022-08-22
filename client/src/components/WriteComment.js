import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { useFormik } from 'formik'
import { postCommentValidation } from '../helpers/yupValidation'
import { postCommentApi } from '../helpers/API/quote'
import useLogout from '../helpers/hooks/useLogout'
import { sesExpMsg } from '../helpers/constant'

toast.configure()
export default function WriteComment(props) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleLogout = useLogout()

  const formik = useFormik({
    initialValues: {
      comment: '',
    },
    validationSchema: postCommentValidation,
    onSubmit: (values, { resetForm }) => {
      handlePostComment(values.comment, resetForm)
    },
  })

  const notifyError = msg =>
    toast.error(msg, { position: toast.POSITION.TOP_CENTER })

  const notifySuccess = msg =>
    toast.success(msg, { position: toast.POSITION.TOP_CENTER })

  const handlePostComment = async (val, resetForm) => {
    setIsSubmitting(true)
    const res = await postCommentApi(val, props.eid, props.oid)

    if (res.status === 200) {
      resetForm()
      notifySuccess('Comment posted successfully...')
    } else if (res.status === 401) {
      handleLogout()
      notifyError(sesExpMsg)
    } else {
      notifyError('An error occurred, please try again...')
    }

    setIsSubmitting(false)
  }

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          variant='outlined'
          fullWidth
          margin='normal'
          id='comment'
          name='comment'
          label='Write Comment'
          value={formik.values.comment}
          onChange={formik.handleChange}
          error={formik.touched.comment && Boolean(formik.errors.comment)}
          helperText={formik.touched.comment && formik.errors.comment}
        />

        <Button
          style={{ margin: 8 }}
          type='submit'
          disabled={isSubmitting ? true : false}
          variant='contained'
          color='primary'
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </div>
  )
}
