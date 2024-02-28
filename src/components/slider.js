import React from 'react';
import {BANNER} from '../lib/const';
import Slideshow from '../lib/Slideshow';

const Slider = () => {
  return (
    <Slideshow
      dataSource={[{url: BANNER}, {url: BANNER}, {url: BANNER}]}
    />
  );
};

export default Slider;
