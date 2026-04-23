import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaTimes } from "react-icons/fa";
import { InputText } from "../../../../components/form-input/FormInputs";
import { queryData } from "../../../../functions/custom-hooks/queryData";
import { apiVersion } from "../../../../functions/functions-general";
import MessageError from "../../../../partials/MessageError";
import ModalWrapperSide from "../../../../partials/modals/ModalWrapperSide";
import ButtonSpinner from "../../../../partials/spinners/ButtonSpinner";
import { StoreContext } from "../../../../store/StoreContext";
import {
  setError,
  setIsAdd,
  setMessage,
  setSuccess,
} from "../../../../store/StoreAction";

const ModalAddDepartment = ({ itemEdit, setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `${apiVersion}/controllers/developers/settings/department/department.php?id=${itemEdit.department_aid}`
          : `${apiVersion}/controllers/developers/settings/department/department.php`,
        itemEdit ? "put" : "post",
        values,
      ),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["department"] });

      if (data.success) {
        dispatch(setSuccess(true));
        dispatch(setMessage(data.message));
        dispatch(setIsAdd(false));
        setItemEdit(null);
      } else {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
      }
    },
  });

  const handleClose = () => {
    dispatch(setIsAdd(false));
    setItemEdit(null);
  };

  const initVal = {
    department_name: itemEdit?.department_name || "",
  };

  const yupSchema = Yup.object({
    department_name: Yup.string().required("Required"),
  });

  const onHandleSubmit = (values) => {
    mutation.mutate(values);
  };

  return (
    <>
      <ModalWrapperSide>
        <div className="modal-side">
          <div className="modal-header">
            <h3>{itemEdit ? "Edit Department" : "Add Department"}</h3>
            <button onClick={handleClose}>
              <FaTimes />
            </button>
          </div>

          <Formik
            initialValues={initVal}
            validationSchema={yupSchema}
            onSubmit={onHandleSubmit}
          >
            {() => (
              <Form className="h-full">
                <div className="modal-form-container">
                  <div className="modal-container">
                    <div className="relative mb-6">
                      <InputText
                        label="Department Name"
                        name="department_name"
                        type="text"
                        disabled={mutation.isPending}
                      />
                    </div>

                    {store.error && <MessageError />}
                  </div>
                </div>

                <div className="modal-action">
                  <button
                    type="submit"
                    className="btn btn-add"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? (
                      <ButtonSpinner />
                    ) : itemEdit ? (
                      "Save"
                    ) : (
                      "Add"
                    )}
                  </button>

                  <button
                    type="button"
                    className="btn btn-cancel"
                    onClick={handleClose}
                    disabled={mutation.isPending}
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </ModalWrapperSide>
    </>
  );
};

export default ModalAddDepartment;
