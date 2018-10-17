import React, { Component } from 'react';
import './App.css';
import Login from "./components/login/login";
import Results from "./components/results/results";
import NewResult from "./components/admin/newResult";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route } from "react-router-dom";

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
            <Router>
              <header className="App-header">
                <div>
                  <Route exact path="/" component={Login} />
                  <Route exact path="/results" component={Results} />
                  <Route exact path="/admin" component={NewResult} />
                </div>
              </header>
            </Router>
          </div>
        </MuiThemeProvider>
    );
  }
}

export default App;
