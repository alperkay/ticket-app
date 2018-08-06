import React, {PureComponent} from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';




const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    margin: theme.spacing.unit,
	},
	button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  }
});

class EventForm extends PureComponent {
	state = {}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.onSubmit(this.state)
	}

	handleChange = (event) => {
    const {name, value} = event.target

    this.setState({
      [name]: value
    })
  }

	render() {
		const { classes } = this.props;
		return (

			<div className={classes.container}>
			<form onSubmit={this.handleSubmit}>
				<div>
					<Input
						placeholder="Event name"
						className={classes.input}
						inputProps={{'aria-label': 'Description',}}
						name="name" 
						id="name" 
						value={this.state.name || ''} 
						onChange={ this.handleChange } 
					/>
				</div>
				<div>
					<Input
						placeholder="Event description"
						className={classes.input}
						inputProps={{'aria-label': 'Description',}}
						name="description" 
						id="description" 
						value={this.state.description || ''} 
						onChange={ this.handleChange } 
					/>
				</div>
				<div>
					<TextField
						placeholder="Start date"
						type="date"
						label="Start date"
						name="startDate" 
						id="startDate" 
						value={this.state.startDate || ''} 
						className={classes.textField}
        		InputLabelProps={{shrink: true,}}
						onChange={ this.handleChange } 
					/>
				</div>
				<div>
					<TextField
						placeholder="End date"
						type="date"
						label="End date"
						name="endDate" 
						id="endDate" 
						value={this.state.endDate || ''} 
						className={classes.textField}
        		InputLabelProps={{shrink: true,}}
						onChange={ this.handleChange } 
					/>
				</div>
				<div>
					<Input
						placeholder="Picture url"
						className={classes.input}
						inputProps={{'aria-label': 'Description',}}
						name="pictureUrl" 
						id="pictureUrl" 
						value={this.state.pictureUrl || ''} 
						onChange={ this.handleChange } 
					/>
				</div>

				<Button variant="contained" size="small" className={classes.button} type="submit">
        Save New Event
      </Button>
			</form>
			</div>

		)
	}
}

EventForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventForm);