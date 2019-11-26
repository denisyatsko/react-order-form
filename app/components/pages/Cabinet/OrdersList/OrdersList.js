// Core
import React, { Component } from 'react';

// Components
import { UserOrder } from 'components/ui/export';
import { Preloader, Dropdown } from 'components/common/export';
import { SidebarStatistics, SidebarCalculator } from 'components/layout/export';

// Instruments
import { config } from 'config';
import { delay } from 'instruments/export';
import OrderAPI from 'api/orders/OrderAPI';

// Styles
import styles from './styles.css';
import main from '../styles.css';

export class OrdersList extends Component {
  constructor(props) {
    super(props);

    this.refsCollection = {};
    this.moreOrders = 3;

    this.state = {
      sort: 1,
      itemsToShow: this.moreOrders,
      isLoading: false,
      isHideShowMoreBtn: true,
      orderStatus: config.orderStatus.unpaid,
    };
  }

  _scrollTo = ref => {
    ref.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  _showMoreHandler = (e) => {
    const { itemsToShow, filteredOrders } = this.state;

    e.preventDefault();

    this.setState({ isLoading: true });

    let callback = () => {
      let id = filteredOrders[itemsToShow].id;
      this._scrollTo(this.refsCollection[id]);
    };

    // Display loader 300ms
    delay(300).then(() => {
      if (filteredOrders.length - itemsToShow > this.moreOrders) {
        this.setState(prevState => ({
          itemsToShow: prevState.itemsToShow + this.moreOrders,
          isLoading: false,
        }), callback);
      } else {
        this.setState(() => ({
          itemsToShow: filteredOrders.length,
          isHideShowMoreBtn: true,
          isLoading: false,
        }), callback);
      }
    });
  };

  _sortOrders = (e = { value: 1 }) => {
    const { userOrders } = this.state;

    this.setState({
      sort: e.value,
    });

    if (userOrders !== 0) {
      this.setState({ filteredOrders: undefined });

      let filteredOrders = [...userOrders].filter(order => {
        switch (e.value) {
          case 1:
            return +order.status === (1 || 2 || 3 || 4 || 5 || 6 || 7 || 8 || 11 || 13);
            break;
          case 2:
            return +order.status === (9 || 10 || 15 || 14);
            break;
          case 3:
            return +order.status === (2 || 3 || 7);
            break;
        }
      }).sort((a, b) => {
        return (+b.info_new_messages_amount + +b.info_new_files_amount) -
          (+a.info_new_messages_amount + +a.info_new_files_amount);
      });

      // Display loader 300ms
      delay(300).then(() => {
        this.setState({
          filteredOrders,
          isHideShowMoreBtn: filteredOrders.length <= this.moreOrders,
        });
      });
    }
  };

  componentDidMount() {
    new OrderAPI().getOrders().then(data => {
      this.setState(() => ({
        userOrders: data.results,
      }), () => this._sortOrders());
    });
  }

  render() {
    const { itemsToShow, isLoading, isHideShowMoreBtn, filteredOrders, sort } = this.state;

    const userOrdersJSX = filteredOrders && filteredOrders
      .slice(0, itemsToShow)
      .map(order =>
        <UserOrder
          key={order.id}
          order={order}
          ref={element => this.refsCollection[order.id] = element}
        />,
      );

    return (
      <div className={main.contentWrapper}>
        <div className={main.mainContent}>
          <Dropdown
            options={config.sortOrdersValues}
            value={sort}
            searchable={false}
            onChange={(e) => this._sortOrders(e)}
          />
          <ul className={styles.ordersList}>
            {!!!filteredOrders ? (
              <div className='absoluteCenter'>
                <Preloader size={40}/>
              </div>
            ) : (filteredOrders.length !== 0
                ? userOrdersJSX
                : filteredOrders.length === 0 && <span className={styles.emptyText}>not orders</span>
            )}
            {isLoading ? (
              <div style={{ textAlign: 'center' }}>
                <Preloader size={40}/>
              </div>
            ) : (
              <button
                onClick={(e) => this._showMoreHandler(e)}
                style={{ display: isHideShowMoreBtn && 'none' }}
                className={`btn btn--primary ${styles.showMoreBtn}`}
              >Show more</button>
            )}
          </ul>
        </div>
        <div className={`${main.hideMobile} ${main.sidebar}`}>
          <SidebarCalculator/>
          <SidebarStatistics/>
        </div>
      </div>
    );
  }
}
