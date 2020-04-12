import React, { Component, Fragment } from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TheButton from '../util/TheButton';

// MUI 
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

// Icons
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';


// Redux
import { connect } from 'react-redux';

class Navbar extends Component {
  render() {
    const { authenticated } = this.props;

    return (
      <AppBar>
        <Toolbar className="nav-container">
          {authenticated ? (
            <Fragment>
              <TheButton tip="New Post">
                <AddIcon color="primary"/>
              </TheButton>
              <Link to="/">
                <TheButton tip="Home">
                  <HomeIcon color="primary"/>
                </TheButton>
              </Link>
              <Link to="/">
                <TheButton tip="Notifications">
                  <Notifications color="primary"/>
                </TheButton>
              </Link>
            </Fragment>
          ): (
            <Fragment>
              <Button color="inherit" component={Link} to="/" >
                  Home
              </Button>          
              <Button color="inherit" component={Link} to="/login" >
                  Login
              </Button>
              <Button color="inherit" component={Link} to="/signup" >
                  Signup
              </Button>
            </Fragment>
          )
        }
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  authenticated: state.user.authenticated,

})

export default connect(mapStateToProps)(Navbar);
