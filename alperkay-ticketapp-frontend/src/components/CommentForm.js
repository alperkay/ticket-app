import React, {PureComponent} from 'react'

class CommentForm extends PureComponent {
	state={}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.onSubmit(this.state)
	}


	handleChange = (event) => {
    const {name, value} = event.target

    this.setState({
			[name]: value,
      author: this.props.userId,
      ticket: this.props.ticketId
    })
  }

	render() {
		return (
			<form onSubmit={this.handleSubmit}>

				<div>
					<label htmlFor="comment">Comment</label>
					<input name="comment" id="comment" value={
						this.state.comment || ''
					} onChange={ this.handleChange } />
				</div>

				<button type="submit">Save</button>
			</form>
		)
	}
}

export default CommentForm