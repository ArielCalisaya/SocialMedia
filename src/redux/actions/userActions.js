import {SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI} from '../types';

export const loginUser = (userData) => (dispatch) => {
    dispatch({ type: LOADING_UI});
    axios
        .post('/signin', userData)
            .then((res) => {
                console.log(res.data);
                this.setState({
                    loading: false
                });
                localStorage.setItem('FBTokenId', `Bearer ${res.data.token}`);
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({
                    errors: err.response.data,
                    loading: false
                })
            })
}
export const getUserData = () => (dispatch) => {
    
}