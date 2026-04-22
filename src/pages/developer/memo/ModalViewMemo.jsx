import React from "react";
import ModalWrapperCenter from "../../../partials/modals/ModalWrapperCenter";

const ModalViewMemo = ({ itemView, handleClose }) => {
  return (
    <ModalWrapperCenter handleClose={handleClose}>
      <div className="bg-white w-full max-w-[920px] mx-auto rounded-xl px-10 pt-10 pb-8 relative max-h-[90vh] flex flex-col">
        <div className="grid grid-cols-[140px_1fr] gap-y-4 gap-x-6 border-b border-line pb-6 mb-6 shrink-0">
          <p className="font-bold">To:</p>
          <p>{itemView.memo_to}</p>

          <p className="font-bold">From:</p>
          <p>{itemView.memo_from}</p>

          <p className="font-bold">Date:</p>
          <p>{itemView.memo_date}</p>

          <p className="font-bold">Category:</p>
          <p>{itemView.memo_category}</p>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 min-h-0">
          <div className="space-y-4 leading-8 whitespace-pre-wrap">
            <p>{itemView.memo_text}</p>
          </div>
        </div>

        <div className="flex justify-end mt-6 pt-4 border-t border-line shrink-0">
          <button
            type="button"
            onClick={handleClose}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 transition"
          >
            Close
          </button>
        </div>
      </div>
    </ModalWrapperCenter>
  );
};

export default ModalViewMemo;
