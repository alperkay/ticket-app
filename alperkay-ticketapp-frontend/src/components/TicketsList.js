import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import TicketForm from './TicketForm'
import {createTicket, getTickets } from '../actions/tickets'
import {userId} from '../jwt'

class TicketsList extends PureComponent {

  componentWillMount() {
    this.props.getTickets()
  }

  createTicket = (ticket) => {
    this.props.createTicket(ticket)

  }

  fraudColor = (fraudRisk) => {
    if (fraudRisk>0.75) return "red"
    if (fraudRisk<=0.75 && fraudRisk>0.25) return "#FDE541"
    if (fraudRisk<=0.25) return "green"
  }

  render() {
    if (!this.props.events) return null
    const event = this.props.events[this.props.match.params.id]
    if (!this.props.tickets) return null
    const allTickets = this.props.tickets
    const arrTickets = Object.values(allTickets)
    const thisTickets = arrTickets.filter(ticket=>ticket.event.id===event.id)
    return (
      <div>
        <h1 style={{color: '#61746D'}}>All Tickets for {event.name.toUpperCase()}</h1>
        <p><b>Event Info: </b>{event.description}</p>
        <p><b>Event Time: </b>{event.startDate}</p>
        <h4>List of available tickets:</h4>
        { thisTickets.length===0 && 
          <div>
            <p>There are no any available tickets for this event at the moment.</p>
            <p>If you're logged in, you can create a ticket.</p>
            <p>If you want to buy a ticket, please check back later. </p>
          </div>
        }
        { thisTickets.length>0 &&
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
           
            { thisTickets.map(ticket => (<tr key={ticket.id}>
              <td style= {{color: this.fraudColor(ticket.fraudRisk)}}><Link to={ `/tickets/${ticket.id}` }>{ticket.description}</Link></td>
              <td style= {{color: this.fraudColor(ticket.fraudRisk)}}>{ticket.price}</td>
            </tr>)) }
          </tbody>
				</table>
        }
        { this.props.currentUser && 
        <div>
        <h1>Create a new ticket</h1>
        <TicketForm 
          onSubmit={this.createTicket} 
          eventId={this.props.events[this.props.match.params.id]}
          userId={this.props.user.id}
        />
        </div>
        }
        { !this.props.currentUser && <p>Please <Link to="/login">login</Link> or <Link to="/signup">sign up</Link> to add tickets</p> }
      </div>
    )
  }
}

const mapStateToProps = function (state, props) {
  return {
    events: state.events,
    tickets: state.tickets,
    currentUser: state.currentUser,
    user: state.currentUser && state.users &&
    state.users[userId(state.currentUser.jwt)]
  }
}

export default connect(mapStateToProps, {createTicket, getTickets})(TicketsList)