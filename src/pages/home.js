import React, { Component } from 'react';
import axios from 'axios';
import Grid from "@material-ui/core/Grid";
import Comments from "../components/Comments";
import Profile from '../components/Profile';

class home extends Component {
    _isMounted = false;
    state = {
        comments: null,
    };

    componentDidMount() {
        this._isMounted= true;
        axios.get('/comments')
        .then( res => {
            console.log(res.data);
            this.setState({
                comments: res.data
            });
        })
        .catch(err => console.log(err));
    }
    componentWillUnmount(){
        this._isMounted= false;
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
                <Grid item sm={8} xs={12}>
                    {fetchedComments}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>
            </Grid>
        )
    }
}

export default home
