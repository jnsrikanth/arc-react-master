import React, { useEffect } from "react";
import { Traders } from "../traders/traders";
import { connect } from "react-redux";
import { DatePickerTab } from "../datepicker_tab/datepicker_tab";
import { SearchInput } from "../search/search";
import { useFormik } from "formik";
import { loadMeetings, loadSelectedMeeting } from "../../redux/actions/MeetingsActions";
import { useDebouncedCallback } from "use-debounce";
import { USER_TYPE } from "../../utils/app_const";


const TradersListWrapper = (props) => {
    const { dispatch, authData, meetings } = props
    const formik = useFormik({
        initialValues: {
            organizationId: authData.organization.id,
            startDate: null,
            endDate: null,
            search: ''
        },
        onSubmit() {
            // dispatch(loadMeetings(formik.values))
        },
    });
    const debouncedHandleOnChange = useDebouncedCallback(
        () => {
            dispatch(loadMeetings(formik.values))
        },
        300
    );
    useEffect(() => {
        debouncedHandleOnChange.callback()
    }, [formik.values])
    useEffect(() => {
        if(meetings.length) {
            dispatch(loadSelectedMeeting(meetings[0].id))
        }
    }, [meetings])
    return <div className="d-flex flex-column flex-fill overflow-hidden">
        <div className="mt-3">
          <DatePickerTab startDate={formik.values.startDate} endDate={formik.values.endDate} onDatesChange={({ startDate, endDate}) => {
            console.log(startDate, endDate)
            formik.setFieldValue('startDate', startDate)
            formik.setFieldValue('endDate', endDate)
          }} className='py-1 d-flex justify-content-center' />
        </div>
        <div className='mt-3'>
            <SearchInput placeholder="Search traders" value={formik.values.search} onChange={(e) => formik.setFieldValue('search', e.target.value) } />
        </div>
        <div className='mt-3 d-flex flex-column flex-fill overflow-hidden'>
            <div className="traders-list flex-fill">
                <div className="card d-flex h-100">
                    <div className="card-body d-flex flex-column overflow-hidden" style= {{ padding: '0px' }}>
                        <h6 style= {{ padding: '15px 15px 15px' }}>{[USER_TYPE.COMPLIANCE_ANALYST, USER_TYPE.SUPER_ADMIN].includes(authData.userType) ? 'ARC Supervised Meetings' : 'ARC Reported Meetings'} <span className="float-right">All</span></h6>
                        <div className="card-scroll scrollbar traders-list-scroll d-flex flex-column flex-fill" id="style-3">
                            <div className="chat-lists">
                                <div className="list-group list-group-flush">
                                    {meetings.map(meeting => <Traders key={meeting.id} meeting={{
                                        ...meeting
                                    }} />)}
                                    {
                                        meetings.length === 0 ? <p className='text-center'>No Meetings found.</p> : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
};

export const TradersList = connect(state => ({
    meetings: state.meetings.meetings,
    authData: state.auth.authData
}))(TradersListWrapper)