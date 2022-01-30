import * as ActionTypes from '../ActionTypes';

const initState = {
  connectedNode: null,
  peerValues: {
    peer: '',
    relay: '',
    wallet: '',
  },
  wallet: '',
};

const nodeReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.CONNECT_RELAY_NODE:
      return {
        ...state,
        connectedNode: action.connectedNode,
      };

    case ActionTypes.SET_VALUES:
      return {
        ...state,
        peerValues: action.peerValues,
      };

    case ActionTypes.SET_WALLET:
      return {
        ...state,
        wallet: action.wallet,
      };

    default:
      return state;
  }
};

export default nodeReducer;
