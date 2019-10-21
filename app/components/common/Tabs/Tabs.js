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
          const { label } = child.props;

          return (
            <div
              key={label}
              active={activeTab === label ? 'active' : null}
              onClick={() => setActiveTab(label)}
            >
              {label}
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
