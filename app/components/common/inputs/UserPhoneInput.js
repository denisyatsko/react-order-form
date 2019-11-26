// Core
import React from 'react';
import ReactPhoneInput from 'react-phone-input-2';
import { withFormsy } from 'formsy-react';

// Styles
import styles from './styles.css';
import 'react-phone-input-2/dist/style.css';

@withFormsy
export class UserPhoneInput extends React.Component {
  _changeValue = (event) => {
    const { _mergeState, setValue, name } = this.props;
    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    // Important: Don't skip this step. This pattern is required
    // for Formsy to work.
    setValue(event);
    _mergeState && _mergeState({ order: {[name]: event}});
  };

  render() {
    const { name, labeltext, getErrorMessage, getValue } = this.props;

    const excludeCountries = [];

    return (
      <div className={styles.item}>
        { labeltext && <label className='itemTitle' htmlFor={name}>{labeltext}</label> }
        <ReactPhoneInput
          inputExtraProps={{
            autoComplete: 'off',
            placeholder: 'Enter phone number',
            id: `${name}`
          }}
          excludeCountries={excludeCountries}
          value={getValue() || ''}
          onChange={this._changeValue}
          inputClass={getErrorMessage() ? `${styles.error}` : ''}
        />
        <span className={styles.errorMessage}>{getErrorMessage()}</span>
      </div>
    );
  }
}
