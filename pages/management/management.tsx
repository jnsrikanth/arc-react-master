import React, { useState } from 'react';

import { Navigator } from '../../components/navigator';
import { connect } from "react-redux";
import { UserManagement } from '../../components/user-management-component/user-management-component';
import { OrganizationManagement } from '../../components/organization-management-component/organization-management-component';
import { USER_TYPE } from '../../utils/app_const';
export const Management = (props) => {
    const { authData } = props
    const [selected, setSelected] = useState('')
    return <div className="d-flex flex-fill">
        <Navigator onSelectTabOption={setSelected} selected={selected} />
        <div id="main" className='d-flex flex-column overflow-auto'>
          <div>
            {
              [USER_TYPE.SUPER_ADMIN].includes(authData.userType)
              ?  <OrganizationManagement />
              : null
            }
            <UserManagement />
          </div>
            
        </div>
    </div>
}
export default connect(state => ({
    usersState: state.users,
    authData: state.auth.authData,
}))(Management)