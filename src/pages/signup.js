import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import Icon from '../img/social.png';
import axios from 'axios';

// MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';

const Link = require('react-router-dom').Link

const styles = (theme) => ({
    ...theme.styled
});

class signup extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            loading: false,
            errors: {}
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            loading: true
        });
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        }
        axios.post('/signup', newUserData)
            .then(res => {
                console.log(res.data);
                localStorage.setItem('FBTokenAuth', `Bearer ${res.data.token}`);
                this.setState({
                    loading: false
                });
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({
                    errors: err.response.data,
                    loading: false
                })
            })
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={Icon} alt="App_Icon" className={classes.img}/>
          <Typography variant="h2" className={classes.pageTitle} >
            Signup
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
              <TextField id="confirmPassword" name="confirmPassword" type="password" label="Confirm Password" 
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
              className={classes.textField} 
              value={this.state.confirmPassword} 
              onChange={this.handleChange} fullWidth
              />
              <TextField id="handle" name="handle" type="text" label="Handle" 
              helperText={errors.handle}
              error={errors.handle ? true : false}
              className={classes.textField} 
              value={this.state.handle} 
              onChange={this.handleChange} fullWidth
              />
              {errors.general && (
                  <Typography variant="body2" className={classes.customError}>
                      {errors.general}
                      {errors.email}
                  </Typography>
              )}
              <Button 
              disabled={loading}
              className={classes.button} 
              type="submit" variant="contained" color="primary"
              >
                Signup
                {loading && (
                <CircularProgress size={30} className={classes.progress}/>
                )}
              </Button>
              <br/>
              <small className={classes.signupHere} >Already have an account? Sign in
                  <Link to="/login"> here </Link> 
              </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(signup);
