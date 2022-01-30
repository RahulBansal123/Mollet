import { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import {
  connectRelay,
  setWallet,
} from '../../store/ActionCreators/nodeActions';
import CustomModal from '../../common/Modal';
import { Fluence } from '@fluencelabs/fluence';
import { krasnodar as availableNodes } from '@fluencelabs/fluence-network-environment';
import { registerMonitorService } from '../../aqua/monitor';
import { showAlert } from '../../common/showAlert';

const SelectRelay = ({
  connectRelay,
  connectedNode,
  toggleModal,
  setWalletAddress,
}) => {
  const [isLoadingValues, setIsLoadingValues] = useState({
    status: false,
    connectingPeer: '',
  });

  const handleConnect = useCallback(
    async (x) => {
      setIsLoadingValues({ status: true, connectingPeer: x.peerId });
      try {
        // Stop the peer if either connected or initialized
        if (
          Fluence.getStatus().isConnected ||
          Fluence.getStatus().isInitialized
        ) {
          await Fluence.stop();
        }
        // Start the peer
        await Fluence.start({
          connectTo: x.multiaddr,
          checkConnectionTimeoutMs: 10000,
        });
        // Registering functions for the peer
        registerMonitorService({
          message: (message) => {
            const messageData = JSON.parse(message);
            if (messageData.isWallet) {
              setWalletAddress(messageData.message);
            } else {
              console.info('PEER - ' + messageData.message);
            }
          },
          returnResult: (result) => {
            console.debug(result);
          },
        });
        if (Fluence.getStatus().isConnected) {
          const data = {
            peerId: Fluence.getStatus().peerId,
            relayId: Fluence.getStatus().relayPeerId,
          };
          connectRelay(data);
          toggleModal(true);
        }
      } catch (err) {
        showAlert('Client initialization failed', 'error');
      } finally {
        setIsLoadingValues({ status: false, connectingPeer: '' });
      }
    },
    [connectRelay, setWalletAddress, toggleModal]
  );
  return (
    <div className="page-container align-self-center p-5">
      <h1 className="text-center text-danger">NFT Monitor</h1>
      <h3 className="mt-3 text-center text-muted" style={{ fontWeight: 600 }}>
        Select Relay
      </h3>
      <div className="mt-5">
        {availableNodes.length > 0 && (
          <div>
            <p className="my-4" style={{ fontWeight: 600 }}>
              Available Relays:
            </p>
            <ul>
              {availableNodes?.map((x) => (
                <li key={x.peerId} className="d-flex my-2 align-items-center">
                  <span
                    className="no-scrollbar mx-2"
                    style={{ flex: 1, overflowX: 'scroll' }}
                  >
                    {x.peerId}
                  </span>
                  {isLoadingValues.status &&
                  isLoadingValues.connectingPeer === x.peerId ? (
                    <div className="spinner-border text-danger" role="status" />
                  ) : (
                    <button
                      className="btn btn-outline-danger mx-2"
                      onClick={() => {
                        handleConnect(x);
                      }}
                    >
                      Connect
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
        {connectedNode && (
          <div>
            <p className="my-4" style={{ fontWeight: 600 }}>
              Currently Connected Relay:
            </p>
            <ul>
              <li className="d-flex my-2">
                <span
                  className="mx-2 no-scrollbar"
                  style={{ flex: 1, overflowX: 'scroll' }}
                >
                  {connectedNode.relayId}
                </span>
              </li>
            </ul>
          </div>
        )}
      </div>
      <CustomModal />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    connectedNode: state.nodes.connectedNode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    connectRelay: (connectedNode) => {
      dispatch(connectRelay(connectedNode));
    },
    toggleModal: (isModalOpen) => {
      dispatch({ type: 'TOGGLE_MODAL', isModalOpen });
    },
    setWalletAddress: (walletAddress) => {
      dispatch(setWallet(walletAddress));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectRelay);
