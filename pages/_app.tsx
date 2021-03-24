import 'react-dates/lib/css/_datepicker.css';
import '../public/assets/css/global.css';
import '../public/assets/css/app.min.css';
import '../public/assets/css/dateinput.min.css';
import '../public/assets/fontello/css/fontello.css';
import '../public/assets/new-icon/css/fontello.css';
import '../public/assets/font/style.css';
import 'react-select2-wrapper/css/select2.css'
import { wrapper, PersistorProvier } from '../redux/store';
import ErrorComponent from '../components/error-component';
import LoadingCompnent from '../components/loading-component';
import 'react-notifications/lib/notifications.css';
// import { NotificationContainer } from 'react-notifications';
import 'react-dates/initialize';
import Head from 'next/head';
import { PersistGate } from 'redux-persist/integration/react'
import { detectMob } from '../utils/app_const';
import UnsupportedBrowser from './unsupported_browser';
import { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { initiateAuthData } from '../redux/actions/AuthActions';
import { useRouter } from 'next/router';
import { FACE_REG_ROUTE, LOGIN_ROUTE, UNAUTHORIZED_ROUTES } from '../utils/route_const';
import BarLoader from "react-spinners/BarLoader";
import { Toast } from 'react-bootstrap'
import { CommonConfirmComponent } from '../components/common-confirm-component/common-confirm-component';
import { cancelConfirmation } from '../redux/actions/PendingConfirmationActions';

export function App({ Component, pageProps, dispatch, authData, authIsLoading, toastError }) {
  const [setUnsupported, setUnsupportedBrowser] = useState(false)
  const [showToast, setShowToast] = useState(false)
  useEffect(() => {
    if(toastError) {
      setShowToast(true)
    }
  }, [toastError])
  const router = useRouter()
  useEffect(() => {
    setUnsupportedBrowser(detectMob())
    dispatch(cancelConfirmation())
  }, [])
  useEffect(() => {
    if(dispatch) {
      dispatch(initiateAuthData())
    }
  }, [dispatch])

  useEffect(() => {
    if(!UNAUTHORIZED_ROUTES.includes(router.pathname) && !authData) {
      if(!authIsLoading) {
        router.replace(LOGIN_ROUTE)
      }
    }
    if(authData) {
      if((!authData.isPickleAvailable && !authData.isUserImagesAvailable) && router.pathname !== FACE_REG_ROUTE) {
        router.replace(FACE_REG_ROUTE)
      }
    }
  }, [authData, authIsLoading])
  return setUnsupported ? <UnsupportedBrowser /> :
    <PersistGate loading={null} persistor={PersistorProvier.persistor}>
      <Head>
        <title>CitycomARC</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Toast style={{position: 'fixed', top: 0, right:0, zIndex: 9999}} show={showToast} delay={5}>
        <Toast.Header>
          <strong className="mr-auto">Alert</strong>
        </Toast.Header>
        <Toast.Body>{toastError}</Toast.Body>
      </Toast>
      {
        authIsLoading || (!authData && !UNAUTHORIZED_ROUTES.includes(router.pathname))
          ? <BarLoader
              color={"#EF4A81"}
              height={7}
              width={"100%"}
              loading={true}
          />
          : <Component {...pageProps} />
      }
      <LoadingCompnent />
      <ErrorComponent />
      <CommonConfirmComponent />
    </PersistGate>
}
const _App = connect(state => ({
  authIsLoading: state.auth.isLoading,
  authData: state.auth.authData,
  loading: state.global.loading,
  toastError: state.global.toastError
}))(App)

export default wrapper.withRedux(_App);