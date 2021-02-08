import * as React from 'react';
import CustomSpinner from '@components/custom-spinner/CustomSpinner.component';

import './HerokuSpinner.styles.css';

const HerokuSpinner = () => {
  return (
    <div className='spinner-container'>
      <CustomSpinner size={50} />
      <p className='spinner-text'>
        Waking server... This will take a few moments
      </p>
    </div>
  );
};

export default HerokuSpinner;
