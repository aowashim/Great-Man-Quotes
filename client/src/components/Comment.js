import React from 'react'
import Divider from '@material-ui/core/Divider'
import { Typography } from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person'
import FaceIcon from '@material-ui/icons/Face'

export default function Comment(props) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginBottom: 5,
        }}
      >
        <FaceIcon style={{ marginTop: 1 }} fontSize='small' />
        <Typography
          noWrap
          variant='body2'
          style={{ marginLeft: 5, marginTop: 1, fontWeight: 'bold' }}
        >
          {props.data.emp_Name}
        </Typography>
      </div>
      <Typography style={{ marginLeft: 25 }} variant='body2'>
        {props.data.content}
      </Typography>
      {/* <Divider variant='fullWidth' style={{ marginBottom: 10 }} /> */}
    </div>
  )
}
