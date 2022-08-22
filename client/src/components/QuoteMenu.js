import { IconButton, Menu, MenuItem } from '@material-ui/core'
import { useState } from 'react'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

function QuoteMenu(props) {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id='quotes-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {props.userType !== 'Admin' ? (
          <div>
            <MenuItem
              onClick={() => {
                handleClose()
                props.handleAddToBookmark(props.id)
              }}
            >
              Add to bookmark
            </MenuItem>
          </div>
        ) : (
          <div>
            <MenuItem onClick={handleClose}>Delete quote</MenuItem>
            <MenuItem onClick={handleClose}>Edit qoute</MenuItem>
          </div>
        )}
      </Menu>
    </>
  )
}

export default QuoteMenu
