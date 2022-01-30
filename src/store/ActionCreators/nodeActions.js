import * as ActionTypes from '../ActionTypes';

export const connectRelay = connectedNode => {
	return dispatch => {
		dispatch({ type: ActionTypes.CONNECT_RELAY_NODE, connectedNode });
	};
};

export const setValues = (peer, relay) => {
	const peerValues = { peer, relay };
	return dispatch => {
		dispatch({ type: ActionTypes.SET_VALUES, peerValues });
	};
};

export const setWallet = wallet => {
	return dispatch => {
		dispatch({ type: ActionTypes.SET_WALLET, wallet });
	};
};
