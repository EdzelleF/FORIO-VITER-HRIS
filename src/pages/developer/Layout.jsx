import React from 'react';
import Header from '../../partials/header';
import Navigation from '../../partials/Navigation';
import { navList } from '../nav-function';

const Layout = ({ children, menu = "", submenu = "" }) => {
  return (
    <>
      <Header />
      <Navigation menu={menu} submenu={submenu} navigationList={navList} />

      <main className="wrapper">
        <div>
          {children}
        </div>
        
      </main>
    </>
  );
};

export default Layout;