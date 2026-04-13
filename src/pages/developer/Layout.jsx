import React from 'react';
import Header from '../../partials/header';
import Navigation from '../../partials/Navigation';
import { navList } from '../nav-function';


const Layout = ({ children, menu = "", submenu = "" }) => {
  return (
    <>
      {/* HEADER */}
      <Header  />

      {/* NAVIGATION */}
      <Navigation menu={menu} submenu={submenu} navigationList={navList} />

      {/* BODY */}
      {children}

      {/* FOOTER */}
    </>
  );
};

export default Layout;