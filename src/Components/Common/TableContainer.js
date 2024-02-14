import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {
  useTable,
  usePagination,
  useRowSelect,
  useGlobalFilter,
  useFilters
} from "react-table";
import { Table, Row, Col, Button, CardBody } from "reactstrap";
import TaskListGlobalFilter from "../../Components/Common/GlobalSearchFilter";

function GlobalFilter({
  isTaskListFilter,
  onFilterChange
}) {
  return (
    <React.Fragment>
      <CardBody className="border border-dashed border-end-0 border-start-0">
        <form>
          <Row>
            {isTaskListFilter && (
              <TaskListGlobalFilter onFilterChange={onFilterChange} />
            )}
          </Row>
        </form>
      </CardBody>

    </React.Fragment>
  );
}

const TableContainer = ({
  columns,
  data,
  totalPages,
  currentPage,
  onPageChange,
  onFilterChange,
  customPageSize,
  totalElements,
  numberOfElements,
  isGlobalSearch,
  isGlobalFilter,
  isTaskListFilter,
  tableClass,
  theadClass,
  trClass,
  thClass,
  divClass
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: customPageSize,
        sortBy: [
          {
            id: 'createdAt',
            desc: true,
          },
        ],
      },
    },
    useGlobalFilter,
    useFilters,
    usePagination,
    useRowSelect,
  );

  const getPaginationMessage = () => {
    const startIndex = currentPage * customPageSize + 1;
    const endIndex = startIndex + numberOfElements - 1;
    return `Showing ${startIndex}-${endIndex} of ${totalElements} results`;
  };

  const onChangeInSelect = (event) => {
    setPageSize(Number(event.target.value));
  };

  const maxPageButtons = 10;
  const startingPageNumber = Math.max(currentPage - maxPageButtons / 2, 0);
  const endingPageNumber = Math.min(startingPageNumber + maxPageButtons, totalPages);

  return (
    <Fragment>
      <Row className="mb-3">
        {isGlobalSearch && (
          <Col md={1}>
            <select
              className="form-select"
              value={pageSize}
              onChange={onChangeInSelect}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </Col>
        )}
        {isGlobalFilter && (
          <GlobalFilter
            setGlobalFilter={setGlobalFilter}
            isTaskListFilter={isTaskListFilter}
            onFilterChange={onFilterChange}
          />
        )}
      </Row>

      <div className={divClass}>
        <Table hover {...getTableProps()} className={tableClass}>
          <thead className={theadClass}>
            {headerGroups.map((headerGroup) => (
              <tr className={trClass} key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th key={column.id} className={thClass}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr key={row.id} {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td key={cell.id} {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      <Row className="align-items-center mt-2 g-3 text-center text-sm-start">
        <div className="col-sm">
          <div className="text-muted">
            {getPaginationMessage()}
          </div>
        </div>
        <div className="col-sm-auto">
          <ul className="pagination pagination-separated pagination-md justify-content-center justify-content-sm-start mb-0">
            <li className={currentPage === 0 ? "page-item disabled" : "page-item"}>
              <Button className="page-link" onClick={() => onPageChange(Math.max(currentPage - 1, 0))}>Previous</Button>
            </li>
            {Array.from({ length: endingPageNumber - startingPageNumber }, (_, i) => (
              <li key={i} className={currentPage === i + startingPageNumber ? "page-item active" : "page-item"}>
                <Button className="page-link" onClick={() => onPageChange(i + startingPageNumber)}>{i + 1 + startingPageNumber}</Button>
              </li>
            ))}
            <li className={currentPage === totalPages - 1 ? "page-item disabled" : "page-item"}>
              <Button className="page-link" onClick={() => onPageChange(Math.min(currentPage + 1, totalPages - 1))}>Next</Button>
            </li>
          </ul>
        </div>
      </Row>
    </Fragment>
  );
};

TableContainer.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  customPageSize: PropTypes.number,
  tableClass: PropTypes.string,
  theadClass: PropTypes.string,
  trClass: PropTypes.string,
  thClass: PropTypes.string,
  divClass: PropTypes.string,
};

export default TableContainer;