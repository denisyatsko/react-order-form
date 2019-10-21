// Core
import React, { Component } from 'react';

// Styles
import styles from './styles.css';

export class MobileMenu extends Component {
	_onClickHandler = () => {
		alert('here was redux ;)')
	};

	render() {
		const { visibleMobileMenu } = this.props;

		return (
			<div
				onClick = { this._onClickHandler }
				className = {`${styles.burger} ${ visibleMobileMenu ? styles.on : '' }`}>
				<span></span>
				<span></span>
				<span></span>
			</div>
		);
	}
}
