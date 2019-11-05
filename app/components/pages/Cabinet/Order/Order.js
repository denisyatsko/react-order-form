// Core
import React, { Component, createRef } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FaInfoCircle } from 'react-icons/fa';

// Components
import { Tabs } from 'components/common/export';
import { withProfile } from 'components/HOC/withProfile';
import { SidebarStatistics, SidebarCalculator } from 'components/layout/export';
import { FolderIcon, MessageIcon, LeftArrowIcon } from 'components/icons/export';
import { MessagesTab, FilesTab, InfoTab } from 'components/layout/orderTabs/export';

// Instruments
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
    this.tabs = {
      tab1: 'Complete order information',
      tab2: 'Messages',
      tab3: 'Files',
    };
    this.state = {
      order: {},
    };
  }

  _setActiveTab = (value) => {
    this.tabsRef.current.setActiveTab(value);
  };

  componentDidMount() {
    const { state, match, history, location } = this.props;

    const orders = state.userOrders || [];
    const idFromUrl = match.params.orderId;

    if (orders.length > 0) {
      const order = orders.find(({ id }) => id === idFromUrl) || null;

      this.setState({ order });
    } else {
      new OrderAPI().getOrder(new GetOrderRequest(idFromUrl)).then(data => {
        this.setState({ order: data.order });

        if (`${cabinetRoutes.ORDER}/${idFromUrl}` !== `${cabinetRoutes.ORDER}/${data.order.id}`) {
          history.push(`${cabinetRoutes.ORDER}/${data.order.id}`);
        }
      });
    }

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
    const { _setDefaultOrderValues } = this.props;

    _setDefaultOrderValues();
  }

  render() {
    const { order } = this.state;

    const handlerActiveTab2 = () => this._setActiveTab(this.tabs.tab2);
    const handlerActiveTab3 = () => this._setActiveTab(this.tabs.tab3);

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
              <div label={this.tabs.tab1} jsx={<FaInfoCircle/>}>
                <InfoTab order={order} handlerActiveTab2={handlerActiveTab2} handlerActiveTab3={handlerActiveTab3}/>
              </div>
              <div label={this.tabs.tab2} jsx={<MessageIcon/>}>
                <MessagesTab order={order}/>
              </div>
              <div label={this.tabs.tab3} jsx={<FolderIcon/>}>
                <FilesTab order={order}/>
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
