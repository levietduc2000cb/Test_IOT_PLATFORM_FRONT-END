import React from 'react';
import PropTypes from 'prop-types';

const LogoHeader = ({ hideMenu = false }) => {
  return (
    <div className="flex h-12 items-center justify-center bg-[#D91E1E] text-2xl font-extrabold leading-5 text-white mtb:px-4">
      TLU
      <span className={`${hideMenu ? 'hidden' : 'inline-block'}`}>.io</span>
    </div>
  );
};

LogoHeader.propTypes = {
  hideMenu: PropTypes.bool,
};

export default LogoHeader;
