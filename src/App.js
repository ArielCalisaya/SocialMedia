import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import {MuiThemeProvider} from '@material-ui/core/styles';
import customTheme from './util/theme';
import jwtDecode from 'jwt-decode';
import './App.css';

// components
import Navbar from './components/Navbar';

// pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';



const theme = createMuiTheme(customTheme)

let authentincated;
const token = localStorage.FBTokenAuth;
if (token){
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()){
    window.location.href = '/login'
    authentincated = false; 
  } else {
    authentincated = true;
  }
}

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
