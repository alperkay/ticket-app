import React, {PureComponent} from 'react'

class TicketForm extends PureComponent {
	state={}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.onSubmit(this.state)
	}


	handleChange = (event) => {
    const {name, value} = event.target

    this.setState({
			[name]: value,
			event: this.props.eventId,
			seller: this.props.userId
    })
  }

	render() {
		const initialValues = this.props.initialValues || {}
		return (
			<form onSubmit={this.handleSubmit}>

				<div>
					<label htmlFor="description">Ticket description</label>
					<input name="description" id="description" value={
						this.state.description !== undefined ? this.state.description : initialValues.description
					} onChange={ this.handleChange } />
				</div>

        <div>
					<label htmlFor="price">Price</label>
					<input name="price" id="price" value={
						this.state.price !== undefined ? this.state.price : initialValues.price
					} onChange={ this.handleChange } />
				</div>

        <div>
					<label htmlFor="pictureUrl">Picture url</label>
					<input name="pictureUrl" id="pictureUrl" value={
						this.state.pictureUrl !== undefined ? this.state.pictureUrl : initialValues.pictureUrl
					} onChange={ this.handleChange } />
				</div>

				<button type="submit">Save</button>
			</form>
		)
	}
}

export default TicketForm