// Core
import React from 'react';
import ReactHtmlParser from 'html-react-parser';

// Components
import { DialogArrow } from 'components/icons/export';

// Styles
import styles from './styles.css';

export const ChatMessage = (props) => {
  const { index, from, sentAtUtc, message, customer } = props;

  return(
    <div
      key={index}
      className={`${styles.messageContainer} ${from === customer ? styles.customerMessage : ''}`}
    >
      <span className={styles.sender}>{from}</span>
      <div className={styles.messageText}>
        {typeof message === 'string' && ReactHtmlParser(message)}
      </div>
      <p className={styles.sentDate}>{sentAtUtc}</p>
      <div className={styles.iconContainer}><DialogArrow/></div>
    </div>
  )
};
