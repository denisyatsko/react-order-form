// Core
import React, { Component, createRef } from 'react';
import { Link, withRouter } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { CSSTransition } from 'react-transition-group';
import UIfx from 'uifx';

// Components
import { Tabs } from 'components/common/export';
import { withProfile } from 'components/HOC/withProfile';
import { FolderIcon, MessageIcon, LeftArrowIcon, DialogArrow } from 'components/icons/export';

// Instruments
import OrderAPI from 'api/orders/OrderAPI';
import { cabinetRoutes } from 'instruments';
import messageAudio from 'assets/sounds/message.mp3';
import {
  GetOrderRequest,
  GetMessagesRequest,
  SendMessageRequest,
  GetOrderFilesRequest,
} from 'api/orders/requests';

// Styles
import styles from './styles.css';
import main from '../styles.css';
import grid from 'theme/grid.css';

@withRouter
@withProfile
export class Order extends Component {
  constructor(props) {
    super(props);
    this.toWriter = 'Writer';
    this.toSupport = 'Support';
    this.customer = 'Customer';
    this.admin = 'Admin';
    this.getMessageInterval = null;
    this.tabsRef = createRef();
    this.messageSound = new UIfx(messageAudio, { volume: 0.4, throttleMs: 100 });
    this.tabs = {
      tab1: 'Complete order information',
      tab2: 'Messages',
      tab3: 'Files',
    };
    this.state = {
      order: null,
      sendingMessage: '',
      sendMessageTo: this.toSupport,
      supportChatMessages: [],
      writerChatMessages: [],
      allMessages: [],
    };
  }

  _setActiveTab = (value) => {
    this.tabsRef.current.setActiveTab(value);
  };

  _setStateMessageTo = (value) => {
    this.setState({ sendMessageTo: value });
  };

  _sendMessageTo = (receiver) => {
    const { order, sendingMessage } = this.state;

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

  _onChangeTypeMessage = (text) => {
    this.setState({ sendingMessage: text });
  };

  _getMessages = () => {
    const { order, allMessages } = this.state;
    const { _showCustomPopup } = this.props;

    new OrderAPI().getMessages(new GetMessagesRequest(order)).then(data => {
      const { results } = data;

      if (allMessages.length !== results.length) {
        alert('1')
        let adminMessages = results.filter(item => item.from === this.admin);
        let customerMessages = results.filter(item => item.from === this.customer);
        let writerMessages = results.filter(item => item.from === this.toWriter);

        let supportChatMessages = [
          ...adminMessages,
          ...customerMessages.filter(item => item.to === this.toSupport),
        ]
          .sort((a, b) => new Date(a.sentAt) - new Date(b.sentAt))
          .reverse();


        let writerChatMessages = [
          ...writerMessages,
          ...customerMessages.filter(item => item.to === this.toWriter),
        ]
          .sort((a, b) => new Date(a.sentAt) - new Date(b.sentAt))
          .reverse();

        this.setState({
          writerChatMessages,
          supportChatMessages,
          allMessages: results,
        });
      }
    }).catch(error => {
      console.log(error);
      _showCustomPopup(error);
    });
  };

  _getOrdersFiles = () => {
    const { order } = this.state;

    new OrderAPI().getOrderFiles(new GetOrderFilesRequest(order)).then(data => {
      // console.log(data);
    });
  };

  componentDidMount() {
    const { state, match, history, location } = this.props;

    const orders = state.userOrders || [];
    const idFromUrl = match.params.orderId;

    if (orders.length > 0) {
      const order = orders.find(({ id }) => id === idFromUrl) || null;

      this.setState(() => (
        { order }), () => {
        this._getMessages();
        this._getOrdersFiles();
      });
    } else {
      new OrderAPI().getOrder(new GetOrderRequest(idFromUrl)).then(data => {
        this.setState(() => (
          { order: data.order }), () => {
          this._getMessages();
          this._getOrdersFiles();
        });

        if (`${cabinetRoutes.ORDER}/${idFromUrl}` !== `${cabinetRoutes.ORDER}/${data.order.id}`) {
          history.push(`${cabinetRoutes.ORDER}/${data.order.id}`);
        }

      });
    }

    this.getMessageInterval = setInterval(this._getMessages, 10000);

    switch (location.hash) {
      case '#messages':
        this._setActiveTab(this.tabs.tab2);
        break;
      case '#files':
        this._setActiveTab(this.tabs.tab3);
        break;
      default:
        this._setActiveTab(this.tabs.tab1);
    }
  }

  componentWillUnmount() {
    clearInterval(this.getMessageInterval);
  }

  render() {
    const { order, sendMessageTo, supportChatMessages, writerChatMessages, sendingMessage } = this.state;

    const {
      id,
      topic,
      price,
      spacing,
      discount,
      deadline,
      num_pages,
      status_title,
      paper_details,
      preferred_writer,
      number_of_sources,
      paper_format_title,
      type_of_paper_title,
      academic_level_title,
      info_new_files_amount,
      info_new_messages_amount,
      subject_or_discipline_title,
    } = order || {};

    const handlerActiveTab2 = () => this._setActiveTab(this.tabs.tab2);
    const handlerActiveTab3 = () => this._setActiveTab(this.tabs.tab3);
    const handlerTypeMessage = (event) => this._onChangeTypeMessage(event.target.value);
    const handlerMessageToSupport = () => this._setStateMessageTo(this.toSupport);
    const handlerMessageToWriter = () => this._setStateMessageTo(this.toWriter);
    const handlerSendMessage = () => sendMessageTo === this.toSupport
      ? this._sendMessageTo(this.toSupport)
      : this.toWriter && this._sendMessageTo(this.toWriter);

    const messageHTML = (index, from, message) =>
      <div
        key={index}
        className={`${styles.messageContainer} ${from === this.customer && styles.customerMessage}`}
      >
        <span className={styles.sender}>{from}</span>
        <div className={styles.messageText}>
          {ReactHtmlParser(message)}
          <div className={styles.iconContainer}><DialogArrow/></div>
        </div>

      </div>;

    const messagesJSX = sendMessageTo === this.toSupport ? (
      supportChatMessages.map(({ from, message }, index) => messageHTML(index, from, message))
    ) : (sendMessageTo === this.toWriter && writerChatMessages
        .filter(item => item.to === this.toWriter)
        .map(({ from, message }, index) => messageHTML(index, from, message))
    );

    return (
      <div className={main.contentWrapper}>
        <div className={main.mainContent}>
          <Link to={cabinetRoutes.ORDERS} className={styles.link}><LeftArrowIcon/>Back to orders</Link>
          <div className={`${main.order} ${styles.orderContainer}`}>
            <div>
              <div className={main.topContainer}>
                <div className={main.col1}>
                  <p className={main.colorGrey}>
                    <span className={main.desktopHidden}>Deadline:</span>
                    {deadline}
                  </p>
                </div>
                <div className={main.col2}>
                  <p className={`${main.finished} ${main.status}`}>status: {status_title}</p>
                </div>
                <div className={main.col3}>
                  <div className={grid.col}>
                    <span className={main.title}>{topic !== '' ? topic : 'Writer\'s choice'}</span>
                    <p><span className={main.colorGrey}>Order ID:</span> {id}</p>
                  </div>
                </div>
                <div className={main.col4}>
                  <span>{`${num_pages} ${num_pages > 1 ? 'pages' : 'page'}`}</span>
                  <span>{subject_or_discipline_title}</span>
                  <span>{type_of_paper_title}</span>
                </div>
              </div>
            </div>
            <Tabs classNames={styles.nav} ref={this.tabsRef}>
              <CSSTransition label={this.tabs.tab1} classNames='fade' timeout={200} appear unmountOnExit>
                <div className={`${styles.orderInfo} ${styles.tab}`}>
                  <div className={styles.colContainer}>
                    <div className={styles.col1}>
                      <div className={styles.item}>
                        <span className={styles.title}>Type of paper:</span>
                        <span className={styles.text}>{type_of_paper_title}</span>
                      </div>
                      <div className={styles.item}>
                        <span className={styles.title}>Topic:</span>
                        <span className={styles.text}>{topic !== '' ? topic : 'Writer\'s choice'}</span>
                      </div>
                      <div className={styles.item}>
                        <span className={styles.title}>Preferred writer ID:</span>
                        <span className={styles.text}>{+preferred_writer === 0 ? 'none' : preferred_writer}</span>
                      </div>
                      <div className={styles.item}>
                        <span className={styles.title}>Paper format:</span>
                        <span className={styles.text}>{paper_format_title}</span>
                      </div>
                    </div>
                    <div className={styles.col2}>
                      <div className={styles.item}>
                        <span className={styles.title}>Academic level:</span>
                        <span className={styles.text}>{academic_level_title}</span>
                      </div>
                      <div className={styles.item}>
                        <span className={styles.title}>Discount:</span>
                        <span className={styles.text}>{discount}</span>
                      </div>
                      <div className={styles.item}>
                        <span className={styles.title}>Writer ID:</span>
                        <span className={styles.text}>???</span>
                      </div>
                      <div className={styles.item}>
                        <span className={styles.title}>Sources:</span>
                        <span className={styles.text}>{number_of_sources}</span>
                      </div>
                    </div>
                    <div className={styles.col3}>
                      <div className={styles.row}>
                        <div className={styles.item}>
                          <span className={styles.title}>Discipline:</span>
                          <span className={styles.text}>{subject_or_discipline_title}</span>
                        </div>
                        <div className={styles.item}>
                          <span className={styles.title}>Number of pages:</span>
                          <span className={styles.text}>
                          {`${num_pages} (${spacing === 1
                            ? `Double spacing, ${275 * num_pages} words`
                            : `Single spacing, ${550 * num_pages} words`})`}
                        </span>
                        </div>
                      </div>
                      <div className={`${styles.item} ${styles.flexAuto}`}>
                        <span className={styles.title}>Paper details:</span>
                        <textarea
                          className={`${styles.paperDetails} ${styles.flexAuto}`}
                          readOnly={true}
                          value={paper_details}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.bottomContainer} ${main.bottomContainer}`}>
                    <div className={main.leftBlock}>
                      <p className={main.messages} onClick={handlerActiveTab2}>
                        <MessageIcon/>
                        Messages
                        <span className={main.count}>{info_new_messages_amount}</span>
                      </p>
                      <p className={main.files} onClick={handlerActiveTab3}>
                        <FolderIcon/>
                        Files
                        <span className={main.count}>{info_new_files_amount}</span>
                      </p>
                    </div>
                    <p className={main.price}>$ {price}</p>
                  </div>
                </div>
              </CSSTransition>
              <CSSTransition label={this.tabs.tab2} classNames='fade' timeout={200} appear unmountOnExit>
                <div className={styles.tab}>
                  <div className={styles.messagesNav}>
                    <p
                      className={`${styles.item} ${sendMessageTo === this.toSupport && styles.active}`}
                      onClick={handlerMessageToSupport}
                    >
                      Message Support</p>
                    <p
                      className={`${styles.item} ${sendMessageTo === this.toWriter && styles.active}`}
                      onClick={handlerMessageToWriter}
                    >
                      Message Writer</p>
                  </div>
                  <div className={styles.messagesContainer}>
                    <div className={styles.messagesViewContainer}>
                      <div className={styles.scrollZone}>
                        {messagesJSX}
                      </div>
                    </div>
                    <div className={styles.footer}>
                      <textarea
                        placeholder='Add details...'
                        value={sendingMessage}
                        onChange={handlerTypeMessage}
                        className={styles.typeMessageArea}/>
                      <button
                        onClick={handlerSendMessage}
                        className={`btn btn--primary ${styles.sendMessagesBtn}`}
                      >Send
                      </button>
                    </div>
                  </div>
                </div>
              </CSSTransition>
              <CSSTransition label={this.tabs.tab3} classNames='fade' timeout={200} appear unmountOnExit>
                <div className={styles.tab}>files</div>
              </CSSTransition>
            </Tabs>
          </div>
        </div>
        <div className={main.sidebar}>
          <p>sidebar</p>
        </div>
      </div>
    );
  }
}
