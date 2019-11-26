// Core
import React from 'react';
import { Link } from 'react-router-dom';

// Components
import { EyeIcon } from 'components/icons/export';
import { UserOrderFooter } from './UserOrderFooter';

// Instruments
import { cabinetRoutes } from 'instruments/export';

// Styles
import grid from 'theme/grid.css';
import styles from './styles.css';
import main from '../../pages/Cabinet/styles.css';

export const UserOrder = React.forwardRef(({ order }, ref) => {
  const orderLink = `${cabinetRoutes.ORDER}/${order.id}`;

  return (
    <li ref={ref} className={`${styles.order}`}>
      <div className={`${main.topContainer} ${styles.topContainer}`}>
        <div className={main.col1}>
          <p className={main.colorGrey}>
            <span className={main.desktopHidden}>Deadline:</span>
            {order.deadline}
          </p>
        </div>
        <div className={main.col2}>
          <p className={`${main.finished} ${main.status}`}>status: {order.status_title}</p>
        </div>
        <div className={main.col3}>
          <Link to={orderLink} className={grid.col}>
            <span className={main.title}>{order.topic !== '' ? order.topic : 'Writer\'s choice'}</span>
            <p><span className={main.colorGrey}>Order ID:</span> {order.id}</p>
          </Link>
        </div>
        <div className={main.col4}>
          <span>{`${order.num_pages} ${order.num_pages > 1 ? 'pages' : 'page'}`}</span>
          <span>{order.subject_or_discipline_title}</span>
          <span>{order.type_of_paper_title}</span>
        </div>
      </div>
      <Link to={orderLink} className={styles.showMoreCol}>
        <EyeIcon/>&nbsp;Show more information
      </Link>
      <div className={styles.footer}>
        <UserOrderFooter order={order}/>
      </div>
    </li>
  );
});
