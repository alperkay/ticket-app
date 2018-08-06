import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import { updateTicket } from '../actions/tickets'
import TicketForm from './TicketForm'
import {Link} from 'react-router-dom'
import {userId} from '../jwt'
import CommentsList from './CommentsList'

class TicketDetails extends PureComponent {
  state = {
    edit: false
  }

  toggleEdit = () => {
    this.setState({
      edit: !this.state.edit
    })
  }

  updateTicket = (ticket) => {
    this.props.updateTicket(this.props.match.params.id, ticket)
    this.toggleEdit()
  }

  // THIS IS ACCURATE SINCE IT TAKES THE COMMENTS INTO ACCOUNT
  // AND IT UPDATES LIVE WHEN AUTHOR EDITS THE TICKET PRICE.
  // BUT THE ONE IN THE BACKEND IS NOT ACCURATE.
  // BUT THIS ONE CAN'T UPDATE THE COLORS IN THE LIST SINCE
  // THESE 2 ARE UNRELATED COMPONENTS. I KEEP THEM BOTH SO THAT
  // HOPEFULLY WE CAN DISCUSS. 
  fraudAlgo = () => {

    const ticket = this.props.tickets[this.props.match.params.id]
    let fraudRisk = 0.05 

    const allTickets = Object.values(this.props.tickets)
    if (allTickets.filter(t=>t.seller.id===ticket.seller.id).length===1) fraudRisk+=0.1 //if it's user's only ticket

    //ticket price vs avg ticket price of that event
    const eventTickets = allTickets.filter(t=>t.event.id===ticket.event.id)
    if (eventTickets.length>0) {
      const arrPrices = eventTickets.map(p=>Number(p.price))
      const avgPrice = (arrPrices.reduce((acc, curr) => acc + curr))/(arrPrices.length)

      if (ticket.price<avgPrice) {fraudRisk+=((avgPrice-ticket.price)/avgPrice)} 

      if (ticket.price>avgPrice) {
        if ((ticket.price-avgPrice)/avgPrice>0.1) {fraudRisk-=0.1}
        if ((ticket.price-avgPrice)/avgPrice<0.1) {fraudRisk-=(ticket.price-avgPrice)/avgPrice}
      }
    }
    
    //if added during business hours
    const y = new Date(ticket.creationDate)
    if (y.getHours()>8 && y.getHours()<18) {fraudRisk-=0.1}
    else {fraudRisk+=0.1}

    //if has more than 3 comments
    if (!this.props.comments) return null 
    const allComments = Object.values(this.props.comments)
    const ticketComments = allComments.filter(c=>c.ticket.id===ticket.id)

    if (ticketComments.length>3) fraudRisk+=0.05

    if (fraudRisk>0.95) fraudRisk=0.95 //maximum risk treshold
    if (fraudRisk<0.05) fraudRisk=0.05 //minimum risk treshold
    return Math.round(fraudRisk*100)/100
  }

  render() {
    if (!this.props.tickets) return null 
    const ticket = this.props.tickets[this.props.match.params.id]
    return (
      
      <div>
        {
        this.state.edit &&
        <TicketForm 
          initialValues={ticket} 
          onSubmit={this.updateTicket} 
        />
        }
        <h1 style={{color: '#61746D'}}>Ticket Details</h1>
        {
        !this.state.edit &&
        <div>
        <p><b>Event name: </b>{ ticket.event.name }</p>
        <p><b>Seller name: </b>{ ticket.seller.firstName }</p>
        <p><b>Description: </b>{ ticket.description }</p>
        <p><b>Price: </b>{ ticket.price }</p>
        <p><b>Fraud risk: </b>We calculated that the risk of this ticket being a fraud is { Math.round(ticket.fraudRisk*100) }%</p>
        <img src={ticket.pictureUrl} width="300" height="100"/>
        </div>
        }
        { this.props.currentUser && this.props.user.email===ticket.seller.email &&
        <button onClick={this.toggleEdit}>Edit ticket</button>
        }
        
        { !this.props.currentUser && <p>Please <Link to="/login">login</Link> or <Link to="/signup">sign up</Link> to edit your tickets</p> }
      { this.props.currentUser && this.props.user.email!==ticket.seller.email && <p>Only its owner can edit a ticket!</p> }
      <p></p>
        <CommentsList ticketId={ticket.id}/>
      </div>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    tickets: state.tickets,
    comments: state.comments,
    currentUser: state.currentUser,
    user: state.currentUser && state.users &&
    state.users[userId(state.currentUser.jwt)]
  }
}

export default connect(mapStateToProps, {updateTicket})(TicketDetails)