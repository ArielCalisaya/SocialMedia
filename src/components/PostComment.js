import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import TheButton from "../util/TheButton";
// MUI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
// Icons
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
// Redux
import { connect } from "react-redux";
import { postComment } from "../redux/actions/userActions";

const styles = (theme) => ({
  ...theme.styled,
});

class PostComment extends Component {
  state = {
    open: false,
    body: "",
    errors: {},
  };
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { errors } = this.sate;
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
            <form onSubmit={this.handleSubmit}>
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
                disabled={loading}
              ></Button>
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

export default connect((mapStateToProps, { postComment }))(
  withStyles(styles)(PostComment)
);
