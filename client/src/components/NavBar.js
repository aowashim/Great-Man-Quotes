import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import UserContext from '../store/UserContext'
import useLogout from '../helpers/hooks/useLogout'

export default function NavBar({ path }) {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null)
  const { user } = useContext(UserContext)
  const handleLogout = useLogout()
  const { pathname } = useLocation()

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const goToOffers = () => {
    path = pathname
    handleNavigate('/offers')
  }

  const handleNavigate = curPath => {
    if (path !== curPath) {
      navigate(curPath)
    } else {
      handleClose()
    }
  }

  return (
    <div>
      <AppBar position='fixed'>
        <Toolbar style={{ justifyContent: 'space-between', height: '70px' }}>
          {/* <div
              style={{
                display: 'flex',
                //flexDirection: 'column',
                //padding: 5,
              }}
            > */}
          <Typography variant='h6'>Great Man Quotes</Typography>
          <div className='cor'>
            <IconButton
              onClick={handleClick}
              edge='start'
              color='inherit'
              aria-label='menu'
            >
              <MenuIcon />
              {/* <AccountCircleIcon /> */}
            </IconButton>
          </div>

          <Menu
            // anchorEl={anchorEl}
            // keepMounted
            open={Boolean(anchorEl)}
            // onClose={handleClose}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            //open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleNavigate('/quotes')}>
              Quotes
            </MenuItem>
            {user.type !== 'Admin' ? (
              <MenuItem onClick={() => handleNavigate('/bookmarks')}>
                Bookmarks
              </MenuItem>
            ) : (
              <MenuItem onClick={() => handleNavigate('/add')}>
                Add Quote
              </MenuItem>
            )}
            {user.token ? (
              <MenuItem onClick={() => handleLogout()}>Sign Out</MenuItem>
            ) : (
              <MenuItem onClick={() => handleNavigate('/signin')}>
                Sign In
              </MenuItem>
            )}
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  )
}
