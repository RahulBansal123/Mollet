import axios from '../axios';
import * as ActionTypes from '../ActionTypes';
import { openSeaUrl, raribleUrl } from '../Urls';

export const fetchOpenSeaAction = (data) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.OPENSEA_FETCH_REQUEST });
    return await axios
      .get(
        `${openSeaUrl}&account_address=${data.walletAddress}&occurred_before=${data.endTime}&occurred_after=${data.startTime}`
        // { headers: { 'X-API-KEY': process.env.REACT_OPENSEA_API_KEY } }
      )
      .then((res) => {
        const result = [];
        if (res.data.asset_events.length > 0) {
          for (let field of res.data.asset_events) {
            result.push(
              `Event: ${field.event_type}, Payment Token Used: ${field.payment_token?.symbol}, Contract Address: ${field.contract_address}, Quantity:${field.quantity}, Transaction Block Hash: ${field.transaction?.block_hash} , Created At: ${field.created_date}`
            );
          }
        }
        dispatch({
          type: ActionTypes.OPENSEA_FETCH_SUCCESS,
          payload: result,
        });
      })
      .catch((err) => {
        dispatch({
          type: ActionTypes.OPENSEA_FETCH_FAILED,
          payload: err.message,
        });
      });
  };
};

export const fetchRaribleAction = (data) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.RARIBLE_FETCH_REQUEST });
    return await axios
      .get(
        `${raribleUrl}?type=${data.type}&user=ETHEREUM:${data.walletAddress}&to=${data.startTime}&from=${data.endTime}`
      )
      .then((res) => {
        const result = [];
        console.log(res);
        for (let field of res.data.activities) {
          result.push(
            `Event: ${field.event_type}, Payment Token Used: ${field.payment_token}, Total Price: ${field.total_price}, Created At: ${field.created_date}`
          );
        }
        dispatch({
          type: ActionTypes.RARIBLE_FETCH_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: ActionTypes.RARIBLE_FETCH_FAILED,
          payload: err.message,
        });
      });
  };
};
