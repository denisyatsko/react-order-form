// Core
import React from 'react';
import VirtualizedSelect from 'react-virtualized-select';
import styled from '@emotion/styled';

// Styles
import styles from './styles.css';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';

export const Dropdown = (props) => {
  const {
    value,
    options,
    onChange,
    labeltext,
    searchable,
    placeholder,
  } = props;


  return (
    <div className={styles.item}>
      <span className={styles.title}>{labeltext}</span>
      <StyledDropdown
        options={options}
        onChange={onChange}
        value={value}
        searchable={searchable}
        placeholder={placeholder}/>
    </div>
  );
};

const StyledDropdown = styled(VirtualizedSelect)`
  &.is-open .Select-control,
  &.is-focused .Select-control {
    border-radius: var(--borderRadius) !important;
    border-color: var(--accent) !important;
    box-shadow: none !important;
    outline: none !important;
  }
  
  .Select-control {
    border-radius: var(--borderRadius);
    padding: 0 10px 0 15px;
    border-width: 2px;
    border: 2px solid var(--inputBorderColor);
    cursor: pointer;
    transition: all .2s ease-in-out;
    
    &:hover,
    &:focus {
      border-color: var(--accent) !important;
      box-shadow: none !important;
    }
  }
  
  .Select-clear-zone {
    display: none;
  }
  
  .Select-menu-outer {
    border-radius: var(--borderRadius);
    z-index: 15;
    overflow: hidden;
    border: 2px solid var(--inputBorderColor);
    transition: all .2s ease-in-out;
  }
  
  .Select-menu-outer:hover {
    border-color: var(--accent);
  }
  
  .VirtualizedSelectFocusedOption {
    background-color: var(--accent);
    color: #fff;
  }
  
  .VirtualizedSelectOption {
    font-size: 14px;
  }
  
  .Select-value-label {
    font-size: 14px;
    line-height: 14px;
    color: var(--textColor) !important;
  }
  
  .Select-placeholder {
    font-size: 14px;
  }
`;
