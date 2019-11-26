// Core
import React, { Component } from 'react';

// Components
import { withProfile } from 'components/HOC/withProfile';
import { Textarea, Preloader, Dropdown } from 'components/common/export';

// Instruments
import { config } from 'config';
import OrderAPI from 'api/orders/OrderAPI';
import { RevisionRequest } from 'api/orders/requests';

// Styles
import styles from './styles.css';

@withProfile
export class RevisionOrderTab extends Component {
  initialState = {
    other: '',
    format: '',
    content: '',
    grammar: '',
    sources: '',
    isLoading: false,
    instructions_not_followed: '',
    revisionDeadline: config.revisionDeadline[config.revisionDeadline.length-1].value,
  };

  state = { ...this.initialState };

  _sentRequest = () => {
    const { orderId, _showCustomPopup } = this.props;

    this.setState({ isLoading: true });

    new OrderAPI().revision(new RevisionRequest({
      ...this.state,
      id: orderId,
      client_time: Date.now() / 1000 | 0,
    })).then(() => {
      this.setState({ ...this.initialState });

      _showCustomPopup(config.orderActionText.revision);
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
      revisionDeadline,
      instructions_not_followed,
    } = this.state;

    const onChangeHandler = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    };

    const deadlineOnChangeHandler = (e) => {
      this.setState({ revisionDeadline: e.value });
    };

    return(
      <div>
        <h1 className={styles.title}>Before you proceed with revision, please check our Revision Policy</h1>
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
        <Dropdown
          labeltext='Time for revision'
          searchable={false}
          value={revisionDeadline}
          options={config.revisionDeadline}
          onChange={deadlineOnChangeHandler}
        />
        {isLoading
          ? <Preloader size={40}/>
          : <button
            type='button'
            className={`btn btn--primary`}
            onClick={this._sentRequest}
          >Request revision
          </button>}
      </div>
    )
  }
}
