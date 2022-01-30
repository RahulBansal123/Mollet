import { combineReducers } from 'redux';
import fetchReducer from './fetch';
import nodeReducer from './nodes';
import settingsReducer from './settings';

const rootReducer = combineReducers({
	fetchResults: fetchReducer,
	nodes: nodeReducer,
	settings: settingsReducer,
});

export default rootReducer;
