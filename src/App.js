import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import {MuiThemeProvider} from '@material-ui/core/styles';
import customTheme from './util/theme';
import jwtDecode from 'jwt-decode';
import AuthRoute from './util/AuthRoute';
import './App.css';

// components
import Navbar from './components/Navbar';

// pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';



const theme = createMuiTheme(customTheme)


// when i refresh the page before I post the token petition, decodedtoken starts, 
// it not the response i need but i'm okay at the moment
let authenticated;
const token = localStorage.FBTokenId;
if (token){
  const decodedToken = jwtDecode(token);

  // it looks the problem starts here
  console.log(decodedToken)
  if(decodedToken.exp * 1000 < Date.now()){
    window.location.href = '/login'
    authenticated = false; 
  } else {
    authenticated = true;
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
                <AuthRoute exact path="/login" component={login} authenticated={authenticated}/>
                <AuthRoute exact path="/signup" component={signup} authenticated={authenticated}/>
            </Switch>
            </div>
        </Router>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
