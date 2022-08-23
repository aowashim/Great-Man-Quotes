import * as yup from 'yup'

const emailValidTxt = 'Must be valid email'

export const signUpValidation = yup.object({
  name: yup.string().max(30).required('Name is required'),
  email: yup.string().email(emailValidTxt).required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
      'Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
  city: yup
    .string()
    .max(20, 'City must be at most 20 characters')
    .required('City is required'),
})

export const signInValidation = yup.object({
  email: yup.string().email(emailValidTxt).required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
      'Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
    ),
})

export const addQuoteValidation = yup.object({
  title: yup.string().required('Title is required').max(250),
  author: yup.string().required('Author is required').max(30),
})

export const postCommentValidation = yup.object({
  comment: yup.string().required('Comment is required').max(100),
})
