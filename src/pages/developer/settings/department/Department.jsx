import React from "react";
import { FaPlus } from "react-icons/fa";
import Layout from "../../layout";
import { StoreContext } from "../../../../store/StoreContext";
import { setIsAdd } from "../../../../store/StoreAction";
import DepartmentList from "./DepartmentList";
import ModalAddDepartment from "./ModalAddDepartment";

const Department = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  const handleAdd = () => {
    setItemEdit(null);
    dispatch(setIsAdd(true));
  };

  return (
    <>
      <Layout menu="settings" submenu="department">
        <div className="flex items-center justify-between w-full">
          <h1>Department</h1>
          <div>
            <button
              type="button"
              className="flex items-center gap-1 hover:underline"
              onClick={handleAdd}
            >
              <FaPlus className="text-primary" />
              Add
            </button>
          </div>
        </div>

        <div>
          <DepartmentList itemEdit={itemEdit} setItemEdit={setItemEdit} />
        </div>
      </Layout>

      {store.isAdd && (
        <ModalAddDepartment itemEdit={itemEdit} setItemEdit={setItemEdit} />
      )}
    </>
  );
};

export default Department;
