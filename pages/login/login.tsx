import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { setAuthError, signIn } from '../../redux/actions/AuthActions';

export const Login = (props) => {
    const { dispatch, authError } = props
    const formik = useFormik({
        initialValues: {
            email: "",
            userCode: ""
        },
        // We used Yup here.
        validationSchema: Yup.object().shape({
            email: Yup.string()
            .email("Invalid email address1")
            .required("Required"),
            userCode: Yup.string()
            .required("Required")
        }),
        onSubmit() {
          console.log(formik.isValid)
            dispatch(setAuthError(''))
            onSignIn()
        },
    });
    useEffect(() => {
        dispatch(setAuthError(''))
    }, [])
    const onSignIn = () => {
        const { email, userCode } = formik.values
        dispatch(signIn(email, userCode))
    }

    return <div className='d-flex align-items-center mx-auto'>
        <div className="form-wrapper log-in" style={{ marginTop: "100px" }}>

            <div id="logo tect-center" >
                <img className="logo" src="assets/media/image/logo.png" alt="image" width='100%' />
            </div>

            <h5 className='mt-0 mb-5 pb-2'>Video Evaluation Platform</h5>

            <form onSubmit={e => {
                e.preventDefault()
                formik.handleSubmit(e)
            }}>
                <div className="form-group">
                    <input
                        name='email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text" className="form-control" placeholder="Email"
                    />
                    <span>{`${formik.errors.email && formik.touched.email ? formik.errors.email : ""}`}</span>
                </div>
                <div className="form-group">
                    <input
                        name='userCode'
                        value={formik.values.userCode}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="password" className="form-control" placeholder="Password"
                    />
                    <span>{formik.errors.userCode && formik.touched.userCode ? formik.errors.userCode : ""}</span>
                    <span>{`${authError ? authError : ""}`}</span>
                </div>
                <div className='form-group'>
                  
                </div>
                <button type='submit' className="btn btn-primary btn-block btn-rounded shadow-none">Sign In</button>
             
            </form>
        </div>
    </div>
}


export default connect(state => ({
    authData: state.auth.authData,
    authError: state.auth.error
}))(Login)