import React from "react";
import { FaArchive, FaEdit, FaTrash, FaTrashRestore } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  apiVersion,
  formatDate,
} from "../../../../functions/functions-general";
import { queryDataInfinite } from "../../../../functions/custom-hooks/queryDataInfinite";
import NoData from "../../../../partials/NoData";
import FetchingSpinner from "../../../../partials/spinners/FetchingSpinner";
import TableLoading from "../../../../partials/TableLoading";
import Status from "../../../../partials/Status";
import ServerError from "../../../../partials/ServerError";
import SearchBar from "../../../../partials/SearchBar";
import Loadmore from "../../../../partials/Loadmore";
import ModalArchive from "../../../../partials/modals/ModalArchive";
import ModalRestore from "../../../../partials/modals/ModalRestore";
import ModalDelete from "../../../../partials/modals/ModalDelete";
import { StoreContext } from "../../../../store/StoreContext";
import {
  setIsAdd,
  setIsArchive,
  setIsDelete,
  setIsRestore,
} from "../../../../store/StoreAction";

const DepartmentList = ({ itemEdit, setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);

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

  const [page, setPage] = React.useState(1);
  const [filterData, setFilterData] = React.useState("");
  const [onSearch, setOnSearch] = React.useState(false);
  const search = React.useRef({ value: "" });
  const { ref, inView } = useInView();
  let counter = 1;

  const {
    data: result,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["department", search.current.value, store.isSearch, filterData],
    queryFn: async ({ pageParam = 0 }) =>
      await queryDataInfinite(
        ``,
        `${apiVersion}/controllers/developers/settings/department/page.php?start=${pageParam}`,
        false,
        {
          filterData,
          searchValue: search?.current?.value,
        },
        `post`,
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total) {
        return lastPage.page + lastPage.count;
      }
      return undefined;
    },
    refetchOnWindowFocus: false,
    initialPageParam: 0,
  });

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="relative">
          <label htmlFor="">Status</label>
          <select
            onChange={(e) => setFilterData(e.target.value)}
            value={filterData}
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
          result={result}
          isFetching={isFetching}
          setOnSearch={setOnSearch}
          onSearch={onSearch}
        />
      </div>

      <div className="relative pt-4 rounded-md">
        {status !== "pending" && isFetching && <FetchingSpinner />}

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Status</th>
              <th>Department Name</th>
              <th>Created</th>
              <th>Updated</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {!error &&
              (status === "pending" || result?.pages?.[0]?.count == 0) && (
                <tr>
                  <td colSpan="100%" className="p-10">
                    {status === "pending" ? (
                      <TableLoading cols={2} count={20} />
                    ) : (
                      <NoData />
                    )}
                  </td>
                </tr>
              )}

            {error && (
              <tr>
                <td colSpan="100%" className="p-10">
                  <ServerError />
                </td>
              </tr>
            )}

            {result?.pages?.map((pageData, pageIndex) => (
              <React.Fragment key={pageIndex}>
                {pageData?.data?.map((item, key) => {
                  return (
                    <tr key={key}>
                      <td>{counter++}</td>

                      <td>
                        <Status
                          text={
                            item.department_is_active == 1
                              ? "active"
                              : "inactive"
                          }
                        />
                      </td>

                      <td>{item.department_name}</td>

                      <td>{formatDate(item.department_created)}</td>

                      <td>{formatDate(item.department_updated)}</td>

                      <td>
                        <div className="flex items-center gap-3">
                          {item.department_is_active == 1 ? (
                            <>
                              <button
                                type="button"
                                className="tooltip-action-table"
                                data-tooltip="Edit"
                                onClick={() => handleEdit(item)}
                              >
                                <FaEdit />
                              </button>

                              <button
                                type="button"
                                className="tooltip-action-table"
                                data-tooltip="Archive"
                                onClick={() => handleArchive(item)}
                              >
                                <FaArchive />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                type="button"
                                className="tooltip-action-table"
                                data-tooltip="Restore"
                                onClick={() => handleRestore(item)}
                              >
                                <FaTrashRestore />
                              </button>

                              <button
                                type="button"
                                className="tooltip-action-table"
                                data-tooltip="Delete"
                                onClick={() => handleDelete(item)}
                              >
                                <FaTrash />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        <div className="loadmore flex justify-center flex-col items-center pb-10">
          <Loadmore
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
            result={result?.pages?.[0]}
            setPage={setPage}
            page={page}
            refView={ref}
            isSearchOrFilter={store.isSearch || result?.isFilter}
          />
        </div>
      </div>

      {store.isArchive && itemEdit && (
        <ModalArchive
          mysqlApiArchive={`${apiVersion}/controllers/developers/settings/department/active.php?id=${itemEdit.department_aid}`}
          msg="Are you sure you want to archive this department?"
          successMsg="Successfully archived."
          item={itemEdit.department_name}
          dataItem={itemEdit}
          queryKey="department"
        />
      )}

      {store.isRestore && itemEdit && (
        <ModalRestore
          mysqlApiRestore={`${apiVersion}/controllers/developers/settings/department/active.php?id=${itemEdit.department_aid}`}
          msg="Are you sure you want to restore this department?"
          successMsg="Successfully restored."
          item={itemEdit.department_name}
          dataItem={itemEdit}
          queryKey="department"
        />
      )}

      {store.isDelete && itemEdit && (
        <ModalDelete
          mysqlApiDelete={`${apiVersion}/controllers/developers/settings/department/delete.php?id=${itemEdit.department_aid}`}
          msg="Are you sure you want to delete this department?"
          successMsg="Successfully deleted."
          item={itemEdit.department_name}
          dataItem={itemEdit}
          queryKey="department"
        />
      )}
    </>
  );
};

export default DepartmentList;
