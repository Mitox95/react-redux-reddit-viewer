import {
    FETCH_THREAD_LIST,
    FETCH_THREAD_LIST_SUCCESS,
    FETCH_THREAD_LIST_ERROR
} from '../actions/types';

const INITIAL_STATE = {
    list: [],
    error: {response: {}, invalid: false},
    toast: ''
}

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case FETCH_THREAD_LIST:
            return {
                list: [],
                error: false,
                toast: ''
            };

        case FETCH_THREAD_LIST_SUCCESS:
            if (action.payload.data.children.length > 1) {
                return {
                    list: action.payload.data.children,
                    error: false,
                    toast: ''
                }
            } else {
                return {
                    list: action.payload.data.children,
                    error: false,
                    toast: 'No more stuff to show... :('
                }
            }

        case FETCH_THREAD_LIST_ERROR:
            return {
                ...state,
                error: action.payload,
                toast: 'Unexpected error! Please check the subreddit name and try again.'
            }

        default:
            return state;
    }

}