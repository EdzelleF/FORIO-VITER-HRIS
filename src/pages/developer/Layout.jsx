import React from "react";
import Header from "../../partials/header";
import Navigation from "../../partials/Navigation";
import { navList } from "../nav-function";
import ModalSuccess from "../../partials/modals/ModalSuccess";
import { StoreContext } from "../../store/StoreContext";

const Layout = ({ children, menu = "", submenu = "" }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  return (
    <>
      <Header />
      <Navigation menu={menu} submenu={submenu} navigationList={navList} />

      <div className="wrapper">{children}</div>

      {store.success && <ModalSuccess />}
    </>
  );
};

export default Layout;
