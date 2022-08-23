import { IconButton, Menu, MenuItem } from '@material-ui/core'
import { useState } from 'react'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { useNavigate } from 'react-router-dom'

function QuoteMenu(props) {
  const [anchorEl, setAnchorEl] = useState(null)
  const navigate = useNavigate()

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleEditQuote = val => {
    navigate(`/edit/${val.id}`, { state: val })
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
        {props.bmPage ? (
          <MenuItem
            onClick={() => {
              handleClose()
              props.handleRemoveBookmark(props.val.id, props.idx)
            }}
          >
            Remove from bookmark
          </MenuItem>
        ) : props.userType !== 'Admin' ? (
          <div>
            <MenuItem
              onClick={() => {
                handleClose()
                props.handleAddToBookmark(props.val.id)
              }}
            >
              Add to bookmark
            </MenuItem>
          </div>
        ) : (
          <div>
            <MenuItem
              onClick={() => {
                handleClose()
                props.handleDeleteQuote(props.val.id, props.idx)
              }}
            >
              Delete quote
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose()
                handleEditQuote(props.val)
              }}
            >
              Edit qoute
            </MenuItem>
          </div>
        )}
      </Menu>
    </>
  )
}

export default QuoteMenu
