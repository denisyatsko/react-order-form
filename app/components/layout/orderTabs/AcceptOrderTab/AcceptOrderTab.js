// Core
import React, { Component, createRef } from 'react';

// Components
import { withProfile } from 'components/HOC/withProfile';
import { StarRating } from 'components/ui/export/';
import { Textarea, Preloader } from 'components/common/export';

// Instruments
import { config } from 'config';
import OrderAPI from 'api/orders/OrderAPI';
import { FeedbackRequest } from 'api/orders/requests';

// Styles
import styles from './styles.css';

@withProfile
export class AcceptOrderTab extends Component {
  constructor(props) {
    super(props);
    this.StarRatingRef = createRef();
  }

  initialState = {
    rating: 0,
    feedback: '',
    isLoading: false,
  };

  state = { ...this.initialState };

  _sentRequest = () => {
    const { orderId, _showCustomPopup } = this.props;

    this.setState({ isLoading: true });

    new OrderAPI().feedback(new FeedbackRequest({ ...this.state, id: orderId })).then(() => {
      this.StarRatingRef.current.setRate(0);
      this.setState({ ...this.initialState });

      _showCustomPopup(config.orderActionText.accept);
    });
  };

  render() {
    const { feedback, isLoading } = this.state;

    const onChangeRatingHandler = (rating) => {
      this.setState({ rating });
    };

    const onChangeTextareaHandler = (e) => {
      this.setState({ feedback: e.target.value });
    };

    return (
      <div>
        <h1 className={styles.title}>Thank you for using Aussiehomework.com!</h1>
        <p className={styles.text}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus dolorem rerum
          aspernatur officia
          reprehenderit, facilis vero facere non? Vero porro mollitia optio Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Accusamus dolorem rerum aspernatur officia reprehenderit, facilis vero facere non? Vero
          porro mollitia optio</p>
        <Textarea
          name='feedback'
          placeholder='Type something'
          labeltext='feedback'
          value={feedback}
          onChange={(e) => onChangeTextareaHandler(e)}
        />
        <div className={styles.scaleContainer}>
          <span className='itemTitle'>Satisfaction scale:</span>
          <StarRating
            ref={this.StarRatingRef}
            onChangeHandler={onChangeRatingHandler}
          />
        </div>
        {isLoading
          ? <Preloader size={40}/>
          : <button
            type='button'
            className={`btn btn--primary`}
            onClick={this._sentRequest}
          >Accept Order
          </button>}
      </div>
    );
  }
}
