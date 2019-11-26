// Core
import React, { Component } from 'react';

// Components
import { withProfile } from 'components/HOC/withProfile';
import { Textarea, Preloader } from 'components/common/export';

// Instruments
import { config } from 'config';
import OrderAPI from 'api/orders/OrderAPI';
import { RefundRequest } from 'api/orders/requests';

// Styles
import styles from './styles.css';

@withProfile
export class RefundOrderTab extends Component {
  initialState = {
    content: '',
    grammar: '',
    sources: '',
    format: '',
    instructions_not_followed: '',
    other: '',
    isLoading: false,
  };

  state = { ...this.initialState };

  _sentRequest = () => {
    const { orderId, _showCustomPopup } = this.props;

    this.setState({ isLoading: true });

    new OrderAPI().refund(new RefundRequest({ ...this.state, id: orderId })).then(() => {
      this.setState({ ...this.initialState });

      _showCustomPopup(config.orderActionText.refund);
    });
  };

  render() {
    const {
      other,
      format,
      content,
      grammar,
      sources,
      isLoading,
      instructions_not_followed,
    } = this.state;

    const onChangeHandler = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    };

    return (
      <div>
        <h1 className={styles.title}>Before you proceed with revision, please check our Money-Back Warranty</h1>
        <p className={styles.text}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus dolorem rerum
          aspernatur officia
          reprehenderit, facilis vero facere non? Vero porro mollitia optio Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Accusamus dolorem rerum aspernatur officia reprehenderit, facilis vero facere non? Vero
          porro mollitia optio</p>
        <Textarea
          name='content'
          placeholder='Type something'
          labeltext='Content'
          value={content}
          maxLength={config.maxTextareaContentLength}
          onChange={onChangeHandler}
        />
        <Textarea
          name='grammar'
          placeholder='Type something'
          labeltext='Grammar'
          value={grammar}
          maxLength={config.maxTextareaContentLength}
          onChange={onChangeHandler}
        />
        <Textarea
          name='sources'
          placeholder='Type something'
          labeltext='Sources'
          value={sources}
          maxLength={config.maxTextareaContentLength}
          onChange={onChangeHandler}
        />
        <Textarea
          name='format'
          placeholder='Type something'
          labeltext='Format'
          value={format}
          maxLength={config.maxTextareaContentLength}
          onChange={onChangeHandler}
        />
        <Textarea
          name='instructions_not_followed'
          placeholder='Type something'
          labeltext='Instructions Not Followed'
          value={instructions_not_followed}
          maxLength={config.maxTextareaContentLength}
          onChange={onChangeHandler}
        />
        <Textarea
          name='other'
          placeholder='Type something'
          labeltext='Other'
          value={other}
          maxLength={config.maxTextareaContentLength}
          onChange={onChangeHandler}
        />
        {isLoading
          ? <Preloader size={40}/>
          : <button
            type='button'
            className={`btn btn--primary`}
            onClick={this._sentRequest}
          >Request refund
          </button>}
      </div>
    );
  }
}
