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

class DeleteComment extends Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default DeleteComment
