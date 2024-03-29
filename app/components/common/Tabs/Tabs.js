// Core
import React, { useState, forwardRef, useImperativeHandle } from 'react';

export const Tabs = forwardRef((props, ref) => {
  const { children, classNames } = props;

  const [activeTab, setActiveTab] = useState(props.children[0].props.label);

  useImperativeHandle(ref, () => {
    return {
      setActiveTab: setActiveTab
    }
  });

  return (
    <div>
      <div className={classNames}>
        {children.map(child => {
          const { label, jsx, styles } = child.props;

          return (
            <div
              key={label}
              style={styles}
              active={activeTab === label ? 'active' : null}
              onClick={() => setActiveTab(label)}
            >
              <span>{label}</span>
              {jsx}
            </div>
          );
        })}
      </div>
      <div>
        {children.map(child => child.props.label === activeTab && child.props.children)}
      </div>
    </div>
  );
});
