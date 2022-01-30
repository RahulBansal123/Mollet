import { connect, useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { useHistory } from 'react-router-dom';

import { TOGGLE_MODAL } from '../store/ActionTypes';
import { setValues } from '../store/ActionCreators/nodeActions';
import { showAlert } from './showAlert';
import { useState } from 'react';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '30%',
  },
};

const CustomInput = ({ id, name, heading, value, onChange, placeholder }) => {
  return (
    <div className="d-flex flex-column my-2 form-group">
      <label htmlFor={id} style={{ fontWeight: 600, marginBottom: '5px' }}>
        {heading}
      </label>
      <input
        id={id}
        type="text"
        name={name}
        placeholder={placeholder}
        className="p-1 form-control"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

const CustomModal = ({ isModalOpen, connectedNode }) => {
  const [monitorValues, setMonitorValues] = useState({
    peer: '',
    relay: '',
    wallet: '',
  });
  const history = useHistory();
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch({ type: TOGGLE_MODAL, isModalOpen: false });
  };

  const handleChange = (e) => {
    setMonitorValues({
      ...monitorValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Returning if PeerID or RelayID is not entered
    if (!(monitorValues.peer.length > 0 && monitorValues.relay.length > 0)) {
      return;
    }
    dispatch(setValues(monitorValues));
    closeModal();
    history.push('/monitor');
  };

  if (typeof window !== 'undefined') {
    Modal.setAppElement('body');
  }

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Monitor Wallet"
    >
      <header className="d-flex align-items-center">
        <h4 style={{ flex: 1 }}>Monitor Wallet</h4>
        <div className="close">
          <button className="btn btn-outline-danger" onClick={closeModal}>
            close
          </button>
        </div>
      </header>
      {connectedNode && (
        <>
          <p
            className="w-100 no-scrollbar mt-3"
            style={{
              overflowX: 'scroll',
              wordBreak: 'break-all',
              cursor: 'pointer',
            }}
            onClick={() => {
              navigator.clipboard.writeText(connectedNode.peerId);
              showAlert('Peer ID copied', 'success');
            }}
          >
            <span style={{ fontWeight: 600 }}>User Peer ID: </span>
            {connectedNode.peerId}
          </p>
          <p
            className="w-100 no-scrollbar"
            style={{
              overflowX: 'scroll',
              wordBreak: 'break-all',
              cursor: 'pointer',
            }}
            onClick={() => {
              navigator.clipboard.writeText(connectedNode.relayId);
              showAlert('Relay ID copied', 'success');
            }}
          >
            <span style={{ fontWeight: 600 }}>User Relay ID: </span>
            {connectedNode.relayId}
          </p>
        </>
      )}
      <form className="d-flex flex-column">
        <CustomInput
          heading="Peer ID"
          id="peerId"
          name="peer"
          placeholder="Enter Peer ID"
          value={monitorValues.peer}
          onChange={handleChange}
        />
        <CustomInput
          heading="Relay ID"
          id="relayId"
          name="relay"
          placeholder="Enter Relay ID"
          value={monitorValues.relay}
          onChange={handleChange}
        />
        <CustomInput
          heading="Wallet Address"
          id="wallet"
          placeholder="Enter Wallet Address"
          name="wallet"
          value={monitorValues.wallet}
          onChange={handleChange}
        />
        <button
          className="btn btn-danger mt-2"
          onClick={handleSubmit}
          disabled={
            !(monitorValues.peer.length > 0 && monitorValues.relay.length > 0)
          }
        >
          {monitorValues.peer.length === 0
            ? 'Enter Peer ID'
            : monitorValues.relay.length === 0
            ? 'Enter Relay ID'
            : 'Monitor'}
        </button>
      </form>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    isModalOpen: state.settings.isModalOpen,
    connectedNode: state.nodes.connectedNode,
  };
};
export default connect(mapStateToProps)(CustomModal);
