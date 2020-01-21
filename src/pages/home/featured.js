import React from 'react';
import { Fade, Slide } from 'react-reveal';

const Featured = () => {
  return (
    <section className='featured'>
      <div className='container'>
        <div className='featured_wrapper'>
          <div className='featured_info'>
            <Fade left distance='100px' duration={500}>
              <h2 className='featured_header text-warning'>
                Messi's challenges for 2020
              </h2>
            </Fade>
            <Fade left distance='100px' delay={200} duration={500}>
              <p className='featured_descr text-light'>
                Every new year brings new targets, even for somebody who has
                already achieved as much as the Barça superstar
              </p>
            </Fade>
          </div>
          <Fade delay={300}>
            <div className='featured_img'></div>
          </Fade>
        </div>
      </div>
    </section>
  );
};

export default Featured;
