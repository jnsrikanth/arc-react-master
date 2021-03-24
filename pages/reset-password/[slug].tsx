import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { resetPasswordSetPassword, setAuthError } from '../../redux/actions/AuthActions';
import { getPasswordRegex, RESET_PASSWORD_API } from '../../api/constants';
import { useRouter } from 'next/router';
import Axios from 'axios';
import { setLoadingAction } from '../../redux/actions/GlobalActions';
import { LOGIN_ROUTE } from '../../utils/route_const';

enum TokenValidityStatus {
  Inprogress = 'inprogress',
  Valid = 'valid',
  Invalid = 'invalid'
}

export const ResetPasswordSlug = (props) => {
  const router = useRouter()
    const { dispatch, authError } = props
    const [tokenValidityStatus, setTokenValidtiyStatus] = useState<TokenValidityStatus>(TokenValidityStatus.Valid) 
    const formik = useFormik({
        initialValues: {
          password: "",
          repeatPassword: "",
        },
        // We used Yup here.
        validationSchema: Yup.object().shape({
          password: Yup.string()
            .matches(getPasswordRegex(), 'Password should contain one lower case, one upper case, one special and one numerical character')
            .required("Required"),
          repeatPassword: Yup.string()
            .matches(getPasswordRegex(), 'Password should contain one lower case, one upper case, one special and one numerical character')
            .required("Required"),
        }),
        onSubmit() {
            dispatch(setAuthError(''))
            onSignIn()
        },
    });
    const validateResetPasswordToken = async (token) => {
      try {
        setTokenValidtiyStatus(TokenValidityStatus.Inprogress)
        dispatch(setLoadingAction(true))
        const response = await Axios.request({
          url: `${RESET_PASSWORD_API}/${token}/validate-token`
        })
        console.log(response)
        setTokenValidtiyStatus(TokenValidityStatus.Valid)
      } catch (ex) {
        setTokenValidtiyStatus(TokenValidityStatus.Invalid)
      } finally {
        dispatch(setLoadingAction(false))
      }
    }
    
    useEffect(() => {
      dispatch(setAuthError(''))
      validateResetPasswordToken(router.query.slug)
    }, [])
    const onSignIn = () => {
      const token = router.query.slug
      const { password, repeatPassword } = formik.values
      console.log({
        token,
        password,
        repeatPassword
      })
      dispatch(resetPasswordSetPassword(token, password, repeatPassword))
    }

    return <div className='d-flex align-items-center mx-auto'>
      <div className="form-wrapper reset-in" style={{ marginTop: "100px" }}>
        <div id="logo tect-center" >
          <img className="logo" src="/assets/media/image/logo.png" alt="image" width='100%' />
        </div>

        <h5>Reset Password</h5>
        {
          tokenValidityStatus === TokenValidityStatus.Invalid
          ? <p className="log-error">The link is invalid or expired</p>
          : null
        }

        <form onSubmit={e => {
          e.preventDefault()
          formik.handleSubmit(e)
        }}>
          <div className="form-group">
            <input
              name='password'
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="password" className="form-control" placeholder="New password"
            />
            <span>{`${formik.errors.password && formik.touched.password ? formik.errors.password : ""}`}</span>
          </div>
          <div className="form-group">
            <input
              name='repeatPassword'
              value={formik.values.repeatPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="password" className="form-control" placeholder="Repeat password" required
            />
            <span>{`${formik.touched.repeatPassword && formik.values.password !== formik.values.repeatPassword ? 'Password does not match' : ''}`}</span>
          </div>
          <div className='form-group'>
            <span>{`${authError ? authError : ""}`}</span>
          </div>
          <button type='button' onClick={onSignIn} disabled={[TokenValidityStatus.Inprogress, TokenValidityStatus.Invalid].includes(tokenValidityStatus) || !formik.isValid || formik.values.password !== formik.values.repeatPassword} className="btn btn-primary btn-block btn-rounded">Reset Password</button>
          <p />
          <a href={`${LOGIN_ROUTE}`} className="btn btn-outline-light btn-sm">Sign in</a>
         
        </form>
    </div>
  </div>
}


export default connect(state => ({
  authData: state.auth.authData,
  authError: state.auth.error
}))(ResetPasswordSlug)