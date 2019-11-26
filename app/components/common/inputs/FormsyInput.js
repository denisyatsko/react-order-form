// // Core
import React from 'react';
import { withFormsy } from 'formsy-react';

// Styles
import styles from './styles.css';

@withFormsy
export class FormsyInput extends React.Component {
  _changeValue = (event) => {
    const { _mergeState, setValue, name } = this.props;
    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    // Important: Don't skip this step. This pattern is required
    // for Formsy to work.
    setValue(event.currentTarget.value);

    _mergeState && _mergeState({ order: {[name]: event.currentTarget.value }});
  };

  render() {
    const { labeltext, input, getErrorMessage, getValue, name } = this.props;

    return (
      <div className={styles.item}>
        { labeltext && <label className='itemTitle' htmlFor={name}>{labeltext}</label> }
        <input
          id={name}
          {...input}
          onChange={this._changeValue}
          value={getValue() || ''}
          className={getErrorMessage() ? `${styles.error}` : ''}
        />
        <span className={styles.errorMessage}>{getErrorMessage()}</span>
      </div>
    );
  }
}
