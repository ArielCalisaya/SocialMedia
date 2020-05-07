import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from 'prop-types';
import TheButton from '../util/theButton';
import DeleteComment from './DeleteComment';
// MUI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
 
// Icons
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'

// Redux
import { connect } from 'react-redux';
import { likeComment, unlikeComment } from '../redux/actions/dataActions';

import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
const relativeTime = require('dayjs/plugin/relativeTime')

const styles = {
    card: {
        position: 'relative',
        display: "flex",
        marginBottom: 20
    },
    image: {
        minWidth: 200
    },
    content: {
        padding: 25,
        objectFit: "cover"
    }
};

class Comments extends Component {
    likedComment = () => {
        if(
            this.props.user.likes && 
            this.props.user.likes.find(
                (like) => like.commentId === this.props.comment.commentId
            )
        )
        return true;
        else return false;
    }
    likeComment = () => {
        this.props.likeComment(this.props.comment.commentId);
    }

    unlikeComment = () => {
        this.props.unlikeComment(this.props.comment.commentId);
    }

    render() {
        dayjs.extend(relativeTime)
        const {
            classes,
            comment: {
                body,
                createdAt,
                userImage,
                userHandle,
                commentId,
                likeCount,
                commentCount
            },
            user: { authenticated, credentials: { handle } }
        } = this.props;

        const likeButton = !authenticated ? (
            <Link to="/login">
                <TheButton tip="Like">
                    <FavoriteBorder color="primary"/>
                </TheButton>
            </Link>
        ) : (
            this.likedComment() ? (
                <TheButton 
                tip="Quit Like"
                onClick={this.unlikeComment}
                >
                    <FavoriteIcon color="primary" />
                </TheButton>
            
            ) : (
                <TheButton 
                tip="Like"
                onClick={this.likeComment}
                >
                    <FavoriteBorder color="primary" />
                </TheButton>
            )
        )

        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteComment commentId={commentId}/>
        ) : null

        return (
                <Card className= {classes.card}>
                    <CardMedia
                        className={classes.image}
                        image={userImage}
                        title="profile User"
                    />
                    <CardContent className={classes.content}>
                        <Typography
                            variant="h5"
                            component={Link}
                            to={`/users/${userHandle}`}
                            color="primary"
                        >
                            {userHandle}
                        </Typography>
                        
                        {deleteButton}

                        <Typography variant="body2" color="textSecondary">
                            {dayjs(createdAt).fromNow()}
                        </Typography>
                        <Typography variant="body1">{body}</Typography>
                        {likeButton}
                        <span>
                            {likeCount} Likes
                        </span>
                        <TheButton tip="comments">
                            <ChatIcon color="primary"/>
                        </TheButton>
                        <span>
                            {commentCount} Comments
                        </span>
                    </CardContent>
                </Card>
        );
    }
}
Comments.propTypes = {
    likeComment: PropTypes.func.isRequired,
    unlikeComment: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user
})

const mapActionsToProps = {
    likeComment,
    unlikeComment
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Comments));