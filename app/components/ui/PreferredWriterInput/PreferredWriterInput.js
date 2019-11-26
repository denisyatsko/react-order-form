// Core
import React, { Component } from 'react';

// Components
import { withProfile } from 'components/HOC/withProfile';
import { Input } from 'components/common/export';

// Instruments
import OrderAPI from 'api/orders/OrderAPI';
import { CheckWriterRequest } from 'api/orders/requests';

@withProfile
export class PreferredWriterInput extends Component {
  constructor(props) {
    super(props);
    this.timer = null;
  }

  initialState = {
    error: false,
    success: false,
  };

  state = { ...this.initialState };

  _onChangeWriterId = (event) => {
    const { _mergeState } = this.props;

    clearTimeout(this.timer);

    _mergeState({ order: { preferred_writer: event.target.value.replace(/\D/, '') } });

    this.timer = setTimeout(this._triggerChange, 1000);

    this.setState({ error: false });
  };

  _triggerChange = () => {
    const { state } = this.props;

    if (state.order.preferred_writer !== '') {
      new OrderAPI().checkWriter(new CheckWriterRequest({ id: state.order.preferred_writer })).then(() => {
        this.setState({
          success: true,
          error: false,
        });
      }).catch(e => {
        this.setState({
          error: e,
          success: false,
        });
      });
    } else {
      this.setState({ ...this.initialState });
    }
  };

  render() {
    const { state } = this.props;
    const { error } = this.state;

    return (
      <Input
        error={error}
        name='preferred_writer'
        type='text'
        value={state.order.preferred_writer}
        placeholder="Writer's ID"
        onChange={(event) => this._onChangeWriterId(event)}
        labeltext='Preferred writer'
      />
    );
  }
}
