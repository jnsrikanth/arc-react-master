import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { connect } from "react-redux";
import { ARC_DATE_FORMAT, ARC_DATE_TIME_FORMAT, ORGANIZATION_STATUS } from '../../utils/app_const';
import moment from 'moment';
import { CommonTable } from '../common-table-component/common-table-component';
import { useFormik } from 'formik';
import { useDebouncedCallback } from 'use-debounce/lib';
import { deleteOrganization, downloadOrganizations, loadOrganizationsPage, ORGANIZATION_ADD_STATUS, updateOrganization } from '../../redux/actions/OrganizationsActions';
import { OrganizationAddForm } from '../organization-add-form-component/organization-add-form-component';
import { createConfirmAction } from '../../redux/actions/PendingConfirmationActions';
const organizationsColumnsList = [
  {
    id: 'name',
    title: 'Organisation',
    cellValue: ({ row }) => row.name
  },
  {
    id: 'email',
    title: 'POC Email ID',
    cellValue: ({ row }) => row.email
  },
  {
    id: 'expiryDate',
    title: 'Active Until',
    cellValue: ({ row }) => row.expiryDate ? moment(row.expiryDate).format(ARC_DATE_FORMAT) : '--'
  },
  {
    id: 'createdAt',
    title: 'Created On',
    cellValue: ({ row }) => row.createdAt ? moment(row.createdAt).format(ARC_DATE_TIME_FORMAT) : '--'
  }
]
const organizationsColumnsListMap: any = organizationsColumnsList.reduce(
  (acc, column) => ({
    ...acc,
    [column.id]: column
  }),
  {}
)

export const OrganizationManagementWrapper = (props) => {
  const { authData, dispatch, organizationsState } = props
  const [editOrganizationData, setEditOrganizationData] = useState<any>()
  const columns = useMemo(
    () => [
      {
        Header: organizationsColumnsListMap.name.title,
        accessor: organizationsColumnsListMap.name.id,
        disableFilters: true,
        disableSortBy: false,
        columnConfig: {
          headerClassName: 'col-2',
          cellClassName: 'col-2'
        },
        Cell: ({ row }) => {
          return organizationsColumnsListMap.name.cellValue({
            row: row.original,
          })
        },
      },
      {
        Header: organizationsColumnsListMap.email.title,
        accessor: organizationsColumnsListMap.email.id,
        disableFilters: true,
        disableSortBy: false,
        columnConfig: {
          headerClassName: 'col-3',
          cellClassName: 'col-3'
        },
        Cell: ({ row }) => {
          return organizationsColumnsListMap.email.cellValue({
            row: row.original,
          })
        }
      },
      {
        Header: organizationsColumnsListMap.createdAt.title,
        accessor: organizationsColumnsListMap.createdAt.id,
        disableFilters: true,
        disableSortBy: false,
        columnConfig: {
          headerClassName: 'col-4',
          cellClassName: 'col-4'
        },
        Cell: ({ row }) => {
          return organizationsColumnsListMap.createdAt.cellValue({
            row: row.original,
          })
        },
      },
      {
        Header: organizationsColumnsListMap.expiryDate.title,
        accessor: organizationsColumnsListMap.expiryDate.id,
        disableFilters: true,
        disableSortBy: false,
        columnConfig: {
          headerClassName: 'col-2',
          cellClassName: 'col-2'
        },
        Cell: ({ row }) => {
          return organizationsColumnsListMap.expiryDate.cellValue({
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
            const organization = row.original
          return (
              <>
              {
                authData.organization.id !== organization.id ? <>
                  <a title='Edit' className='cursor-pointer' role='button' onClick={() => {
                    setEditOrganizationData(row.original)
                  }}><i className="nav-link-icon demo-icon icon-edit"></i></a>
                  <a title={organization.status === ORGANIZATION_STATUS.ACTIVE ? 'Disable' : 'Enable'} className=" mr-2 ml-2 cursor-pointer" onClick={() => {
                    dispatch(createConfirmAction({
                      message: `Are you sure you want to ${organization.status === ORGANIZATION_STATUS.ACTIVE ? 'disable' : 'enable'} the organisation ?`,
                      onConfirmDispatchAction: () => {
                        dispatch(updateOrganization({
                          ...organization,
                          status: organization.status === ORGANIZATION_STATUS.ACTIVE ? ORGANIZATION_STATUS.INACTIVE : ORGANIZATION_STATUS.ACTIVE
                        }))
                      }
                    }))
                  }}><i className={`nav-link-icon demo-icon ${organization.status === ORGANIZATION_STATUS.ACTIVE ? 'icon-user-delete-outline' : 'icon-user-add-outline'} `}></i></a>
                  <a title='Delete' className='cursor-pointer' onClick={() => {
                    dispatch(createConfirmAction({
                      message: 'Are you sure you want to delete the organisation ?',
                      onConfirmDispatchAction: () => {
                        dispatch(deleteOrganization(organization.id))
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
    []
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
      dispatch(loadOrganizationsPage({
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
    if([ORGANIZATION_ADD_STATUS.SUCCESS, ORGANIZATION_ADD_STATUS.INTIAL].includes(organizationsState.organizationAddStatus)) {
      setEditOrganizationData(null)
    }
  }, [organizationsState.organizationAddStatus])
  return <>
    <div className="col-md-12 ">
      <div className="row">
        <div className="col-md-12">
          <OrganizationAddForm editOrganization={editOrganizationData} />
        </div>
      </div>
    </div>
    <div className="col-md-12 mt-4">
      <div className="row">
        <div className="pl-3 pr-5"><h6 className="mt-2 mb-0">Organisation List</h6></div>
        <div className="col-3 pl-0">
          <div className="form-group with-icon" >
            <input type="text" className="form-control" placeholder="Filter by Email ID / Organisation" value={formik.values.search} onChange={(e) => {
              formik.setFieldValue('search', e.target.value)
              debouncedHandleOnChange.callback()
            }} />
            <span style={{display: 'inline-block', position: 'absolute', top:'7px', left: '10px'}}><img src="assets/media/svg/fill.svg" className="img-fluid" alt="" /> </span>
          </div>
        </div>
        <div className="col-3"><span className="text-muted d-inline-block mt-2">Showing {organizationsState.organizations.length}/{organizationsState.totalCount}</span></div>
        <div className="flex-grow-1 px-4">
          <a href="#" title="" className="float-right mt-3"><i className="nav-link-icon demo-icon  icon-cog-outline"></i></a>
          <a href="#" role='button' onClick={() => dispatch(downloadOrganizations())} title="" className="float-right  mt-3 mr-3"><i className="nav-link-icon demo-icon  icon-download"></i></a>
        </div>
      </div>
      <div className='light-tabl mt-0'>
      <CommonTable
        className='text-left'
        columns={columns}
        data={organizationsState.organizations}
        count={organizationsState.totalCount}
        controlledTableState={organizationsState.tableState}
        fetchData={fetchData}
        searchText={filterValues.search}
        loading={false}
      />
      </div>
    </div>
  </>
}
export const OrganizationManagement = connect(state => ({
    organizationsState: state.organizations,
    authData: state.auth.authData,
}))(OrganizationManagementWrapper)