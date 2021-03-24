import { useFormik } from 'formik';
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as Yup from 'yup'
import { addUser, updateUser, USER_ADD_STATUS } from '../../redux/actions/UsersActions';
import { USER_TYPE, USER_TYPES } from '../../utils/app_const';
import Select2 from 'react-select2-wrapper'
import { createAlert } from '../../redux/actions/PendingConfirmationActions';

export const UserAddFormWrapper = (props) => {
    const { authData, organizations, userAddStatus, dispatch, editUser } = props
    const isEdit = !!editUser
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            userType: undefined,
            organizationId: authData.organization.id,
            location: '',
        },
        isInitialValid: true,
        // We used Yup here.
        validationSchema: Yup.object().shape({
            name: Yup.string().required('Please enter Full Name.'),
            email: Yup.string()
            .email("Invalid email address")
            .required("Please enter email."),
            userType: Yup.string().required('Please select user type.'),
            organizationId: Yup.number().required('Please select an organisation.'),
            location: Yup.string().required('Please enter location.')
        }),
        onSubmit() {
        }
    });
    useEffect(() => {
        if([USER_ADD_STATUS.SUCCESS, USER_ADD_STATUS.INTIAL].includes(userAddStatus)) {
            formik.resetForm()
        }
    }, [userAddStatus])
    useEffect(() => {
        formik.setValues({
            name: isEdit ? editUser.name  : "",
            email: isEdit ? editUser.email  :"",
            userType: isEdit ? editUser.userType  : undefined,
            organizationId: isEdit ? editUser.organizationId  : authData.organization.id,
            location: isEdit ? editUser.location  : '',
        })
    }, [editUser])
    return (
        <>
        <form className="light-tabl mt-0 p-3">
         
            <div className="row">
                <div className="col-md-3">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Full Name" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} name='name' />
                    </div>
                </div>
                <div className="col-md-2 pl-0">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Email ID" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} name='email' />
                    </div>
                </div>
                <div className="col-md-2 pl-0">
                    <Select2
                        placeholder='User Type'
                        style={{ width: '100%' }}
                        onChange={(e) => formik.setFieldValue('userType', e.target.value)}
                        className='col px-0 flex-fill'
                        value={formik.values.userType}
                        data={USER_TYPES.filter(({ value }) => authData.userType === USER_TYPE.SUPER_ADMIN || (authData.userType === USER_TYPE.COMPLIANCE_MANAGER && value !== USER_TYPE.SUPER_ADMIN)).map(({ title, value}) => ({
                            id: value,
                            text: title
                        }))}
                        options={{
                            minimumResultsForSearch: -1,
                            placeholder: 'User Type'
                        }}
                    />
                </div>
                {
                    authData.userType === USER_TYPE.SUPER_ADMIN ? <div className="col-md-2 pl-0">
                        <Select2
                            style={{ width: '100%' }}
                            onChange={(e) => formik.setFieldValue('organizationId', e.target.value)}
                            className='col px-0 flex-fill'
                            value={formik.values.organizationId}
                            data={organizations.map(({ id, name}) => ({
                                id,
                                text: name
                            }))}
                            options={{
                                minimumResultsForSearch: -1,
                                placeholder: 'Organization'
                            }}
                        />
                    </div> : null
                }
                <div className="col-md-3 pl-0">
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Location" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.location} name='location' />
                        </div>
                    </div>
            </div>
            <div className="row ">
                <div className="col-md-12">
                    <div className="row d-flex" >
                    <div className="col flex-grow-1 pl-0">
                        <button type='button' className="btn btn-warning btn-rounded float-right"
                            // disabled={userAddStatus === USER_ADD_STATUS.REQUEST || (!formik.isValid && formik.isSubmitting)}
                            style={{marginRight: '0px'}}
                            onClick={async () => {
                                const errors = await formik.validateForm()
                                formik.setSubmitting(true)
                                if(Object.keys(errors).length) {
                                  return dispatch(createAlert(<><p>
                                    {errors[Object.keys(errors).shift() || '']}
                                    </p>
                                  </>))
                                }
                                dispatch(isEdit ? updateUser({
                                    id: editUser.id,
                                    status: editUser.status,
                                    ...formik.values
                                }) : addUser(formik.values))
                            }}>
                                {isEdit ? 'Update' : 'Add'} User
                            </button>
                    </div>
                    </div>
                </div>
            </div>
        </form>
        </>
    )
}

export const UserAddForm = connect(state => ({
    organizations: state.organizations.organizations,
    userAddStatus: state.users.userAddStatus,
    authToken: state.auth.token,
    authData: state.auth.authData,
}))(UserAddFormWrapper)