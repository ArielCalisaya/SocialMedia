import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import Icon from '../img/social.png';
import { Link } from 'react-router-dom';

// MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';

// Redux 
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';


const styles = (theme) => ({
    ...theme.styled
});

class login extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps){
      if(nextProps.UI.errors) {
        this.setState({ errors: nextProps.UI.errors});
      }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData, this.props.history)
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

  render() {
    const { classes, UI: { loading } } = this.props;
    const { errors } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={Icon} alt="App_Icon" className={classes.img}/>
          <Typography variant="h2" className={classes.pageTitle} >
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit} >
              <TextField id="email" name="email" type="email" label="Email" 
              helperText={errors.email}
              error={errors.email ? true : false}
              className={classes.textField} 
              value={this.state.email} 
              onChange={this.handleChange} fullWidth/>

              <TextField id="password" name="password" type="password" label="Password" 
              helperText={errors.password}
              error={errors.password ? true : false}
              className={classes.textField} 
              value={this.state.password} 
              onChange={this.handleChange} fullWidth
              />
              {errors.general && (
                  <Typography variant="body2" className={classes.customError}>
                      {errors.general}
                  </Typography>
              )}
              <Button 
              disabled={loading}
              className={classes.button} 
              type="submit" variant="contained" color="primary"
              >
                Login
                {loading && (
                <CircularProgress size={30} className={classes.progress}/>
                )}
              </Button>
              <br/>
              <small className={classes.signupHere} >Dont have an account? Sign Up 
                  <Link to="/signup"> here </Link> 
              </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  loginUser
}

export default connect(
  mapStateToProps, 
  mapActionsToProps
  )(withStyles(styles)(login));
