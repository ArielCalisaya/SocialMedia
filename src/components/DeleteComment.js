import React, { Component, Fragment } from 'react'
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from 'prop-types';
import TheButton from '../util/TheButton';

// MUI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

import { connect } from 'react-redux';
import { deleteComment } from '../redux/actions/dataActions';

const  styles = {

}
class DeleteComment extends Component {
    state= {
        open: false
    }

    handleOpen = () => {
        this.setState({ open: true });
    }
    handleClose = () => {
        this.setState({ open: false });
    }
    deleteComment = () => {
        this.props.deleteComment(this.props.commenId)
        this.setState({ open: false });
    }

    render() {
        const { classes } = this.props
        return (
            <Fragment>
                <TheButton tip="Delete Comment"
                    onClick={this.handleOpen}
                    btnclassname={classes.deleteButton}
                >
                    <DeleteOutline color="secondary" />
                </TheButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"    
                >
                    <DialogTitle>
                        Are you sure to want Delete this comment?
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.deleteComment} color="secondary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>

            </Fragment>
        )
    }
}

DeleteComment.protoTypes = {
    deleteComment: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    commentId: PropTypes.string.isRequired
}

export default connect(null, { deleteComment })(withStyles(styles)(DeleteComment))
