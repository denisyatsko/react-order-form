// Core
import React, { Component, createRef } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FaInfoCircle } from 'react-icons/fa';

// Components
import { Tabs } from 'components/common/export';
import { withProfile } from 'components/HOC/withProfile';
import { SidebarStatistics, SidebarCalculator } from 'components/layout/export';
import { FolderIcon, MessageIcon, LeftArrowIcon } from 'components/icons/export';
import {
  FilesTab,
  InfoTab,
  MessagesTab,
  AcceptOrderTab,
  RefundOrderTab,
  RevisionOrderTab,
} from 'components/layout/orderTabs/export';

// Instruments
import { config } from 'config';
import OrderAPI from 'api/orders/OrderAPI';
import { cabinetRoutes } from 'instruments/export';
import { GetOrderRequest } from 'api/orders/requests';

// Styles
import styles from './styles.css';
import main from '../styles.css';
import grid from 'theme/grid.css';

@withRouter
@withProfile
export class Order extends Component {
  constructor(props) {
    super(props);
    this.tabsRef = createRef();
    this.state = {
      order: {},
    };
  }

  _setActiveTab = (value) => {
    this.tabsRef.current.setActiveTab(value);
  };

  _updateNewMessagesAmount = (value) => {
    this.setState((prevState) => ({
      order: {
        ...prevState.order,
        info_new_messages_amount: value || 0,
      },
    }));
  };

  componentDidMount() {
    const { match, location } = this.props;

    new OrderAPI().getOrder(new GetOrderRequest({ id: match.params.orderId })).then(data => {
      this.setState({ order: data.order });
    });

    Object.values(config.orderTabs).map(item => {
      if (item === location.state) return this._setActiveTab(location.state);
    });
  }

  componentWillUnmount() {
    const { _setDefaultOrderValues } = this.props;

    _setDefaultOrderValues();
  }

  render() {
    const { order } = this.state;

    const handlerSetActiveTab = (activeTab) => this._setActiveTab(this.tabs[activeTab]);

    return (
      <div className={main.contentWrapper}>
        <div className={main.mainContent}>
          <Link to={cabinetRoutes.ORDERS} className={styles.link}><LeftArrowIcon/>Back to orders</Link>
          <div className={`${styles.orderContainer}`}>
            <div className={`${main.topContainer} ${styles.topContainer}`}>
              <div className={`${main.col1} ${styles.mobHidden}`}>
                <p className={main.colorGrey}>
                  {order.deadline}
                </p>
              </div>
              <div className={`${main.col2} ${styles.mobHidden}`}>
                <p className={`${main.finished} ${main.status}`}>status: {order.status_title}</p>
              </div>
              <div className={`${main.col3} ${styles.col3}`}>
                <div className={grid.col}>
                  <span className={main.title}>{order.topic !== '' ? order.topic : 'Writer\'s choice'}</span>
                  <p><span className={main.colorGrey}>Order ID:</span> {order.id}</p>
                </div>
              </div>
              <div className={main.col4}>
                <span>{`${order.num_pages} ${order.num_pages > 1 ? 'pages' : 'page'}`}</span>
                <span>{order.subject_or_discipline_title}</span>
                <span>{order.type_of_paper_title}</span>
              </div>
            </div>
            <Tabs classNames={styles.nav} ref={this.tabsRef}>
              <div label={config.orderTabs.tab1} jsx={<FaInfoCircle/>}>
                <InfoTab order={order}/>
              </div>
              <div label={config.orderTabs.tab2} jsx={<MessageIcon/>}>
                <MessagesTab order={order} _updateNewMessagesAmount={this._updateNewMessagesAmount}/>
              </div>
              <div label={config.orderTabs.tab3} jsx={<FolderIcon/>}>
                <FilesTab order={order} handlerSetActiveTab={handlerSetActiveTab}/>
              </div>
              <div label={config.orderTabs.tab4} styles={{ display: 'none' }}>
                <AcceptOrderTab orderId={order.id}/>
              </div>
              <div label={config.orderTabs.tab5} styles={{ display: 'none' }}>
                <RevisionOrderTab orderId={order.id}/>
              </div>
              <div label={config.orderTabs.tab6} styles={{ display: 'none' }}>
                <RefundOrderTab orderId={order.id}/>
              </div>
            </Tabs>
          </div>
        </div>
        <div className={main.sidebar}>
          <SidebarCalculator/>
          <SidebarStatistics/>
        </div>
      </div>
    );
  }
}
