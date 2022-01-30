import * as ActionTypes from '../ActionTypes';

const initState = {
	isLoading: false,
	errmess: null,
	openSeaResponse: [],
	raribleResponse: [],
};

const fetchReducer = (state = initState, action) => {
	switch (action.type) {
		case ActionTypes.OPENSEA_FETCH_REQUEST:
			return {
				...state,
				errmess: null,
				isLoading: true,
				openSeaResponse: null,
			};

		case ActionTypes.OPENSEA_FETCH_SUCCESS:
			return {
				...state,
				openSeaResponse: action.payload,
				isLoading: false,
			};

		case ActionTypes.OPENSEA_FETCH_FAILED:
			return {
				...state,
				isLoading: false,
				errmess: action.payload,
			};

		case ActionTypes.RARIBLE_FETCH_REQUEST:
			return {
				...state,
				errmess: null,
				isLoading: true,
				raribleResponse: null,
			};

		case ActionTypes.RARIBLE_FETCH_SUCCESS:
			return {
				...state,
				isLoading: false,
				raribleResponse: action.payload,
			};

		case ActionTypes.RARIBLE_FETCH_FAILED:
			return {
				...state,
				isLoading: false,
				errmess: action.payload,
			};

		default:
			return state;
	}
};

export default fetchReducer;
