import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
import Comments from "../components/Comments";
import Profile from '../components/Profile';
import PropTypes from 'prop-types';


/*------------------ Redux -------------------*/
import { connect } from 'react-redux';
import { getComments } from '../redux/actions/dataActions';

class home extends Component {
    _isMounted = false;


    componentDidMount() {
        this._isMounted= true;
        this.props.getComments()
    }
    componentWillUnmount(){
        this._isMounted= false;
    }

    render() {
        const { comments, loading } = this.props.data;
        let fetchedComments = !loading ? (
            comments.map((comment) => <Comments  key={comment.commentId} comment={comment}/>)
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

home.propTypes = {
    getComments: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, {getComments})(home)
