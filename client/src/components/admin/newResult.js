import React, { Component } from 'react';
import API from '../../helpers/API';
import { withTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';

class NewResult extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      time: '',
      pending: false,
      error: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({
      pending: true
    });

    API.axios.post('/auth/results', {
      name: this.state.name,
      time: this.state.time
    })
      .then((res) => {
        this.props.onFormSubmit();
        this.setState({
          pending: false
        });
      })
      .catch((er) => {
        this.setState({
          pending: false,
          error: er.response.data.error,
        });
      });
  }

  handleNameChange(event) {
    this.setState({
      name: event.target.value
    });
  }

  handleTimeChange(event) {
    this.setState({
      time: event.target.value
    });
  }

  render() {
    return (
      <Paper className={'new-result-form'}>
        <h3>New entry</h3>
        <form onSubmit={this.handleSubmit}>
          <TextField
            label="Name"
            id="margin-none"
            value={this.state.name}
            onChange={this.handleNameChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Time"
            id="margin-none"
            value={this.state.time}
            onChange={this.handleTimeChange}
            margin="normal"
            variant="outlined"
          />
          {this.state.error ?
            <FormHelperText>{this.state.error}</FormHelperText>
          :
            ''}
          <Button type="submit" disabled={!!this.state.pending}>Submit</Button>
        </form>
      </Paper>
    );
  }
}

export default withTheme()(NewResult);
