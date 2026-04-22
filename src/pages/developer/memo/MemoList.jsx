import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { useInView } from "react-intersection-observer";
import {
  FaArchive,
  FaEdit,
  FaEye,
  FaTrash,
  FaTrashRestore,
} from "react-icons/fa";
import { queryDataInfinite } from "../../../functions/custom-hooks/queryDataInfinite";
import { apiVersion, formatDate } from "../../../functions/functions-general";
import NoData from "../../../partials/NoData";
import SearchBar from "../../../partials/SearchBar";
import ServerError from "../../../partials/ServerError";
import Status from "../../../partials/Status";
import TableLoading from "../../../partials/TableLoading";
import FetchingSpinner from "../../../partials/spinners/FetchingSpinner";
import Loadmore from "../../../partials/Loadmore";
import ModalArchive from "../../../partials/modals/ModalArchive";
import ModalDelete from "../../../partials/modals/ModalDelete";
import ModalRestore from "../../../partials/modals/ModalRestore";
import { StoreContext } from "../../../store/StoreContext";
import {
  setIsAdd,
  setIsArchive,
  setIsDelete,
  setIsRestore,
} from "../../../store/StoreAction";

const MemoList = ({ itemEdit, setItemEdit, setItemView, setIsViewOpen }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const { ref, inView } = useInView();

  const search = React.useRef(null);
  const [onSearch, setOnSearch] = React.useState(false);
  const [filterData, setFilterData] = React.useState("");

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  const handleArchive = (item) => {
    dispatch(setIsArchive(true));
    setItemEdit(item);
  };

  const handleRestore = (item) => {
    dispatch(setIsRestore(true));
    setItemEdit(item);
  };

  const handleDelete = (item) => {
    dispatch(setIsDelete(true));
    setItemEdit(item);
  };

  const handleView = (item) => {
    setItemView(item);
    setIsViewOpen(true);
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
    error,
  } = useInfiniteQuery({
    queryKey: [
      "memo",
      search.current?.value || "",
      store.isSearch,
      filterData,
      onSearch,
    ],
    queryFn: ({ pageParam = 0 }) =>
      queryDataInfinite(
        "",
        `${apiVersion}/controllers/developers/memo/page.php?start=${pageParam}`,
        false,
        {
          filterData,
          searchValue: search.current?.value || "",
        },
        "post",
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total) {
        return lastPage.page + lastPage.count;
      }
      return undefined;
    },
    initialPageParam: 0,
  });

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  const memo = data?.pages?.flatMap((page) => page.data ?? []) ?? [];

  return (
    <>
      <div className="table-wrapper">
        <div className="flex items-center justify-between mb-4">
          <div className="relative">
            <label>Status</label>
            <select
              value={filterData}
              onChange={(e) => setFilterData(e.target.value)}
            >
              <option value="">All</option>
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>

          <SearchBar
            search={search}
            dispatch={dispatch}
            store={store}
            result={data}
            isFetching={isFetching}
            setOnSearch={setOnSearch}
            onSearch={onSearch}
          />
        </div>

        <table>
          <thead>
            <tr>
              <th>Status</th>
              <th>From</th>
              <th>To</th>
              <th>Date</th>
              <th>Category</th>
              <th>Created</th>
              <th>Updated</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="8">
                  <TableLoading cols={8} count={10} />
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="8">
                  <ServerError />
                </td>
              </tr>
            ) : memo.length === 0 ? (
              <tr>
                <td colSpan="8">
                  <NoData />
                </td>
              </tr>
            ) : (
              memo.map((item, key) => (
                <tr key={key}>
                  <td>
                    <Status
                      text={item.memo_is_active == 1 ? "active" : "inactive"}
                    />
                  </td>
                  <td>{item.memo_from}</td>
                  <td>{item.memo_to}</td>
                  <td>{item.memo_date}</td>
                  <td>{item.memo_category}</td>
                  <td>{formatDate(item.memo_created)}</td>
                  <td>{formatDate(item.memo_updated)}</td>
                  <td>
                    <div className="table-action flex gap-2">
                      <button type="button" onClick={() => handleView(item)}>
                        <FaEye />
                      </button>

                      {item.memo_is_active == 1 ? (
                        <>
                          <button
                            type="button"
                            onClick={() => handleEdit(item)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleArchive(item)}
                          >
                            <FaArchive />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => handleRestore(item)}
                          >
                            <FaTrashRestore />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(item)}
                          >
                            <FaTrash />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div ref={ref}>
          {isFetchingNextPage && <FetchingSpinner />}
          {hasNextPage && <Loadmore />}
        </div>
      </div>

      {store.isArchive && itemEdit && (
        <ModalArchive
          mysqlApiArchive={`${apiVersion}/controllers/developers/memo/active.php?id=${itemEdit.memo_aid}`}
          msg="Are you sure you want to archive this memo?"
          successMsg="Successfully archived."
          item={itemEdit.memo_category}
          dataItem={itemEdit}
          queryKey="memo"
        />
      )}

      {store.isRestore && itemEdit && (
        <ModalRestore
          mysqlApiRestore={`${apiVersion}/controllers/developers/memo/active.php?id=${itemEdit.memo_aid}`}
          msg="Are you sure you want to restore this memo?"
          successMsg="Successfully restored."
          item={itemEdit.memo_category}
          dataItem={itemEdit}
          queryKey="memo"
        />
      )}

      {store.isDelete && itemEdit && (
        <ModalDelete
          mysqlApiDelete={`${apiVersion}/controllers/developers/memo/delete.php?id=${itemEdit.memo_aid}`}
          msg="Are you sure you want to delete this memo?"
          successMsg="Successfully deleted."
          item={itemEdit.memo_category}
          dataItem={itemEdit}
          queryKey="memo"
        />
      )}
    </>
  );
};

export default MemoList;
