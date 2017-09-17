import axios from 'axios';
import {
    FETCH_THREAD_LIST,
    FETCH_THREAD_LIST_ERROR,
    FETCH_THREAD_LIST_SUCCESS
} from './types';

export const ROOT_URL = 'https://www.reddit.com';
export let path = '';

export const fetchList = (subreddit, search) => (dispatch) => {
    // Modifies the path based on the query provided by the user.
    if (subreddit === null) {
        path = `${ROOT_URL}/.json`
    } else {
        path = `${ROOT_URL}/r/${subreddit}/.json`;
    }
    
    if (search !== '') { 
        path = `${path}${search}`;
    }

    dispatch({
        type: FETCH_THREAD_LIST
    });

    return axios.get(path)
        .then(response => dispatch ({
            type: FETCH_THREAD_LIST_SUCCESS,
            payload: response.data
        }))

        .catch(error => dispatch({
            type: FETCH_THREAD_LIST_ERROR,
            payload: {response: error, invalid: true}
        })
    );
};