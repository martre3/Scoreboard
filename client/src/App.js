import React, { Component } from 'react';
import './App.css';
import Login from "./components/login/login";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  theme = createMuiTheme({
    palette: {
      primary: {
        main: '#aa3d18',
      },
    },
  });

  render() {
    return (
      <MuiThemeProvider theme={this.theme}>
        <div className="App">
          <header className="App-header">
            <Router>
              <Route exact path="/" component={Login} />
            </Router>
          </header>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
