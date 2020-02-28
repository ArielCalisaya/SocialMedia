import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
// MUI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const Link = require("react-router-dom").Link;

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
        const {
            classes,
            comment: {
                body,
                createdAt,
                userImage,
                userHandle
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
                            {createdAt}
                        </Typography>
                        <Typography variant="body1">{body}</Typography>
                    </CardContent>
                </Card>
        );
    }
}

export default withStyles(styles)(Comments);