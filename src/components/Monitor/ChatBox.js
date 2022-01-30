import { useCallback, useEffect, useState } from 'react';
import { Console, Hook, Unhook } from 'console-feed';
import { sendMessage } from '../../aqua/monitor';
import { showAlert } from '../../common/showAlert';

const ChatBox = ({ peerValues }) => {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [message, setMessage] = useState('');

  // Display console logs to the screen
  useEffect(() => {
    Hook(
      window.console,
      (log) => setLogs((currLogs) => [...currLogs, log]),
      false
    );
    return () => Unhook(window.console);
  }, []);

  const sendMessageHandler = useCallback(
    async (isWallet, message) => {
      setIsLoading(true);
      try {
        const messageData = { isWallet, message };

        // Sending message to peer
        await sendMessage(
          peerValues.peer,
          peerValues.relay,
          JSON.stringify(messageData)
        );

        if (!isWallet) {
          console.info(message);
          setMessage('');
        }
      } catch (e) {
        showAlert('Error sending message', 'error');
      } finally {
        setIsLoading(false);
      }
    },
    [peerValues.peer, peerValues.relay]
  );

  useEffect(() => {
    if (peerValues.wallet.length > 0) {
      sendMessageHandler(true, peerValues.wallet);
    }
  }, [peerValues, sendMessageHandler]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessageHandler(false, message);
    }
  };

  return (
    <div className="col-md-4">
      <div
        className="page-container align-self-center p-5"
        style={{ width: '80%' }}
      >
        <h2 className="text-center mb-5">Chat with Peer</h2>
        <div className="text-primary message-border">
          <Console
            logs={logs}
            variant="light"
            filter={['info']}
            searchKeywords={'-'}
            styles={{
              LOG_ICON_WIDTH: 0,
              LOG_ICON_HEIGHT: 0,
              LOG_INFO_COLOR: '#000',
              LOG_INFO_BACKGROUND: 'transparent',
              LOG_INFO_BORDER: 'rgba(0,0,0,0.2)',
              LOG_INFO_AMOUNT_BACKGROUND: '#dc2727',
              LOG_INFO_AMOUNT_COLOR: '#8d8f91',

              BASE_FONT_SIZE: '16px',
              BASE_LINE_HEIGHT: 1.2,
              BASE_FONT_FAMILY: '"Helvetica", "Arial", sans-serif',
            }}
          />
        </div>

        <div className="d-flex w-100 mt-5">
          <input
            placeholder="Enter Message"
            className="form-control"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          {isLoading ? (
            <div className="spinner-border text-danger mx-3" role="status" />
          ) : (
            <button
              className="btn btn-danger"
              disabled={message.length === 0}
              onClick={() => sendMessageHandler(false, message)}
            >
              Send
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
