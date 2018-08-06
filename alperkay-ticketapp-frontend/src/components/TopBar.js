
import React from 'react'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import {withRouter} from 'react-router'
import {userId} from '../jwt'
import {connect} from 'react-redux'
import AccountIcon from 'material-ui-icons/AccountBox'

const TopBar = (props) => {
  const { location, history, user } = props

  return (
    <AppBar position="absolute" style={{zIndex:10, backgroundColor: '#545454'}}>
      <Toolbar>
        
        <Typography variant="title" color="inherit" style={{flex: 1}} >
          <Button style={{color:"inherit", fontSize: '1em'}} onClick={() => history.push('/')}>
            TicketRocker <span role="img">🤘</span>
          </Button>
        </Typography>
        
        {
          user &&
          <Button color="inherit"><AccountIcon /> { user.firstName }</Button>
        }

        {
          location.pathname.indexOf('signup') > 0 &&
          <Button color="inherit" onClick={() => history.push('/login')}>Login</Button>
        }
        {
          location.pathname.indexOf('login') > 0 &&
          <Button color="inherit" onClick={() => history.push('/signup')}>Sign up</Button>
        }
        {
          location.pathname.indexOf('events/') > 0 &&
          <Button color="inherit" onClick={() => history.push('/events')}>All Events</Button>
        }
        {
          location.pathname.indexOf('tickets/') > 0 &&
          <Button color="inherit" onClick={() => history.push('/events')}>All Events</Button>
        }

        { user &&
          /$/.test(location.pathname) &&
          <Button color="inherit" onClick={() => history.push('/logout')}>Log out</Button>
        }

        { !user &&
          location.pathname.indexOf('signup') <= 0 &&
          location.pathname.indexOf('login') <= 0 &&
          /$/.test(location.pathname) &&
          <Button color="inherit" onClick={() => history.push('/login')}>Login</Button>
        }
      </Toolbar>
    </AppBar>
  )
}

const mapStateToProps = state => ({
  user: state.currentUser && state.users &&
    state.users[userId(state.currentUser.jwt)]
})

export default withRouter(
  connect(mapStateToProps)(TopBar)
)