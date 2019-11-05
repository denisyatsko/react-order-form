// Core
import React, { Component } from 'react';
import InlineSVG from 'svg-inline-react';
import { withRouter } from 'react-router-dom';

// Components
import { withProfile } from 'components/HOC/withProfile';

// Styles
import styles from './styles.css';

@withRouter
@withProfile
export class LogOutButton extends Component {
  render() {
    const { _logOut } = this.props;

    const handlerOnClick = () => _logOut();

    const svgSource = `<svg 
				xmlns = "http://www.w3.org/2000/svg"
				viewBox = "0 0 512 512">
				<g>
					<path d = "M505.664,243.739l-54.783-38.622c-9.926-6.997-23.645,0.128-23.645,12.26v23.622H164.196    c-8.284,0-15.001,6.716-15.001,15.001S155.912,271,164.196,271h263.038v23.621c0,12.212,13.792,19.204,23.644,12.26l54.783-38.622    C514.027,262.365,514.196,249.767,505.664,243.739z"/>
				</g>
				<g>
					<path d = "M430.471,352.317c-7.169-4.146-16.347-1.698-20.496,5.474c-35.236,60.916-101.103,101.811-176.372,101.811    c-112.266,0-203.602-91.336-203.602-203.602S121.337,52.398,233.603,52.398c75.319,0,141.156,40.933,176.371,101.809    c4.148,7.172,13.328,9.619,20.496,5.474c7.171-4.148,9.621-13.325,5.474-20.496C395.418,69.127,319.729,22.397,233.603,22.397    C104.49,22.397,0,126.876,0,256c0,129.113,104.479,233.603,233.603,233.603c86.163,0,161.833-46.763,202.342-116.79    C440.092,365.642,437.642,356.466,430.471,352.317z"/>
				</g>
			</svg>`;


    return (
      <button
        type='button'
        title='logout'
        className={styles.logOut}
        onClick={handlerOnClick}>
        <InlineSVG src={svgSource}/>
      </button>
    );
  }
}
