import React from 'react';
import { Link } from 'react-router-dom';

import barcelonaLogo from '../images/teams/barcelona.png';

const BarcelonaLogo = ({ width, height, linkTo }) => {
  const template = (
    <div
      style={{
        width,
        height,
        background: `url(${barcelonaLogo}) center / contain no-repeat`
      }}></div>
  );
  if (linkTo) {
    return <Link to={linkTo}>{template}</Link>;
  } else return template;
};

export default BarcelonaLogo;
