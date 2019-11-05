// Core
import React, { Component } from 'react';
import { FaRegCopy } from 'react-icons/fa';
import Popup from 'reactjs-popup';

// Components
import { withProfile } from 'components/HOC/withProfile';

// Styles
import styles from './styles.css';

@withProfile
export class SidebarPartnerCode extends Component {
  state = {
    isVisiblePopup: true,
  };

  _setPopupState = (state) => {
    this.setState({ isVisiblePopup: state });
  };

  render() {
    const { isVisiblePopup } = this.state;
    const { partner_code } = this.props.state.user;

    const onClickHandler = () => {
      navigator.clipboard.writeText(partner_code);

      setTimeout(this._setPopupState, 700, false);
    };

    return (
      <div className={styles.wrapper}>
        <p className={styles.caption}>Partner Code</p>
        <p className={styles.text}>This is your code for referral program,
          click on the button below to copy the
          direct link and share it with your friends
          to earn money</p>
        <div className={styles.codeContainer}>
          <span className={styles.code}>{partner_code}</span>
          <div onClick={onClickHandler}>
            <Popup
              trigger={open => {
                !open && !isVisiblePopup && this._setPopupState(true);

                return <button
                  type='button' className={styles.copyCodeBtn}>
                  <FaRegCopy/>
                  Copy code
                </button>
              }}
              disabled={!isVisiblePopup}
              position='bottom center'
              contentStyle={{ width: '100px' }}
            >
              <div className={styles.toolTipContent}>Coped!</div>
            </Popup>
          </div>
        </div>
      </div>
    );
  }
}
