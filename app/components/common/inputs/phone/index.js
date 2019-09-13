// // Core
import React from 'react';
import ReactPhoneInput from 'react-phone-input-2';
import { withFormsy } from 'formsy-react';

// // Instruments
import styles from '../styles.css';
import 'react-phone-input-2/dist/style.css';

class UserPhoneInput extends React.Component {
  state = {
    phone: ''
  };

  _changeValue = (event) => {
    const { _mergeState, setValue, name } = this.props;
    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    // Important: Don't skip this step. This pattern is required
    // for Formsy to work.
    setValue(event);
    _mergeState('order', { [name]: event });
  };

  render() {
    const { name, labeltext, placeholder } = this.props;

    // An error message is returned only if the component is invalid
    const errorMessage = this.props.getErrorMessage();

    const className = this.props.getErrorMessage() ? `${styles.error}` : '';

    const excludeCountries = [];

    return (
      <div className={styles.item}>
        <label
          htmlFor={name}
          className={styles.title}>
          {labeltext}
        </label>
        <ReactPhoneInput
          excludeCountries={excludeCountries}
          inputClass={className}
          id={name}
          placeholder={placeholder}
          onChange={this._changeValue}
          value={this.props.getValue() || ''}
        />
        <span className={styles.errorMessage}>{errorMessage}</span>
      </div>
    );
  }
}
export default withFormsy(UserPhoneInput);
