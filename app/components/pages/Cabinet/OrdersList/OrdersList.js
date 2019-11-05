// Core
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Components
import { Preloader } from 'components/common/export';
import { withProfile } from 'components/HOC/withProfile';
import { EyeIcon, FolderIcon, MessageIcon } from 'components/icons/export';
import { SidebarStatistics, SidebarCalculator } from 'components/layout/export';

// Instruments
import { delay, cabinetRoutes, getOrders } from 'instruments/export';

// Styles
import styles from './styles.css';
import grid from 'theme/grid.css';
import main from '../styles.css';

@withProfile
export class OrdersList extends Component {
  state = {
    itemsToShow: 3,
    isLoading: false,
    isHideShowMoreBtn: false,
  };

  _scrollTo = ref => {
    ref.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  _showMoreHandler = (e) => {
    const { state } = this.props;
    const { itemsToShow } = this.state;

    e.preventDefault();

    this.setState({ isLoading: true });

    let callback = () => {
      let id = state.userOrders[this.state.itemsToShow - 3].id;
      this._scrollTo(this.refs[id]);
    };

    delay(300).then(() => {
      if (state.userOrders.length - itemsToShow > 3) {
        this.setState(prevState => ({
          itemsToShow: prevState.itemsToShow + 3,
          isLoading: false,
        }), callback);
      } else {
        this.setState(() => ({
          itemsToShow: state.userOrders.length,
          isHideShowMoreBtn: true,
          isLoading: false,
        }), callback);
      }
    });
  };

  componentDidMount() {
    getOrders().then(data => {
      const { _setState } = this.props;

      _setState('userOrders', data.results);
    });
  }

  render() {
    const { state } = this.props;
    const { itemsToShow, isLoading, isHideShowMoreBtn } = this.state;

    const orders = state.userOrders || [];
    const handlerShowMore = (e) => this._showMoreHandler(e);

    return (
      <div className={main.contentWrapper}>
        <div className={main.mainContent}>
          <div className={styles.filterWrapper}>
            <div className={`${styles.item} ${styles.on}`}>
              <span className={styles.small}>01 Step</span>
              <span>Unpaid</span>
            </div>
            <div className={styles.item}>
              <span className={styles.small}>02 Step</span>
              <span>In Progress</span>
            </div>
            <div className={styles.item}>
              <span className={styles.small}>03 Step</span>
              <span>Revision</span>
            </div>
            <div className={styles.item}>
              <span className={styles.small}>04 Step</span>
              <span>Finished</span>
            </div>
          </div>
          <ul className={styles.ordersList}>
            {orders.length !== 0 ? orders
              .slice(0, itemsToShow)
              .map(({
                      id,
                      deadline,
                      status_title,
                      topic,
                      num_pages,
                      type_of_paper_title,
                      price,
                      info_new_files_amount,
                      info_new_messages_amount,
                      subject_or_discipline_title,
                    }) => {
                  const orderLink = `${cabinetRoutes.ORDER}/${id}`;

                  return <li key={id} ref={id} className={`${styles.order}`}>
                    <div className={`${main.topContainer} ${styles.topContainer}`}>
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
                        <Link to={orderLink} className={grid.col}>
                          <span className={main.title}>{topic !== '' ? topic : 'Writer\'s choice'}</span>
                          <p><span className={main.colorGrey}>Order ID:</span> {id}</p>
                        </Link>
                      </div>
                      <div className={main.col4}>
                        <span>{`${num_pages} ${num_pages > 1 ? 'pages' : 'page'}`}</span>
                        <span>{subject_or_discipline_title}</span>
                        <span>{type_of_paper_title}</span>
                      </div>
                    </div>
                    <Link to={orderLink} className={styles.showMoreCol}>
                      <EyeIcon/>&nbsp;Show more information
                    </Link>
                    <div className={main.bottomContainer}>
                      <div className={main.leftBlock}>
                        <Link
                          to={{
                            pathname: `${orderLink}`,
                            hash: '#messages',
                          }}
                          className={main.messages}
                        >
                          <MessageIcon/>
                          Messages
                          <span className={main.count}>{info_new_messages_amount}</span>
                        </Link>
                        <Link
                          to={{
                            pathname: `${orderLink}`,
                            hash: '#files',
                          }}
                          className={main.files}
                        >
                          <FolderIcon/>
                          Files
                          <span className={main.count}>{info_new_files_amount}</span>
                        </Link>
                      </div>
                      <p className={main.price}>$ {price}</p>
                    </div>
                  </li>;
                },
              ) : (
              <div className={styles.preloaderWrapper}>
                <Preloader/>
              </div>
            )}
            {isLoading ? (
              <div className={styles.preloaderWrapper}>
                <Preloader/>
              </div>
            ) : (
              <button
                onClick={handlerShowMore}
                style={{ display: isHideShowMoreBtn && 'none' }}
                className={`btn btn--primary ${styles.showMoreBtn}`}
              >
                Show more
              </button>
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
