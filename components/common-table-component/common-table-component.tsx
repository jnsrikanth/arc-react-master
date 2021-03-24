import React, { useEffect, useMemo, useRef } from 'react'
import { useTable, usePagination, useSortBy, useFilters, useGlobalFilter } from 'react-table'
import ReactPaginate from 'react-paginate'

export const DEFAULT_PAGE_SIZE = 100
export const CommonTable = ({
  className='',
  columns,
  data,
  count,
  controlledTableState,
  fetchData,
  loading,
  searchText
}) => {
  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter
    }),
    []
  )
  const globalFilterRef = useRef('')
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    pageCount,
    gotoPage,
    setGlobalFilter,
    // Get the state from the instance
    state: { pageIndex, pageSize, filters, sortBy, globalFilter }
  } = useTable(
    {
      defaultColumn,

      manualPagination: true,
      manualFilters: true,
      manualGlobalFilter: true,
      manualSortBy: true,
      initialState: {
        pageIndex: controlledTableState.pageIndex,
        filters: controlledTableState.filters,
        pageSize: controlledTableState.pageSize,
        sortBy: controlledTableState.sortBy
      },
      columns,
      data,
      pageCount: controlledTableState.pageCount
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
  )
  // Listen for changes in pagination and use the state to fetch our new data
  useEffect(() => {
    fetchData({
      pageIndex: globalFilterRef.current === globalFilter ? pageIndex : 0,
      pageSize,
      filters,
      sortBy,
      globalFilter
    })
    globalFilterRef.current = globalFilter
  }, [fetchData, pageIndex, pageSize, filters, sortBy, globalFilter])
  useEffect(() => {
    setGlobalFilter(searchText || undefined)
  }, [searchText])
  // Render the UI for your table
  return (
    <div className={className}>
      <div className='overflow-auto'>
        <div className='common-table py-3 text-break' {...getTableProps()}>
          <div className="col-md-12">
            <div className="col-md-12 table-hd">
              {headerGroups.map((headerGroup, hgi) => (
                <div key={hgi} {...headerGroup.getHeaderGroupProps()} className='row tabl-brd common-table-header'>
                  {headerGroup.headers.map((column, hi) => (
                    <div
                      key={hi}
                      {...column.getHeaderProps([
                        column.getSortByToggleProps(),
                        {
                          ...(typeof column.width === 'string' && {
                            width: column.width
                          })
                        },
                        {
                          className: `position-relative ${column.columnConfig && column.columnConfig.headerClassName
                            ? column.columnConfig.headerClassName : 'col'}`
                        }
                      ])}
                    >
                      <div className='d-flex flex-column'>
                        <span
                          className={
                            column.headerConfig && column.headerConfig.className
                              ? column.headerConfig.className
                              : 'text-left'
                          }
                          {...(column.headerConfig && {
                            style: column.headerConfig
                          })}
                        >
                          {column.render('Header')}
                          {column.canSort ? (
                            <div className={`sort-icon-container ${!column.isSorted || column.isSortedDesc ? '' : 'ascending'} ${column.isSorted ? 'sorting' : ''}`}>
                              <img src="assets/media/svg/fill.svg" className='img-fluid icon-image' alt="" />
                            </div>
                            /* <span
                              className={`sort-icon mx-1 fa ${
                                column.isSorted
                                  ? column.isSortedDesc
                                    ? 'fa-sort-down'
                                    : 'fa-sort-up'
                                  : 'fa-sort sort-inactive'
                              }`}
                            />*/
                          ) : null}
                          <span
                          className='filter-container'
                          onClick={e => e.stopPropagation()}
                        >
                          {column.canFilter ? column.render('Filter') : null}
                        </span>
                        </span>
                        
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-12 mt-1">
              <div className="bg-dark-tbl mt-2 common-table-height" id="style-3">
                <div {...getTableBodyProps()} className="col-md-12">
                  {page.map((row, ri) => {
                    prepareRow(row)
                    return (<div
                        key={ri}
                        {...row.getRowProps({
                          className: ''
                        })}
                        className='row tabl-brd common-table-row'
                      >
                        {row.cells.map((cell, ci) => {
                          return (
                            <div
                              key={ci}
                              {...cell.getCellProps({
                                className: `position-relative d-flex align-items-center ${cell.column.columnConfig && cell.column.columnConfig.cellClassName
                                  ? cell.column.columnConfig.cellClassName : 'col'} ${cell.column.Header && cell.column.Header == "Face ID" ? 'col-text-center' : 'col-text-left'}`
                              })}
                            >
                              {cell.render('Cell')}
                            </div>
                          )
                        })}
                      </div>
                    )
                  })}
                  <div>
                    {loading ? (
                      // Use our custom loading state to show a loading indicator
                      <td colSpan={10000}>Loading...</td>
                    ) : null}
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
      <div className='d-flex'>
        <div className='flex-fill' />
        <ReactPaginate
          previousLabel={null}
          nextLabel={null}
          breakLabel='...'
          breakClassName='break-me'
          forcePage={pageIndex}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={d => gotoPage(d.selected)}
          containerClassName='pagination m-0'
          previousClassName='d-none'
          nextClassName='d-none'
          pageClassName='page-item  '
          previousLinkClassName='page-link'
          nextLinkClassName='page-link'
          pageLinkClassName='page-link'
          activeClassName='active'
        />
      </div>
    </div>
  )
}

export default CommonTable

const DefaultColumnFilter = ({ column: { filterValue, _, setFilter } }) => {
  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
    />
  )
}
