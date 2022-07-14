import React from 'react';
import PropTypes from 'prop-types';

import Footer from './Footer';
import Navbar from './Navbar';

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="container-fluid pt-2">
        {children}
      </div>
      <Footer />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType(
    [PropTypes.arrayOf(PropTypes.element),
      PropTypes.element],
  ).isRequired,
};

export default Layout;
