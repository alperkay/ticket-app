import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {getEvents,createEvent } from '../actions/events'
import {Link} from 'react-router-dom'
import EventForm from './EventForm'
import {getUsers} from '../actions/users'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import compose from 'recompose/compose';


const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
};

class EventsList extends PureComponent {

  componentWillMount() {
    this.props.getEvents()
    this.props.getUsers()
  }

  createEvent = (event) => {
    this.props.createEvent(event)
  }


  render() {
    const {events, classes} = this.props
    if (events === null) return null
   
    // const eventsstring = events.map(e=>e.startDate)

    // const eventsnum = eventsstring.map(e=>e.replace(/-/g,''))

    // const date = new Date().getDate()
    // const month = new Date().getMonth()+1
    // const year = new Date().getFullYear()
    // const today = Number(""+year+"0"+month+date)


    // const upcoming = eventsnum.indexOf(eventsnum.filter(e=>e>today))

    // console.log(upcoming)
    return (
      <div>
      
        <h1 style={{color: '#61746D'}}>All Events</h1>
        { events.length===0 && <p>There is no any events at the moment. Please check back later.</p>}
        <div >
        { events.length>0 &&
        events.map(event => (
        <Card className={classes.card} key={event.id}>
        <CardMedia
          className={classes.media}
          image= {event.pictureUrl}
          title={event.name}
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
          <b>{event.name}</b>
          </Typography>
          <Typography component="p">
          {event.description}
          </Typography>
          <Typography component="p">
          <b>Date:</b> {event.startDate}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
          <Link to={ `/events/${event.id}` }>
            Learn More
            </Link>
          </Button>
        </CardActions>
      </Card>
        ))
        // <table>
        //   <thead>
        //     <tr>
        //       <th>Name</th>
        //       <th>Description</th>
        //       <th>Start Date</th>
        //       <th>End Date</th>
        //       <th>Picture Url</th>
        //     </tr>
        //   </thead>
        //   <tbody>
        //     { events.map(event => (<tr key={event.id}>
        //       <td><Link to={ `/events/${event.id}` }>{event.name}</Link></td>
        //       <td>{event.description}</td>
        //       <td>{event.startDate}</td>
        //       <td>{event.endDate}</td>
        //       <td><img src={event.pictureUrl} width="100" height="100"/></td>
        //     </tr>)) }
        //   </tbody>
				// </table>
        }
        </div>
        { this.props.currentUser && 
        <div>
        <h1>Create a new event</h1>
        <EventForm onSubmit={this.createEvent} />
        </div>
        }
        { !this.props.currentUser && <p>Please <Link to="/login">login</Link> or <Link to="/signup">sign up</Link> to add events</p> }
      </div>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    events: state.events === null ?
      null : Object.values(state.events),
    currentUser: state.currentUser,
    users: state.users === null ? null : state.users,
  }
}

EventsList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles), connect(mapStateToProps, { getEvents, createEvent, getUsers}))(EventsList)
