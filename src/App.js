import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import {MuiThemeProvider} from '@material-ui/core/styles';

// components
import Navbar from './components/Navbar';

// pages
import home from './pages/home';
// import login from './pages/login';
// import signup from './pages/signup';

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
  typography: {
    userNextVariants: true
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
            </Switch>
            </div>
        </Router>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
