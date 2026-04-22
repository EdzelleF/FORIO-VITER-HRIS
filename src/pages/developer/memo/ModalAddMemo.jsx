import React from "react";
import { Formik, Form } from "formik";
import {
  InputText,
  InputTextArea,
} from "../../../components/form-input/FormInputs";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";
import MessageError from "../../../partials/MessageError";
import ModalWrapperSide from "../../../partials/modals/ModalWrapperSide";

const ModalAddMemo = ({
  itemEdit,
  mutation,
  store,
  handleClose,
  onHandleSubmit,
  memoValidationSchema,
}) => {
  return (
    <>
      <ModalWrapperSide>
        <div className="modal-side">
          <Formik
            initialValues={{
              memo_from: itemEdit?.memo_from || "",
              memo_to: itemEdit?.memo_to || "",
              memo_date: itemEdit?.memo_date || "",
              memo_category: itemEdit?.memo_category || "",
              memo_text: itemEdit?.memo_text || "",
            }}
            validationSchema={memoValidationSchema}
            onSubmit={onHandleSubmit}
            enableReinitialize={true} // ✅ ADD THIS
          >
            {() => {
              return (
                <Form className="h-full">
                  <div className="modal-form-container">
                    <div className="modal-container">
                      <div className="relative mb-6">
                        <InputText
                          label="From"
                          name="memo_from"
                          type="text"
                          disabled={mutation.isPending}
                        />
                      </div>

                      <div className="relative mb-6">
                        <InputText
                          label="To"
                          name="memo_to"
                          type="text"
                          disabled={mutation.isPending}
                        />
                      </div>

                      <div className="relative mb-6">
                        <InputText
                          label="Date"
                          name="memo_date"
                          type="date"
                          disabled={mutation.isPending}
                        />
                      </div>

                      <div className="relative mb-6">
                        <InputText
                          label="Category"
                          name="memo_category"
                          type="text"
                          disabled={mutation.isPending}
                        />
                      </div>

                      <div className="relative mb-6">
                        <InputTextArea
                          label="Memo Text"
                          name="memo_text"
                          rows="12"
                          disabled={mutation.isPending}
                        />
                      </div>

                      {store.error && <MessageError />}
                    </div>
                  </div>

                  <div className="modal-action">
                    <button
                      type="submit"
                      className="px-6 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 transition"
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
                      className="px-6 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 transition"
                      onClick={handleClose}
                      disabled={mutation.isPending}
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </ModalWrapperSide>
    </>
  );
};

export default ModalAddMemo;
