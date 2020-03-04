import React, { Component } from 'react';
import axios from 'axios';
import Grid from "@material-ui/core/Grid";
import Comments from "../components/Comments";

class home extends Component {
    state = {
        comments: null
    };
    componentDidMount() {
        axios.get('/comments')
        .then( res => {
            console.log(res.data);
            this.setState({
                comments: res.data
            });
        })
        .catch(err => console.log(err));
    }

    render() {
        let fetchedComments = this.state.comments ? (
            this.state.comments
                .map((comment) => <Comments  key={comment.commentId} comment={comment}/>)
        ) : (
            <p> loading ...</p>
        )
        return (
            <Grid container spacing={10}>
                <h1>Comments</h1>
                <Grid item sm={8} xs={12}>
                    {fetchedComments}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <h1>Some content</h1>
                </Grid>
            </Grid>
        )
    }
}

export default home
