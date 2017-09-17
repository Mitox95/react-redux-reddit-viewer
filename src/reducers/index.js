import { combineReducers } from 'redux';
import listReducer from './thread_list';

const rootReducer = combineReducers({
  threads: listReducer
});

export default rootReducer;
