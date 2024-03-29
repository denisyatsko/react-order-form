// Core
import React, { Component } from 'react';
import ReactHtmlParser from 'html-react-parser';

// Components
import { withProfile } from 'components/HOC/withProfile';
import { UserOrderFooter } from 'components/ui/export';

// Styles
import styles from './styles.css';
import main from 'components/pages/Cabinet/styles.css';

@withProfile
export class InfoTab extends Component {
  render() {
    const { order } = this.props;

    return (
      <div className={styles.orderInfo}>
        <div className={main.tab}>
          <div className={styles.colContainer}>
            <div className={styles.col1}>
              <div className={`${styles.item} ${styles.mobItem}`}>
                <span className={styles.title}>Deadline:</span>
                <span className={styles.text}>{order.deadline}</span>
              </div>
              <div className={`${styles.item} ${styles.mobItem}`}>
                <span className={styles.title}>Status:</span>
                <span className={`${main.finished} ${main.status}`}>{order.status_title}</span>
              </div>
              <div className={`${styles.item} ${styles.mobItem}`}>
                <span className={styles.title}>Options:</span>
                <div className={`${styles.optionsContainer} ${main.col4}`}>
                  <span>{`${order.num_pages} ${order.num_pages > 1 ? 'pages' : 'page'}`}</span>
                  <span>{order.subject_or_discipline_title}</span>
                  <span>{order.type_of_paper_title}</span>
                </div>
              </div>
              <div className={styles.item}>
                <span className={styles.title}>Type of paper:</span>
                <span className={styles.text}>{order.type_of_paper_title}</span>
              </div>
              <div className={styles.item}>
                <span className={styles.title}>Topic:</span>
                <span className={styles.text}>
                  {order.topic !== '' ? order.topic : 'Writer\'s choice'}
                </span>
              </div>
              <div className={styles.item}>
                <span className={styles.title}>Preferred writer ID:</span>
                <span className={styles.text}>
                  {+order.preferred_writer === 0 ? 'none' : order.preferred_writer}
                </span>
              </div>
              <div className={styles.item}>
                <span className={styles.title}>Paper format:</span>
                <span className={styles.text}>{order.paper_format_title}</span>
              </div>
            </div>
            <div className={styles.col2}>
              <div className={styles.item}>
                <span className={styles.title}>Academic level:</span>
                <span className={styles.text}>{order.academic_level_title}</span>
              </div>
              <div className={styles.item}>
                <span className={styles.title}>Discount:</span>
                <span className={styles.text}>{order.discount}</span>
              </div>
              <div className={styles.item}>
                <span className={styles.title}>Writer ID:</span>
                <span className={styles.text}>
                  {+order.writer_id === 0 ? 'none' : order.writer_id}
                </span>
              </div>
              <div className={styles.item}>
                <span className={styles.title}>Sources:</span>
                <span className={styles.text}>{order.number_of_sources}</span>
              </div>
            </div>
            <div className={styles.col3}>
              <div className={styles.row}>
                <div className={styles.item}>
                  <span className={styles.title}>Discipline:</span>
                  <span className={styles.text}>{order.subject_or_discipline_title}</span>
                </div>
                <div className={styles.item}>
                  <span className={styles.title}>Number of pages:</span>
                  <span className={styles.text}>
                    {`${order.num_pages} (${order.spacing === 1
                      ? `Double spacing, ${275 * order.num_pages} words`
                      : `Single spacing, ${550 * order.num_pages} words`})`}
                  </span>
                </div>
              </div>
              <div className={`${styles.item} ${styles.col} ${styles.flexAuto}`}>
                <span className={styles.title}>Paper details:</span>
                <div className={`${styles.paperDetails} ${styles.flexAuto}`}>
                  <div className={styles.scroll}>
                    {typeof order.paper_details === 'string' && ReactHtmlParser(order.paper_details)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.footer}>
            <UserOrderFooter order={order}/>
          </div>
        </div>
      </div>
    );
  }
}
