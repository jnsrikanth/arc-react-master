import React from 'react';
import { connect } from "react-redux";
import { useRouter } from 'next/router'
import { ANALYTICS_ROUTE, TRADERS_ROUTE, VIDEO_REC_ROUTE } from '../../utils/route_const';
import { USER_TYPE } from '../../utils/app_const';

const ExperinceOption = (props) => {
  const { authData } = props
  const router = useRouter()

  const onDasboard = () => {
    router.push([USER_TYPE.SUPER_ADMIN, USER_TYPE.COMPLIANCE_MANAGER].includes(authData.userType) ? ANALYTICS_ROUTE : TRADERS_ROUTE)
  }

  const onExperince = () => {
      router.push(VIDEO_REC_ROUTE)
  }

  return <div className='d-flex align-items-center w-100' style={{paddingLeft: '15%', paddingRight: '15%'}}>
      <a onClick={onExperince} style={{ paddingTop: 25, paddingBottom: 25,fontSize:"28px",marginTop:10 }} className="btn btn-primary btn-block btn-rounded">Experience Activity</a>
      <a onClick={onDasboard}  style={{ paddingTop: 25, paddingBottom: 25,fontSize:"28px" }} className="btn btn-primary btn-block btn-rounded">Continue To Dashboard</a>
  </div>
}

export default connect(state => ({
    authData: state.auth.authData
}))(ExperinceOption)