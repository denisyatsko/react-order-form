// Core
import React from 'react';
import ReactHtmlParser from 'react-html-parser';

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
        <p>sentAt: {sentAtUtc}</p>
        {ReactHtmlParser(message)}
        <div className={styles.iconContainer}><DialogArrow/></div>
      </div>
    </div>
  )
};
