// Core
import React, { Component } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import UIfx from 'uifx';

// Components
import { ChatMessage } from 'components/ui/export';
import { Preloader } from 'components/common/export';
import { withProfile } from 'components/HOC/withProfile';

// Instruments
import OrderAPI from 'api/orders/OrderAPI';
import messageAudio from 'assets/sounds/message.mp3';
import {
  GetMessagesRequest,
  SendMessageRequest,
  MarkMessagesAsReadRequest,
} from 'api/orders/requests';

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
      isLoading: false,
      allMessages: [],
      sendingMessage: '',
      writerChatMessages: [],
      supportChatMessages: [],
      sendMessageTo: this.toSupport,
      lastMessageId: null,
    };
  }

  _setStateMessageTo = (value) => {
    this.setState(() => ({ sendMessageTo: value }), () => this._setLastMessageId());
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
      this.setState({ isLoading: true });

      new OrderAPI().getMessages(new GetMessagesRequest(order)).then(data => {
        const { results } = data;

        if (allMessages.length !== results.length) {
          results.sort((a, b) => +new Date(b.sentAtUtc) - +new Date(a.sentAtUtc));

          let supportChatMessages = results
            .filter(item => item.from === this.admin && item.to !== this.toWriter || item.to === this.toSupport);

          let writerChatMessages = results
            .filter(item => item.from === this.toWriter || item.to === this.toWriter && item.from === this.customer);

          this.setState(() => ({
            writerChatMessages,
            supportChatMessages,
            allMessages: results,
          }), () => this._setLastMessageId());
        }
      }).catch(error => {
        _showCustomPopup(error);
      }).then(() => {
        this.setState({ isLoading: false });
      });
    }
  };

  _markMessagesAsRead = () => {
    const { order } = this.props;
    const { lastMessageId } = this.state;

    new OrderAPI().markMessagesAsRead(new MarkMessagesAsReadRequest({ id: order.id, lastMessageId }))
      .then((data) => {
        this.setState({ info_new_messages_amount: data.order.info_new_messages_amount });
      });
  };

  _setLastMessageId = () => {
    const {
      sendMessageTo,
      writerChatMessages,
      supportChatMessages
    } = this.state;

    const getLastMessageId = (Messages) => {
      return Messages.length !== 0
        ? Messages.filter(item => item.to === this.customer)[0].id
        : null;
    };

    this.setState(() => ({
      lastMessageId: sendMessageTo === this.toSupport
        ? getLastMessageId(supportChatMessages)
        : sendMessageTo === this.toWriter && getLastMessageId(writerChatMessages),
    }), () => {
      const { order } = this.props;
      const { lastMessageId } = this.state;

      lastMessageId > order.info_last_read_message_id && this._markMessagesAsRead()
    });
  };

  componentDidMount() {
    const { state } = this.props;

    this._getMessages();

    this.getMessageInterval = process.env.NODE_ENV === 'production'
      ? setInterval(this._getMessages, state.app.auto_update_interval * 1000)
      : null;
  }

  componentDidUpdate(prevProps) {
    const { order } = this.props;

    if (order !== prevProps.order) {
      this._getMessages();
    }
  }

  componentWillUnmount() {
    const { _updateNewMessagesAmount } = this.props;
    const { info_new_messages_amount } = this.state;

    _updateNewMessagesAmount(info_new_messages_amount);

    process.env.NODE_ENV === 'production' && clearInterval(this.getMessageInterval);
  }

  render() {
    const {
      sendMessageTo,
      sendingMessage,
      writerChatMessages,
      supportChatMessages,
      isLoading,
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
            onClick={handlerMessageToSupport}
          >Support</p>
          <p
            className={`${sendMessageTo === this.toWriter && styles.active}`}
            onClick={handlerMessageToWriter}
          >Writer</p>
        </div>
        <div className={styles.messagesContainer}>
          <div className={styles.messagesViewContainer}>
            <div className={styles.scrollZone}>
              {isLoading ? (
                <div className='absoluteCenter'>
                  <Preloader size={50}/>
                </div>
              ) : (
                messagesJSX.length !== 0
                  ? messagesJSX
                  : <span className={styles.noMessageText}>Not messages yet</span>
              )}
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
