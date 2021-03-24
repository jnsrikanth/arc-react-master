import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as Yup from 'yup'
import { SingleDatePicker } from 'react-dates'
import { AVAILABLE_DEMOS } from '../../utils/app_const';
import moment from 'moment';
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addOrganization, ORGANIZATION_ADD_STATUS, setOrganizationAddStatus, updateOrganization } from '../../redux/actions/OrganizationsActions';

const initialDemoIds: string[] = []

export const OrganizationAddFormWrapper = (props) => {
    const { dispatch, editOrganization, organizationAddStatus } = props
    const isEdit = !!editOrganization
    const [dateFocus, setDateFocus] = useState(false)
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            expiryDate: undefined,
            demoIds: initialDemoIds,
            clearIssues: false
        },
        isInitialValid: true,
        // We used Yup here.
        validationSchema: Yup.object().shape({
            name: Yup.string().required('Required'),
            email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
            expiryDate: Yup.date().required('Required'),
        }),
        onSubmit() {
        }
    });
    useEffect(() => {
        if([ORGANIZATION_ADD_STATUS.SUCCESS, ORGANIZATION_ADD_STATUS.INTIAL].includes(organizationAddStatus)) {
            formik.resetForm()
        }
    }, [organizationAddStatus])
    useEffect(() => {
        formik.setValues({
            name: isEdit ? editOrganization.name  : "",
            email: isEdit ? editOrganization.email  : "",
            expiryDate: isEdit ? editOrganization.expiryDate  : undefined,
            demoIds: isEdit ? editOrganization.demoIds: initialDemoIds,
            clearIssues: isEdit ? editOrganization.clearIssues: false,
        })
        dispatch(setOrganizationAddStatus(ORGANIZATION_ADD_STATUS.INTIAL))
    }, [editOrganization])
    return (
        <>
        <h6 className="mt-3">{isEdit ? 'Update' : 'Add' } Organisation</h6>
        <form className="light-tabl mt-0 p-3">
           
            <div className="row">
                <div className="col-md-4">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Organisation Name" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} name='name' />
                    </div>
                </div>
                <div className="col-md-4 pl-0">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="POC Email ID" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} name='email' />
                    </div>
                </div>
                <div className="col-md-4 pl-0">
                    <div className="form-group with-icon" >
                        <SingleDatePicker
                            id='organization-expiryDate'
                            date={formik.values.expiryDate ? moment(formik.values.expiryDate) : null}
                            onDateChange={date => formik.setFieldValue('expiryDate', date ? date.toDate() : date)}
                            focused={dateFocus}
                            onFocusChange={(f) => {setDateFocus(f.focused)}}
                            customInputIcon={<FontAwesomeIcon icon={faCalendar} />}
                            placeholder='Active Until'
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col d-flex">
                  <div className='col-7 flex pr-2'>
                    <span className="small text-muted">Access to Sample Videos</span>
                    <div className="row pl-2" id="listResults">
                      {
                          AVAILABLE_DEMOS.map(demo => (
                              <div className="p-1 col-3">
                                  <div className="form-check checkbox checkbox-circle">
                                      <input className="form-check-input" type="checkbox" checked={formik.values.demoIds.includes(demo.id)} onChange={(e) => {
                                          const demoIds = [...formik.values.demoIds]
                                          if(e.target.checked) {
                                              demoIds.push(demo.id)
                                          } else {
                                              const index = demoIds.indexOf(demo.id)
                                              demoIds.splice(index, 1)
                                          }
                                          formik.setFieldValue('demoIds', demoIds)
                                      }} />
                                      <label className="form-check-label">{demo.name}</label>
                                  </div>
                              </div>
                          ))
                      }
                    </div>
                  </div>
                  <div className='flex-fill' />
                  <div id="listResults" className='pr-2 d-flex align-items-end p-1'>
                    <span className="small text-muted">&nbsp;</span>
                    <div className="">
                      <div className="form-check checkbox checkbox-circle">
                          <input className="form-check-input" type="checkbox" checked={formik.values.clearIssues} onChange={(e) => {
                            formik.setFieldValue('clearIssues', e.target.checked)
                          }} />
                          <label className="form-check-label">Reset issues and alerts at the EOD</label>
                      </div>
                    </div>
                  </div>
                  <div className="px-3 d-flex align-items-end">
                    <span className="small text-muted">&nbsp;</span>
                    <div>
                      <button type="button"
                          disabled={organizationAddStatus === ORGANIZATION_ADD_STATUS.REQUEST || (!formik.isValid && formik.isSubmitting)}
                          onClick={async () => {
                              const errors = await formik.validateForm()
                              formik.setSubmitting(true)
                              if(Object.keys(errors).length) return
                              dispatch(isEdit ? updateOrganization({
                                  id: editOrganization.id,
                                  status: editOrganization.status,
                                  ...formik.values
                              }) : addOrganization(formik.values))
                          }}
                          className="btn btn-warning btn-rounded float-right"
                          style={{marginRight: '0px'}}
                      >
                        {isEdit ? 'Update Organisation' : 'Add Organisation' }
                      </button>
                    </div>
                  </div>
                </div>
            </div>
        </form>
        </>
    )
}

export const OrganizationAddForm = connect(state => ({
    organizations: state.organizations.organizations,
    organizationAddStatus: state.organizations.organizationAddStatus,
    authData: state.auth.authData,
}))(OrganizationAddFormWrapper)