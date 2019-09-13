// Core
import React, { Component } from 'react';

// Components
import Dropdown from 'components/common/dropdown';
import Counter from 'components/common/counter';
import FileInput from 'components/ui/DropZone';
import Input from 'components/common/inputs/regular';
import Textarea from 'components/common/textarea';
import { withProfile } from 'components/HOC/withProfile';

// Instruments
import styles from '../styles.css';
import grid from 'theme/grid.css';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';

@withProfile
export default class Step_2 extends Component {
  render() {
    const { state, _setStep, _mergeState } = this.props;

    const transitionStepOptions = {
      classNames: {
        appear: styles.stepAppear,
        appearDone: styles.stepAppearDone,
        enter: styles.stepInStart,
        enterActive: styles.stepInEnd,
        exit: styles.stepOutStart,
        exitActive: styles.stepOutEnd,
        exitDone: styles.stepOutDone,
      },
      timeout: {
        enter: 500,
        exit: 400,
      },
    };

    return (
      <div className={grid.col}>
        <div className={styles.container}>
          <div className={grid.col50}>
            <Dropdown
              options={state.formValues.type_of_paper}
              labeltext='Type of paper'
              onChange={(value) => _mergeState('order', { type_of_paper: value })}
              value={state.order.type_of_paper}
              searchable={false}
              placeholder='Select essay type'/>
            <Dropdown
              options={state.formValues.academic_level}
              value={state.order.academic_level}
              placeholder='Select academic level'
              labeltext='Academic level'
              searchable={false}
              onChange={(value) => _mergeState('order', { academic_level: value })}/>
            <Dropdown
              options={state.formValues.subject_or_discipline}
              value={state.order.subject_or_discipline}
              placeholder='Subject, discipline'
              labeltext='Subject, discipline'
              searchable={false}
              onChange={(value) => _mergeState('order', { subject_or_discipline: value })}/>
            <Input
              name='topic'
              type='text'
              placeholder="Writer's choice"
              onChange={(event) => _mergeState('order', { topic: event.target.value })}
              labeltext='Topic'/>
          </div>
          <div className={grid.col50}>
            <Textarea
              name='paper_details'
              placeholder='Add details'
              labeltext='Paper details'
              onChange={(event) => _mergeState('order', { paper_details: event.target.value })}/>
            <div className={styles.child140}>
              <Counter
                id='number_of_sources'
                labeltext='Sources number'
                count={state.order.number_of_sources}
                _mergeState={_mergeState}/>
              <Dropdown
                options={state.formValues.paper_format}
                value={state.order.paper_format}
                labeltext='Paper format'
                searchable={false}
                onChange={(value) => _mergeState('order', { paper_format: value })}/>
            </div>
            <FileInput
              files={state.order.files}
              _mergeState={_mergeState}/>
          </div>
        </div>
        <button
          onClick={() => _setStep(3)}
          className={`btn btn--primary ${styles.nextBtn}`}>Continue
        </button>
      </div>
    );
  }
}
