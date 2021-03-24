import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { connect } from "react-redux";
export const PageHeaderComponent = (props) => {
    const { title, authData } = props
    return <div className={`${props.className}`}>
        <div className='d-flex align-items-center'>
            <div>
                <h3 className='pt-3 pl-3'>{title}</h3>
            </div>
            <div className='d-flex ml-auto pt-3 pr-3'>
                <div className='d-flex align-items-center pr-3'>
                    {
                        authData.isPickleAvailable
                            ? <div className='avatar avatar-md r-rd'>
                            <img className='rounded-circle' src={`http://localhost:3004/assets/media/image/john-i.png`} />
                            </div>
                            : <FontAwesomeIcon icon={faUserCircle} size='2x' />
                    }
                </div>
                <div>
                    <div className='d-flex align-items-end'>
                        <div className='h5 m-0'>{authData.name}</div>
                        <div className='ml-2'>{authData.organization.name}</div>
                    </div>
                    <span>{authData.userType}</span>
                </div>
                
            </div>
        </div>
    </div>
}

export const PageHeader =  connect(state => ({
    authData: state.auth.authData,
}))(PageHeaderComponent)