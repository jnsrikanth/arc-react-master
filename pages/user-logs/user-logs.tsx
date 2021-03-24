import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Navigator } from '../../components/navigator';
import { connect } from "react-redux";
import { loadUsers } from '../../redux/actions/UsersActions';
import { useFormik } from 'formik';
import moment from 'moment'
import { loadUserLogs } from '../../redux/actions/UserLogsActions';
import { ARC_DATE_TIME_FORMAT, USER_TYPE_MAP } from '../../utils/app_const';
import { CommonTable } from '../../components/common-table-component/common-table-component';
import { useDebouncedCallback } from "use-debounce";

const userLogsColumnsList = [
    {
        id: 'user.name',
        title: 'Full Name',
        cellValue: ({ row }) => row.user.name
    },
    {
        id: 'user.email',
        title: 'Email ID',
        cellValue: ({ row }) => row.user.email
    },
    {
        id: 'user.userType',
        title: 'User Type',
        cellValue: ({ row }) => USER_TYPE_MAP[row.user.userType].title
    },
    {
        id: 'user.organization.name',
        title: 'Organisation',
        cellValue: ({ row }) => row.user.organization.name
    },
    {
        id: 'loginTime',
        title: 'Login Time',
        cellValue: ({ row }) => row.loginTime ? moment(row.loginTime).format(ARC_DATE_TIME_FORMAT) : '--'
    },
    {
        id: 'logoutTime',
        title: 'Logout Time',
        cellValue: ({ row }) => row.logoutTime ? moment(row.logoutTime).format(ARC_DATE_TIME_FORMAT) : '--'
    },
]
const userLogsColumnsListMap: any = userLogsColumnsList.reduce(
    (acc, column) => ({
        ...acc,
        [column.id]: column
    }),
    {}
)

export const UserLogs = (props) => {
    const { dispatch, userLogsState } = props
    const [selected, setSelected] = useState('')
    const formik = useFormik({
        initialValues: {
            search: ''
        },
        onSubmit() {
        }
    });
    const [filterValues, setFilterValues] = useState<any>(formik.values)
    const debouncedHandleOnChange = useDebouncedCallback(
        () => {
            setFilterValues(formik.values)
        },
        300
    );
    const columns = useMemo(
        () => [
          {
            Header: userLogsColumnsListMap['user.organization.name'].title,
            accessor: userLogsColumnsListMap['user.organization.name'].id,
            columnConfig: {
                headerClassName: 'col-2',
                cellClassName: 'col-2'
            },
            disableFilters: true,
            disableSortBy: false,
            Cell: ({ row }) => {
              return userLogsColumnsListMap['user.organization.name'].cellValue({
                row: row.original,
              })
            }
          },
          {
            Header: userLogsColumnsListMap['user.name'].title,
            accessor: userLogsColumnsListMap['user.name'].id,
            columnConfig: {
                headerClassName: 'col-2',
                cellClassName: 'col-2'
            },
            disableFilters: true,
            disableSortBy: false,
            Cell: ({ row }) => {
              return userLogsColumnsListMap['user.name'].cellValue({
                row: row.original,
              })
            }
          },
          {
            Header: userLogsColumnsListMap['user.email'].title,
            accessor: userLogsColumnsListMap['user.email'].id,
            columnConfig: {
                headerClassName: 'col-3',
                cellClassName: 'col-3'
            },
            disableFilters: true,
            disableSortBy: false,
            Cell: ({ row }) => {
              return userLogsColumnsListMap['user.email'].cellValue({
                row: row.original,
              })
            }
          },
          {
            Header: userLogsColumnsListMap['user.userType'].title,
            accessor: userLogsColumnsListMap['user.userType'].id,
            columnConfig: {
                headerClassName: 'col-2',
                cellClassName: 'col-2'
            },
            disableFilters: true,
            disableSortBy: true,
            Cell: ({ row }) => {
              return userLogsColumnsListMap['user.userType'].cellValue({
                row: row.original,
              })
            }
          },
          {
            Header: userLogsColumnsListMap.loginTime.title,
            accessor: userLogsColumnsListMap.loginTime.id,
            columnConfig: {
                headerClassName: 'col-3',
                cellClassName: 'col-3'
            },
            disableFilters: true,
            disableSortBy: false,
            Cell: ({ row }) => {
              return userLogsColumnsListMap.loginTime.cellValue({
                row: row.original,
              })
            }
          },
        ],
        []
    )
    const fetchData = useCallback(
      async ({ pageSize, pageIndex, filters, sortBy, globalFilter }) => {
        dispatch(loadUserLogs({
          pageSize,
          pageIndex,
          filters,
          globalFilter,
          sortBy
        }))
      },
      []
    )
    useEffect(() => {
        dispatch(loadUsers())
    }, [])
    return <div className="d-flex flex-fill">
        <Navigator onSelectTabOption={setSelected} selected={selected} />
        <div id="main">
          <div className='d-flex flex-column'>
            <div className="col-md-12 ">
              <div className="row mt-3">
                  <div className="pl-3 pr-5"><h6 className="mb-0 mt-2">User Logs</h6></div>
                  <div className="col-4 pl-0">
                      <div className="form-group with-icon" >
                          <input type="text" className="form-control" placeholder="Filter by Full Name / Email ID / Organisation / User Type" value={formik.values.search} onChange={(e) => {
                              formik.setFieldValue('search', e.target.value)
                              debouncedHandleOnChange.callback()
                          }} />
                          <span style={{display: 'inline-block', position:'absolute',  top:'7px', left: '10px'}}><img src="assets/media/svg/fill.svg" className="img-fluid" alt="" /> </span>
                      </div>
                  </div>
                  <div className="col-3"><span className="text-muted d-inline-block mt-2">Showing {userLogsState.userLogs.length}/{userLogsState.totalCount}</span></div>
                  <div className="flex-grow-1 px-4">
                      <a href="#" title="" className="float-right mt-3"><i className="nav-link-icon demo-icon  icon-cog-outline"></i></a>
                      <a href="#" title="" className="float-right  mt-3 mr-3"><i className="nav-link-icon demo-icon  icon-download"></i></a>
                  </div>
              </div>
              <div className='light-tabl user-logs'>
                  <CommonTable
                      searchText={filterValues.search}
                      className='text-center'
                      columns={columns}
                      data={userLogsState.userLogs}
                      count={userLogsState.totalCount}
                      controlledTableState={userLogsState.tableState}
                      fetchData={fetchData}
                      loading={false}
                  />
              </div>
            </div>
          </div>
        </div>
    </div>
}
export default connect(state => ({
    state,
    authToken: state.auth.token,
    users: state.users.users,
    userLogsState: state.userLogs,
    organizations: state.users.organizations,
    authData: state.auth.authData,
}))(UserLogs)