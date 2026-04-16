import React from "react";
import { FaPlus } from "react-icons/fa";
import { StoreContext } from "../../../store/StoreContext";
import { setIsAdd } from "../../../store/StoreAction";
import Layout from "../layout";

const Dashboard = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };
  return (
    <>
      <Layout menu="settings">
        {/* Page Header */}
        <div className="flex items-center justify-between w-full">
          <h1>Dashboard</h1>
          <div>
            <button
              type="button"
              className="flex items-center gap-1 hover:underline"
              //   onClick={handleAdd}
            >
              <FaPlus className="text-primary" />
              Add
            </button>
          </div>
        </div>
        {/* Page Content */}
        <div>
          {/* <RolesList itemEdit={itemEdit} setItemEdit={setItemEdit} /> */}
        </div>
      </Layout>

      {/* {store.isAdd && <ModalAddRoles itemEdit={itemEdit} />} */}
    </>
  );
};

export default Dashboard;
