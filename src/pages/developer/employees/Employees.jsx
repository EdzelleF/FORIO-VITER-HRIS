import React from "react";
import Layout from "../layout";
import { FaPlus } from "react-icons/fa";
import { StoreContext } from "../../../store/StoreContext";
import EmployeesList from "./EmployeesList";
import ModalAddEmployees from "./ModalAddEmployees";
import { setIsAdd } from "../../../store/StoreAction";

const Employees = () => {
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
          <h1>Employees</h1>
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
        {/* Page Content */}
        <div>
          <EmployeesList itemEdit={itemEdit} setItemEdit={setItemEdit} />
        </div>
      </Layout>

      {store.isAdd && <ModalAddEmployees itemEdit={itemEdit} />}
    </>
  );
};

export default Employees;
