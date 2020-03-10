import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
// MUI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import dayjs from 'dayjs';

const Link = require("react-router-dom").Link;
const relativeTime = require('dayjs/plugin/relativeTime')

const styles = {
    card: {
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
    render() {
        dayjs.extend(relativeTime)
        const {
            classes,
            comment: {
                body,
                createdAt,
                userImage,
                userHandle
                // commentId,
                // likeCount,
                // commentCount
            } 
        } = this.props;
        
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
                        <Typography variant="body2" color="textSecondary">
                            {dayjs(createdAt).fromNow()}
                        </Typography>
                        <Typography variant="body1">{body}</Typography>
                    </CardContent>
                </Card>
        );
    }
}

export default withStyles(styles)(Comments);