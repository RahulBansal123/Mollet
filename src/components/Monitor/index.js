import { useCallback, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Fluence } from '@fluencelabs/fluence';
import { Console, Hook, Unhook } from 'console-feed';
import { connect, useDispatch } from 'react-redux';
import { returnResult } from '../../aqua/monitor';
import './monitor.css';
import ChatBox from './ChatBox';
import {
  fetchOpenSeaAction,
  fetchRaribleAction,
} from '../../store/ActionCreators/fetchActions';

const Monitor = ({ peerValues, wallet, openSeaResponse, raribleResponse }) => {
  const [logs, setLogs] = useState([]);

  // Start time in seconds since the Unix epoch
  const [startTime, setStartTime] = useState(
    Math.round(Date.now() / 1000).toString()
  );

  const dispatch = useDispatch();

  // Fetching results from rarible for multiple activity types
  const fetchRaribleData = useCallback(
    async (endTime) => {
      let raribleResults = [];

      const raribleRequestData = {
        startTime: new Date(parseInt(startTime) * 1000).toISOString(),
        endTime: new Date(parseInt(endTime) * 1000).toISOString(),
        walletAddress: wallet,
      };
      const raribleActivityType = [
        'TRANSFER_FROM',
        'TRANSFER_TO',
        'MINT',
        'BURN',
        'MAKE_BID',
        'GET_BID',
        'LIST',
        'BUY',
        'SELL',
        'CANCEL_LIST',
        'CANCEL_BID',
      ];
      for (let activityType of raribleActivityType) {
        await dispatch(
          fetchRaribleAction({
            ...raribleRequestData,
            type: activityType,
          })
        );
        raribleResults.push(raribleResponse);
      }
      raribleResults = raribleResults.filter((val) => val.length);
      return raribleResults;
    },
    [dispatch, raribleResponse, startTime, wallet]
  );

  // Fetch the data from the rarible and opensea
  const fetchData = useCallback(async () => {
    if (wallet && wallet.length > 0) {
      const endTime = Math.round(Date.now() / 1000).toString();

      console.debug(
        `Monitoring wallet for time range: ${startTime}-${endTime}`
      );

      const openSeaRequestData = {
        startTime,
        endTime: endTime,
        walletAddress: wallet,
      };

      let response = [];

      await dispatch(fetchOpenSeaAction(openSeaRequestData));
      const raribleResults = await fetchRaribleData(endTime);

      response = response.concat(openSeaResponse, raribleResults);

      // Returning respone to the peer
      if (response.length > 0) {
        await returnResult(
          peerValues.peer,
          peerValues.relay,
          JSON.stringify(response)
        );
      }
      setStartTime(endTime);
    }
  }, [
    wallet,
    startTime,
    dispatch,
    fetchRaribleData,
    openSeaResponse,
    peerValues.peer,
    peerValues.relay,
  ]);

  // Display console logs to the screen
  useEffect(() => {
    Hook(
      window.console,
      (log) => setLogs((currLogs) => [...currLogs, log]),
      false
    );
    return () => Unhook(window.console);
  }, []);

  // Creating an interval to fetchData after every 10 seconds
  useEffect(() => {
    const fetchDataInterval = setInterval(fetchData, 10000);
    return () => {
      clearInterval(fetchDataInterval);
    };
  }, [fetchData]);

  // Redirect to the home page if not connected
  if (!Fluence.getStatus().isConnected) {
    return <Redirect to="/" />;
  }

  return (
    <div className="row align-items-baseline">
      <div className="col-md-8 d-flex justify-content-end">
        <div
          className="page-container align-self-center p-5"
          style={{ width: '80%' }}
        >
          <h2 className="text-center mb-5">Monitor Wallet</h2>
          <p>
            <span style={{ fontWeight: 600 }}>Connected Peer ID: </span>
            {peerValues.peer}
          </p>
          <p>
            <span style={{ fontWeight: 600 }}>Connected Relay ID: </span>
            {peerValues.relay}
          </p>
          {wallet?.length > 0 && (
            <p>
              <span style={{ fontWeight: 600 }}>
                Monitoring Wallet Address:{' '}
              </span>
              {wallet}
            </p>
          )}
          <div className="text-info message-border">
            <Console
              logs={logs}
              variant="light"
              filter={['debug']}
              searchKeywords={'-'}
              styles={{
                LOG_ICON_WIDTH: 0,
                LOG_ICON_HEIGHT: 0,
                LOG_INFO_COLOR: '#000',

                BASE_FONT_SIZE: '16px',
                BASE_LINE_HEIGHT: 1.2,
                BASE_FONT_FAMILY: '"Helvetica", "Arial", sans-serif',
              }}
            />
          </div>
        </div>
      </div>
      <ChatBox peerValues={peerValues} />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    peerValues: state.nodes.peerValues,
    wallet: state.nodes.wallet,
    openSeaResponse: state.fetchResults.openSeaResponse,
    raribleResponse: state.fetchResults.raribleResponse,
  };
};

export default connect(mapStateToProps)(Monitor);
