// Core
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import Rating from 'react-rating';
import { IoIosStarOutline, IoIosStar } from 'react-icons/io';

export const StarRating = forwardRef((props, ref) => {
  const { onChangeHandler } = props;

  const [rate, setRate] = useState(0);

  useImperativeHandle(ref, () => {
    return {
      setRate: setRate
    }
  });

  return (
    <Rating
      placeholderRating={1}
      placeholderSymbol={<IoIosStarOutline/>}
      style={{ color: '#ffd055' }}
      emptySymbol={<IoIosStarOutline/>}
      fullSymbol={<IoIosStar/>}
      onClick={setRate}
      initialRating={rate}
      onChange={onChangeHandler}
      stop={10}
    />
  );
});
