import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TheButton from '../util/theButton';

// Redux
import { connect } from 'react-redux';
import { editUserDetails } from '../redux/actions/userActions'

// MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


// Icons
import EditIcon from '@material-ui/icons/Edit'

const styles = (theme) => ({
    // posible problema dentro de styled 
    ...theme.styled,
    button: {
        float: 'right'
    }
});

class EditDetails extends Component {
    state = {
        bio: '',
        website: '',
        location: '',
        open: false
    };

    mapUserDetailsToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio: '',
            website: credentials.website ? credentials.website: '',
            location: credentials.location ? credentials.location: ''
        })
    }

    componentDidMount(){
        const { credentials } = this.props;
        this.mapUserDetailsToState(credentials);
        
    }
    handleOpen = () => {
        this.setState({ open: true})
        this.mapUserDetailsToState(this.props.credentials)
    }
    handleClose = () => {
        this.setState({ open: false });
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            website:this.state.website,
            location:this.state.location
        }
        this.props.editUserDetails(userDetails);
        this.handleClose();
    }
 
    render() {
        const { classes } = this.props;
        return (
            <Fragment >
                <TheButton 
                    tip="Edit Details"
                    onClick={this.handleOpen}  
                    btnclassname={classes.button}
                    >
                    <EditIcon color="primary"/>
                </TheButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm" >
                    <DialogTitle>Edit Your Details</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField 
                                name="bio"
                                type="text"
                                label="Bio"
                                multiline
                                rows="3"
                                placeholder="Bio about yourself"
                                className={classes.textField}
                                value={this.state.bio}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <TextField 
                                name="website"
                                type="text"
                                label="Website"
                                multiline
                                placeholder="Personal website"
                                className={classes.textField}
                                value={this.state.website}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <TextField 
                                name="location"
                                type="text"
                                label="Location"
                                multiline
                                placeholder="Your location"
                                className={classes.textField}
                                value={this.state.location}
                                onChange={this.handleChange}
                                fullWidth
                            />
                        </form>
                        
                            <DialogActions>
                                <Button onClick={this.handleClose} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={this.handleSubmit} color="primary">
                                    Save
                                </Button>
                            </DialogActions>
                        
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

EditDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
})

export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(EditDetails));
