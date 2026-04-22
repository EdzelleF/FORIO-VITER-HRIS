import React from "react";
import * as Yup from "yup";
import { FaPlus } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Layout from "../layout";
import { StoreContext } from "../../../store/StoreContext";
import {
  setError,
  setIsAdd,
  setMessage,
  setSuccess,
} from "../../../store/StoreAction";
import { queryData } from "../../../functions/custom-hooks/queryData";
import { apiVersion } from "../../../functions/functions-general";
import MemoList from "./MemoList";
import ModalAddMemo from "./ModalAddMemo";
import ModalViewMemo from "./ModalViewMemo";

const Memo = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const queryClient = useQueryClient();

  const [itemEdit, setItemEdit] = React.useState(null);
  const [itemView, setItemView] = React.useState(null);
  const [isViewOpen, setIsViewOpen] = React.useState(false);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  const handleClose = () => {
    dispatch(setIsAdd(false));
  };

  const memoValidationSchema = Yup.object({
    memo_from: Yup.string().trim().required("required."),
    memo_to: Yup.string().trim().required("required."),
    memo_date: Yup.string().trim().required("required."),
    memo_category: Yup.string().trim().required("required."),
    memo_text: Yup.string().trim().required("required."),
  });

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `${apiVersion}/controllers/developers/memo/memo.php?id=${itemEdit.memo_aid}`
          : `${apiVersion}/controllers/developers/memo/memo.php`,
        itemEdit ? "put" : "post",
        values,
      ),
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ["memo"] });
        setItemEdit(null);
        dispatch(setSuccess(true));
        dispatch(setMessage(`Successfully ${itemEdit ? "updated" : "added"}`));
        dispatch(setIsAdd(false));
      } else {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
      }
    },
  });
  const onHandleSubmit = (values) => {
    dispatch(setError(false));
    mutation.mutate(values);
  };

  return (
    <>
      <Layout menu="memo">
        <div className="flex items-center justify-between w-full">
          <h1>Memo</h1>
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
          <MemoList
            itemEdit={itemEdit}
            setItemEdit={setItemEdit}
            itemView={itemView}
            setItemView={setItemView}
            isViewOpen={isViewOpen}
            setIsViewOpen={setIsViewOpen}
          />
        </div>
      </Layout>

      {store.isAdd && (
        <ModalAddMemo
          itemEdit={itemEdit}
          mutation={mutation}
          store={store}
          handleClose={handleClose}
          onHandleSubmit={onHandleSubmit}
          memoValidationSchema={memoValidationSchema}
        />
      )}

      {isViewOpen && itemView && (
        <ModalViewMemo
          itemView={itemView}
          handleClose={() => setIsViewOpen(false)}
        />
      )}
    </>
  );
};

export default Memo;
