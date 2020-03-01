import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import {MuiThemeProvider} from '@material-ui/core/styles';

// components
import Navbar from './components/Navbar';

// pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#00796b',
      dark: '#002884',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff7961',
      main: '#d81b60',
      dark: '#ba000d',
      contrastText: '#fff'
    }
  },
  styled: {
    typography: {
      userNextVariants: true
    },
    form: {
      textAlign: "center"
    },
    img: {
        margin: "20px auto 20px auto",
        width: "100px"
    },
    pageTitle: {
        margin: "10px auto 10px auto"
    },
    textField: {
        margin: "10px auto 10px auto"
    },
    button: {
        marginTop : 20,
        position: 'relative'
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
    },
    progress: {
        position: 'absolute'
    },
    signupHere: {
        display: "block",
        marginTop: 12
    }
  }
})

class App extends Component {
  render(){
    return (
      <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Navbar/>
            <div className="container">
            <Switch>
                <Route exact path="/" component={home} />
                <Route exact path="/login" component={login} />
                <Route exact path="/signup" component={signup} />
            </Switch>
            </div>
        </Router>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
