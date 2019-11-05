// Core
import React, { Component } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import UIfx from 'uifx';

// Components
import { ChatMessage } from 'components/ui/export';
import { withProfile } from 'components/HOC/withProfile';

// Instruments
import OrderAPI from 'api/orders/OrderAPI';
import messageAudio from 'assets/sounds/message.mp3';
import { GetMessagesRequest, SendMessageRequest } from 'api/orders/requests';

// Styles
import styles from './styles.css';

@withProfile
export class MessagesTab extends Component {
  constructor(props) {
    super(props);
    this.toWriter = 'Writer';
    this.toSupport = 'Support';
    this.customer = 'Customer';
    this.admin = 'Admin';
    this.getMessageInterval = null;
    this.messageSound = new UIfx(messageAudio, { volume: 0.4, throttleMs: 100 });
    this.state = {
      allMessages: [],
      sendingMessage: '',
      writerChatMessages: [],
      supportChatMessages: [],
      sendMessageTo: this.toSupport,
    };
  }

  _setStateMessageTo = (value) => {
    this.setState({ sendMessageTo: value });
  };

  _onChangeTypeMessage = (text) => {
    this.setState({ sendingMessage: text });
  };

  _sendMessageTo = (receiver) => {
    const { sendingMessage } = this.state;
    const { order } = this.props;

    if (receiver === this.toWriter) {
      new OrderAPI().sendMessageToWriter(new SendMessageRequest({ ...order, sendingMessage })).then(data => {
        this.setState(prevState => ({
          writerChatMessages: [data.message, ...prevState.writerChatMessages],
        }));
      });
    }

    if (receiver === this.toSupport) {
      new OrderAPI().sendMessageToSupport(new SendMessageRequest({ ...order, sendingMessage })).then(data => {
        this.setState(prevState => ({
          supportChatMessages: [data.message, ...prevState.supportChatMessages],
        }));
      });
    }

    this.setState({ sendingMessage: '' });
    this.messageSound.play();
  };

  _getMessages = () => {
    const { allMessages } = this.state;
    const { order, _showCustomPopup } = this.props;

    if (Object.keys(order).length !== 0) {
      new OrderAPI().getMessages(new GetMessagesRequest(order)).then(data => {
        const { results } = data;

        if (allMessages.length !== results.length) {
          results.sort((a, b) => +new Date(b.sentAtUtc) - +new Date(a.sentAtUtc));

          let supportChatMessages = results
            .filter(item => item.from === this.admin && item.to !== this.toWriter || item.to === this.toSupport);

          let writerChatMessages = results
            .filter(item => item.from === this.toWriter || item.to === this.toWriter && item.from === this.customer);

          this.setState({
            writerChatMessages,
            supportChatMessages,
            allMessages: results,
          });
        }
      }).catch(error => {
        _showCustomPopup(error);
      });
    }
  };

  componentDidMount() {
    this._getMessages();
    // this.getMessageInterval = setInterval(this._getMessages, 10000);
  }

  componentDidUpdate(prevProps) {
    const { order } = this.props;

    if (order !== prevProps.order) {
      this._getMessages();
    }
  }

  componentWillUnmount() {
    // clearInterval(this.getMessageInterval);
  }

  render() {
    const {
      sendMessageTo,
      sendingMessage,
      writerChatMessages,
      supportChatMessages,
    } = this.state;

    const handlerMessageToSupport = () => this._setStateMessageTo(this.toSupport);
    const handlerMessageToWriter = () => this._setStateMessageTo(this.toWriter);
    const handlerTypeMessage = (event) => this._onChangeTypeMessage(event.target.value);
    const handlerSendMessage = () => sendMessageTo === this.toSupport
      ? this._sendMessageTo(this.toSupport)
      : sendMessageTo === this.toWriter && this._sendMessageTo(this.toWriter);

    const mapChatMessages = (arr) => arr.map(({ from, message, sentAtUtc }, index) =>
      <ChatMessage from={from} message={message} sentAtUtc={sentAtUtc} key={index} customer={this.customer}/>);

    const messagesJSX = sendMessageTo === this.toSupport
      ? mapChatMessages(supportChatMessages)
      : (sendMessageTo === this.toWriter && mapChatMessages(writerChatMessages));

    return (
      <div className={styles.tab}>
        <div className={styles.messagesNav}>
          <p
            className={`${sendMessageTo === this.toSupport && styles.active}`}
            onClick={handlerMessageToSupport}>
            Message Support
          </p>
          <p
            className={`${sendMessageTo === this.toWriter && styles.active}`}
            onClick={handlerMessageToWriter}>
            Message Writer
          </p>
        </div>
        <div className={styles.messagesContainer}>
          <div className={styles.messagesViewContainer}>
            <div className={styles.scrollZone}>
              {messagesJSX.length !== 0
                ? messagesJSX
                : <span className={styles.noMessageText}>Not messages yet</span>}
            </div>
          </div>
          <div className={styles.footer}>
            <TextareaAutosize
              placeholder='Add details...'
              value={sendingMessage}
              onChange={handlerTypeMessage}
              className={styles.typeMessageArea}
            />
            <button
              onClick={handlerSendMessage}
              className={`btn btn--primary ${styles.sendMessagesBtn}`}
            >Send
            </button>
          </div>
        </div>
      </div>
    );
  }
}
