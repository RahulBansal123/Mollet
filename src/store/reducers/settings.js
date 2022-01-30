import * as ActionTypes from '../ActionTypes';

const initState = {
	isModalOpen: false,
};

const settingsReducer = (state = initState, action) => {
	switch (action.type) {
		case ActionTypes.TOGGLE_MODAL:
			return {
				...state,
				isModalOpen: action.isModalOpen,
			};

		default:
			return state;
	}
};

export default settingsReducer;
