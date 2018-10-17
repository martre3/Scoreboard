import React, { Component } from 'react';
import API from '../../helpers/API';
import { withTheme } from '@material-ui/core/styles';

class NewResult extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      time: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    API.axios.post('/results', {
      name: this.state.name,
      time: this.state.time
    })
      .then((res) => {
        console.log(res);
      })
      .catch((er) => {
        console.log(er);
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
      <div>
        <form onSubmit={this.handleSubmit}>
          <input name="name" type="text" value={this.state.name} onChange={this.handleNameChange}/>
          <input name="time" type="text" value={this.state.time} onChange={this.handleTimeChange}/>
          <button type="submit">Save</button>
        </form>
      </div>
    );
  }
}

export default withTheme()(NewResult);
