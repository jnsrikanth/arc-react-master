import React, { useState } from 'react';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import './DatePickerTab.module.css'
import { connect } from "react-redux";

export const DatePickerTab = (props) => {
    const { startDate, endDate, onDatesChange } = props
    const [forcedInput, setForcedInput] = useState<any>()
    return <>
        <div className={`custom-datepicker ${props.className}`} style={{ position:'relative', width: '100%' }}>
            <DateRangePicker
                startDate={startDate} // momentPropTypes.momentObj or null,
                isOutsideRange={() => false}
                startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                endDate={endDate} // momentPropTypes.momentObj or null,
                endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                onDatesChange={onDatesChange} // PropTypes.func.isRequired,
                focusedInput={forcedInput}
                onFocusChange={_forcedInput => { setForcedInput(!!_forcedInput) }} // PropTypes.func.isRequired,
                customInputIcon={<i className="icon-date_range_24px" />}
            />
        </div>
    </>
};

export default connect((state => ({
    startDate: state.global.selectedDates.startDate,
    endDate: state.global.selectedDates.endDate
})))(DatePickerTab)