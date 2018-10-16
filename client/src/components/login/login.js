import React, {Component} from 'react';
import Api from '../../helpers/API';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import FormHelperText from '@material-ui/core/FormHelperText';
import { withTheme } from '@material-ui/core/styles';
import './login.css';

class Login extends Component {

  constructor() {
    super();
    this.state = {
      password: '',
      error: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    Api.axios.post('/login', {
      password: this.state.password
    })
      .then((res) => {
        Api.setJWT(res.data.token);
      })
      .catch((err) => {
        this.setState({error: err.response.data.error});
      });
  }

  handleChange(event) {
    this.setState({password: event.target.value});
  }

  render() {
    const form = <form onSubmit={this.handleSubmit}>
      <Input id="password" name="password" type="password" placeholder="password" value={this.state.password} error={this.state.error ? true: false} onChange={this.handleChange}/>
      <Button type="submit" variant="contained" color="primary">
        Login
      </Button>
      <FormHelperText error={true}>{this.state.error}</FormHelperText>
    </form>;

    return (
      <div>
        <Paper children={form} classes={{root: 'form-container'}}/>
        <div className="skip-btn" style={{color: this.props.theme.palette.primary.main }}><div className="pointer">Go to results</div></div>
      </div>
    );
  }
}

export default withTheme()(Login);
