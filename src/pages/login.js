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

const styles = {
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
};

class login extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            loading: false,
            errors: {}
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            loading: true
        });
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post('/signin', userData)
            .then(res => {
                console.log(res.data);
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
            LogIn
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
              <small className={classes.signupHere} >dont have an acount? Sign Up 
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
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(login);