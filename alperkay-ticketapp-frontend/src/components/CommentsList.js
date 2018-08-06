import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { getComments, createComment } from '../actions/comments'
import { getTickets } from '../actions/tickets'
import CommentForm from './CommentForm'
import {userId} from '../jwt'

class CommentsList extends PureComponent {

  componentWillMount() {
    this.props.getComments()
  }

  createComment = (comment) => {
    this.props.createComment(comment)
    this.props.getTickets()
  }


  render() {
    const comments = this.props.comments
    if (!comments) return null
    const myComments = comments.filter(c=>c.ticket.id===this.props.ticketId)
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Comments:</th>
            </tr>
          </thead>
          <tbody>
        {myComments.map(c=>(<tr key={c.id}>
        <td>{c.author.firstName}:</td>
        <td>{c.comment}</td>
        </tr>
        ))}
        </tbody>
				</table>
        { this.props.currentUser && 
        <div>
        <h4>Leave a comment:</h4>
        <CommentForm 
          onSubmit={this.createComment} 
          userId={this.props.user.id}
          ticketId={this.props.ticketId}
        />
        </div>
        }
        { !this.props.currentUser && <p>Please <Link to="/login">login</Link> or <Link to="/signup">sign up</Link> to comment</p> }
      </div>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    comments: state.comments && Object.values(state.comments),
    currentUser: state.currentUser,
    user: state.currentUser && state.users &&
    state.users[userId(state.currentUser.jwt)]
  }
}

export default connect(mapStateToProps, {getComments, createComment, getTickets})(CommentsList)