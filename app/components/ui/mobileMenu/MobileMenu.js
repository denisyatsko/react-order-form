// Core
import React, { Component } from 'react';

// Components
import { withProfile } from 'components/HOC/withProfile';

// Styles
import styles from './styles.css';

@withProfile
export class MobileMenu extends Component {
	_onClickHandler = (value) => {
	  const { _setState } = this.props;

    _setState('visibleMobileMenu', !value);
	};

	render() {
		const { visibleMobileMenu } = this.props.state;

		return (
			<div
				onClick = {() => this._onClickHandler(visibleMobileMenu) }
				className = {`${styles.burger} ${ visibleMobileMenu ? styles.on : '' }`}
      >
				<span></span>
				<span></span>
				<span></span>
			</div>
		);
	}
}
