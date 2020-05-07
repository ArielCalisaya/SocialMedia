import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import TheButton from "../util/theButton";
// MUI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
// Icons
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
// Redux
import { connect } from "react-redux";
import { postComment } from "../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme.styled,
    submitButton: {
        position: 'relative'
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        left: '90%',
        top: '10%'
    }
});

class PostComment extends Component {
  state = {
    open: false,
    body: "",
    errors: {},
  };
  UNSAFE_componentWillReceiveProps(nextProps){
      if(nextProps.UI.errors){
          this.setState({
              errors: nextProps.UI.errors
          })
      }
  }
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  hancleChange = (e) => {
      this.setState({ [e.target]: e.target.value})
  }
  handleSubmit = (e) => {
      e.preventDefault();
      this.props.postComment({ body: this.state.body})
  }

  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading },
    } = this.props;

    return (
      <Fragment>
        <TheButton onClick={this.handleOpen} tip="New Comment">
          <AddIcon color="primary" />
        </TheButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <TheButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </TheButton>
          <DialogTitle> Post a new Comment</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit = (e) => {
                e.preventDefault();
                this.props.postComment({ body: this.state.body})
            }}>
              <TextField
                name="body"
                type="text"
                label="Comment"
                mutiline
                rows="3"
                placeholder="What are u thinking about?"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}>
                    Submit
                    {loading && (
                        <CircularProgress size={30} className={classes.progressSpinner} />
                    )}
                </Button>
            </form>
          </DialogContent>
        </Dialog>

        <TheButton onClick={this.handleClose} />
      </Fragment>
    );
  }
}


PostComment.propTypes = {
  postComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { postComment })(
  withStyles(styles)(PostComment)
);
