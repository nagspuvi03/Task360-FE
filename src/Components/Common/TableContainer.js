import React, { Fragment, useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  useTable,
  usePagination,
  useRowSelect,
  useGlobalFilter,
  useFilters,
  useAsyncDebounce
} from "react-table";
import { Table, Row, Col, Button, CardBody } from "reactstrap";
import TaskListGlobalFilter from "../../Components/Common/GlobalSearchFilter";

function GlobalFilter({
  globalFilter,
  setGlobalFilter,
  isTaskListFilter,
  users,
  projects,
  customers,
  onFilterChange,
  filterValues,
  SearchPlaceholder
}) {
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);
  
  return (
    <React.Fragment>
      <CardBody className="border border-dashed border-end-0 border-start-0">
        <form>
          <Row>
            <Col>
              <div className="search-box mb-2 d-inline-block col-12">
                <input
                  onChange={(e) => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                  }}
                  id="search-bar-0"
                  type="text"
                  className="form-control border-0 search /"
                  placeholder={SearchPlaceholder}
                  value={value || ""}
                />
                <i className="bx bx-search-alt search-icon"></i>
              </div>
            </Col>
            {isTaskListFilter && (
              <TaskListGlobalFilter
                users={users}
                projects={projects}
                customers={customers}
                onFilterChange={onFilterChange}
                filterValues={filterValues}      
              />
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
  filterValues,
  users,
  projects,
  customers,
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
  divClass,
  SearchPlaceholder
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

  const tableContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    const checkScroll = () => {
      if (tableContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = tableContainerRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
      }
    };

    checkScroll();
    tableContainerRef.current?.addEventListener('scroll', checkScroll);

    return () => tableContainerRef.current?.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollTable = (direction) => {
    if (tableContainerRef.current) {
      const { scrollLeft, clientWidth } = tableContainerRef.current;
      const newScrollLeft = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      tableContainerRef.current.scroll({ left: newScrollLeft, behavior: 'smooth' });
    }
  };

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

  const showButtonAtPosition = (position) => {
    const thresholds = {
      20: 20,
      40: 30,
      60: 40,
      80: 50
    };
    const minimumThreshold = thresholds[position];
    const actualOnPage = currentPage === totalPages - 1 ? numberOfElements : customPageSize;  
    return actualOnPage >= minimumThreshold;
  };

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
            SearchPlaceholder={SearchPlaceholder}
            filterValues={filterValues}
            users={users}
            projects={projects}
            customers={customers}
          />
        )}
      </Row>

      {showLeftArrow && (
        <>
          {showButtonAtPosition(20) && (
            <Button className="arrow-button left-arrow" onClick={() => scrollTable('left')} style={{
              position: 'absolute',
              top: '20%',
              transform: 'translateY(-20%)',
              left: 0,
              zIndex: 10,
            }}>
              &lt;
            </Button>
          )}

          {showButtonAtPosition(40) && (
            <Button className="arrow-button left-arrow" onClick={() => scrollTable('left')} style={{
              position: 'absolute',
              top: '40%',
              transform: 'translateY(-40%)',
              left: 0,
              zIndex: 10,
            }}>
              &lt;
            </Button>
          )}

          {showButtonAtPosition(60) && (
            <Button className="arrow-button left-arrow" onClick={() => scrollTable('left')} style={{
              position: 'absolute',
              top: '60%',
              transform: 'translateY(-60%)',
              left: 0,
              zIndex: 10,
            }}>
              &lt;
            </Button>
          )}

          {showButtonAtPosition(80) && (
            <Button className="arrow-button left-arrow" onClick={() => scrollTable('left')} style={{
              position: 'absolute',
              top: '80%',
              transform: 'translateY(-80%)',
              left: 0,
              zIndex: 10,
            }}>
              &lt;
            </Button>
          )}
        </>
      )}

      {showRightArrow && (
        <>
          {showButtonAtPosition(20) && (
            <Button className="arrow-button right-arrow" onClick={() => scrollTable('right')} style={{
              position: 'absolute',
              top: '20%',
              transform: 'translateY(-20%)',
              right: 0,
              zIndex: 10,
            }}>
              &gt;
            </Button>
          )}

          {showButtonAtPosition(40) && (
            <Button className="arrow-button right-arrow" onClick={() => scrollTable('right')} style={{
              position: 'absolute',
              top: '40%',
              transform: 'translateY(-40%)',
              right: 0,
              zIndex: 10,
            }}>
              &gt;
            </Button>
          )}

          {showButtonAtPosition(60) && (
            <Button className="arrow-button right-arrow" onClick={() => scrollTable('right')} style={{
              position: 'absolute',
              top: '60%',
              transform: 'translateY(-60%)',
              right: 0,
              zIndex: 10,
            }}>
              &gt;
            </Button>
          )}

          {showButtonAtPosition(80) && (
            <Button className="arrow-button right-arrow" onClick={() => scrollTable('right')} style={{
              position: 'absolute',
              top: '80%',
              transform: 'translateY(-80%)',
              right: 0,
              zIndex: 10,
            }}>
              &gt;
            </Button>
          )}
        </>
      )}

      <div ref={tableContainerRef} className={divClass} style={{ position: 'relative' }}>
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