import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { connect } from "react-redux";
import { deleteUser, downloadUsers, loadUsersPage, resetUserPassword, updateUser, USER_ADD_STATUS } from '../../redux/actions/UsersActions';
import { UserAddForm } from '../../components/user-add-form-component/user-add-form-component';
import { ARC_DATE_FORMAT, ARC_DATE_TIME_FORMAT, USER_STATUS, USER_TYPE, USER_TYPE_MAP } from '../../utils/app_const';
import moment from 'moment';
import { CommonTable } from '../../components/common-table-component/common-table-component';
import { useFormik } from 'formik';
import { useDebouncedCallback } from 'use-debounce/lib';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { createConfirmAction } from '../../redux/actions/PendingConfirmationActions';
const usersColumnsList = [
    {
        id: 'name',
        title: 'Full name',
        cellValue: ({ row }) => row.name
    },
    {
        id: 'email',
        title: 'Email ID',
        cellValue: ({ row }) => row.email
    },
    {
        id: 'userCode',
        title: 'User Code',
        cellValue: ({ row }) => row.userCode
    },
    {
        id: 'userType',
        title: 'User Type',
        cellValue: ({ row }) => USER_TYPE_MAP[row.userType].title
    },
    {
        id: 'organization.name',
        title: 'Organisation',
        cellValue: ({ row }) => row.organization.name
    },
    {
        id: 'expiryDate',
        title: 'Active Until',
        cellValue: ({ row }) => row.expiryDate ? moment(row.expiryDate).format(ARC_DATE_FORMAT) : '--'
    },
    {
        id: 'lastLogin',
        title: 'Last Active',
        cellValue: ({ row }) => row.lastLogin ? moment(row.lastLogin).format(ARC_DATE_TIME_FORMAT) : '--'
    },
    {
      id: 'createdAt',
      title: 'Created On',
      cellValue: ({ row }) => row.createdAt ? moment(row.createdAt).format(ARC_DATE_TIME_FORMAT) : '--'
    },
    {
      id: 'pickleFileStatus',
      title: 'Face ID',
      cellValue: ({ row }) => row.pickleFileStatus ? 'Yes' : 'No'
    }
]
const usersColumnsListMap: any = usersColumnsList.reduce(
    (acc, column) => ({
        ...acc,
        [column.id]: column
    }),
    {}
)

export const UserManagementWrapper = (props) => {
    const { authData, dispatch, usersState } = props
    const [editUserData, setEditUserData] = useState<any>()
    const columns = useMemo(
        () => [
          {
            Header: usersColumnsListMap['organization.name'].title,
            accessor: usersColumnsListMap['organization.name'].id,
            disableFilters: true,
            disableSortBy: false,
            columnConfig: {
              headerClassName: 'col-1',
              cellClassName: 'col-1'
            },
            Cell: ({ row }) => {
              return usersColumnsListMap['organization.name'].cellValue({
                row: row.original,
              })
            }
          },
          {
            Header: usersColumnsListMap.name.title,
            accessor: usersColumnsListMap.name.id,
            disableFilters: true,
            disableSortBy: false,
            columnConfig: {
              headerClassName: 'col-2',
              cellClassName: 'col-2'
            },
            Cell: ({ row }) => {
              return usersColumnsListMap.name.cellValue({
                row: row.original,
              })
            },
          },
          {
            Header: usersColumnsListMap.email.title,
            accessor: usersColumnsListMap.email.id,
            disableFilters: true,
            disableSortBy: false,
            columnConfig: {
              headerClassName: authData.userType === USER_TYPE.SUPER_ADMIN ? 'col-2' : 'col-2',
              cellClassName: authData.userType === USER_TYPE.SUPER_ADMIN ? 'col-2' : 'col-2',
            },
            Cell: ({ row }) => {
              return usersColumnsListMap.email.cellValue({
                row: row.original,
              })
            }
          },
          /* ...(authData.userType === USER_TYPE.SUPER_ADMIN ? [{
            Header: usersColumnsListMap.userCode.title,
            accessor: usersColumnsListMap.userCode.id,
            disableFilters: true,
            disableSortBy: true,
            columnConfig: {
              headerClassName: 'col-1',
              cellClassName: 'col-1'
            },
            Cell: ({ row }) => {
              return usersColumnsListMap.userCode.cellValue({
                row: row.original,
              })
            }
          }] : []),*/
          {
            Header: usersColumnsListMap.userType.title,
            accessor: usersColumnsListMap.userType.id,
            disableFilters: true,
            disableSortBy: false,
            columnConfig: {
              headerClassName: 'col-1',
              cellClassName: 'col-1'
            },
            Cell: ({ row }) => {
              return usersColumnsListMap.userType.cellValue({
                row: row.original,
              })
            }
          },
          
          {
            Header: usersColumnsListMap.pickleFileStatus.title,
            accessor: usersColumnsListMap.pickleFileStatus.id,
            disableFilters: true,
            disableSortBy: true,
            columnConfig: {
              headerClassName: 'col-1',
              cellClassName: 'col-1 justify-content-center'
            },
            Cell: ({ row }) => {
              return row.original.pickleFileStatus ?<i className="nav-link-icon demo-icon   icon-done_24px"></i> : null
            }
          },
          {
            Header: usersColumnsListMap.createdAt.title,
            accessor: usersColumnsListMap.createdAt.id,
            disableFilters: true,
            disableSortBy: false,
            columnConfig: {
              headerClassName: 'col-2',
              cellClassName: 'col-2'
            },
            Cell: ({ row }) => {
              return usersColumnsListMap.createdAt.cellValue({
                row: row.original,
              })
            },
          },
          {
            Header: usersColumnsListMap.lastLogin.title,
            accessor: usersColumnsListMap.lastLogin.id,
            disableFilters: true,
            disableSortBy: false,
            columnConfig: {
              headerClassName: 'col-2',
              cellClassName: 'col-2'
            },
            Cell: ({ row }) => {
              return usersColumnsListMap.lastLogin.cellValue({
                row: row.original,
              })
            }
          },
          {
            Header: 'Actions',
            accessor: 'none',
            disableFilters: true,
            disableSortBy: true,
            columnConfig: {
              headerClassName: 'col-1',
              cellClassName: 'col-1'
            },
            Cell: ({ row }) => {
                const user = row.original
              return (
                <>
                  {
                    authData.id !== user.id ? <>
                      <a title='Edit' className='cursor-pointer' onClick={() => {
                        setEditUserData(row.original)
                      }}><i className="nav-link-icon demo-icon icon-edit"></i></a>
                      <a title={user.status === USER_STATUS.ACTIVE ? 'Disable' : 'Enable'} className=" mr-2 ml-2 cursor-pointer" onClick={() => {
                        dispatch(createConfirmAction({
                          message: `Are you sure you want to ${user.status === USER_STATUS.ACTIVE ? 'disable' : 'enable'} the user ?`,
                          onConfirmDispatchAction: () => {
                            dispatch(updateUser({
                              ...user,
                              status: user.status === USER_STATUS.ACTIVE ? USER_STATUS.INACTIVE : USER_STATUS.ACTIVE
                            }))
                          }
                        }))
                      }}><i className={`nav-link-icon demo-icon ${user.status === USER_STATUS.ACTIVE ? 'icon-user-delete-outline' : 'icon-user-add-outline'} `}></i></a>
                      <a title='Reset Password' className='cursor-pointer mr-2' role='button' onClick={() => {
                        dispatch(createConfirmAction({
                          message: 'Are you sure you want to send password reset email ?',
                          onConfirmDispatchAction: () => {
                            dispatch(resetUserPassword(user.id))
                          }
                        }))
                      }}><FontAwesomeIcon icon={faKey} className='nav-link-icon demo-icon icon-trash-empty fa-icon-action' /></a>
                      <a title='Delete' className='cursor-pointer' onClick={() => {
                        dispatch(createConfirmAction({
                          message: 'Are you sure you want to delete the user ?',
                          onConfirmDispatchAction: () => {
                            dispatch(deleteUser(user.id))
                          }
                        }))
                      }}><i className="nav-link-icon demo-icon   icon-trash-empty"></i></a>
                    </>: null
                  }
                </>
              )
            }
          }
        ],
        [authData]
    )
    
    const formik = useFormik({
        initialValues: {
            search: ''
        },
        onSubmit() {
        }
    });
    const [filterValues, setFilterValues] = useState<any>(formik.values)
    const fetchData = useCallback(
      async ({ pageSize, pageIndex, filters, sortBy, globalFilter }) => {
        dispatch(loadUsersPage({
          pageSize,
          pageIndex,
          filters,
          sortBy,
          globalFilter
        }))
      },
      []
    )
    const debouncedHandleOnChange = useDebouncedCallback(
        () => {
            setFilterValues(formik.values)
        },
        300
    );
    useEffect(() => {
        if([USER_ADD_STATUS.SUCCESS, USER_ADD_STATUS.INTIAL].includes(usersState.userAddStatus)) {
            setEditUserData(null)
        }
    }, [usersState.userAddStatus])
    return <>
        <div className="col-md-12 mt-5">
            <h6>User Management</h6>
            <div className="row">
                <div className="col-md-12">
                    {
                      [USER_TYPE.SUPER_ADMIN, USER_TYPE.COMPLIANCE_MANAGER].includes(authData.userType) ? (
                          <UserAddForm editUser={editUserData} />
                      ) : null
                    }
                    </div>
            </div>
        </div>
        <div className="col-md-12 mt-4">
            <div className="row">
                <div className="pl-3 pr-5"><h6 className="mb-0 mt-2">User List</h6></div>
                <div className="col-4 pl-0">
                    <div className="form-group with-icon" >
                        <input type="text" className="form-control" placeholder="Filter by Full Name / Email ID / Organisation / User Type" value={formik.values.search} onChange={(e) => {
                            formik.setFieldValue('search', e.target.value)
                            debouncedHandleOnChange.callback()
                        }} />
                        <span style={{display: 'inline-block', position: 'absolute', top:'7px', left: '10px'}}> <img src="assets/media/svg/fill.svg" className="img-fluid" alt="" /> </span>
                    </div>
                        
                </div>
                <div className="col-2"><span className="text-muted d-inline-block mt-2">Showing {usersState.users.length}/{usersState.totalCount}</span></div>
                <div className="flex-grow-1 px-4">
                    <a href="#" title="" className="float-right mt-3"><i className="nav-link-icon demo-icon  icon-cog-outline"></i></a>
                    <a href="#" role='button' onClick={() => dispatch(downloadUsers())} title="" className="float-right  mt-3 mr-3"><i className="nav-link-icon demo-icon  icon-download"></i></a>
                </div>
            </div>
            <div className='light-tabl mt-0 mb-5'>
            <CommonTable
                className='text-center'
                columns={columns}
                data={usersState.users}
                count={usersState.totalCount}
                controlledTableState={usersState.tableState}
                fetchData={fetchData}
                searchText={filterValues.search}
                loading={false}
            />
            </div>
        </div>
    </>
}
export const UserManagement = connect(state => ({
    usersState: state.users,
    authData: state.auth.authData,
}))(UserManagementWrapper)