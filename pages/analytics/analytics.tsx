import React from 'react';

import { Navigator } from '../../components/navigator';
import GraphContainer from '../../components/graph-container/graph-container';
import { connect } from "react-redux";
import Metrics from '../../components/metrics/metrics';
import { DatePickerTab } from '../../components/datepicker_tab/datepicker_tab';
import { SearchInput } from '../../components/search/search';
import moment from 'moment';


export class Anlaytics extends React.Component<any> {
    state = {
        selected: "0",
        searchText: '',
        startDate: null,
        endDate: null
    }
    componentDidMount() {
      this.setState({
        ...this.state,
        startDate: moment(this.props.authData.organization.createdAt),
        endDate: moment()
      })
    }
    render() {
        const { selected } = this.state
        return <div className="d-flex flex-fill">
            <Navigator onSelectTabOption={(selected) => { this.setState({ selected }) }} selected={selected} />
            <div id="main">
                <div className="main-content" style={{ paddingLeft: "2px !important", paddingTop: 0, paddingBottom: 0 }}>
                    <div className="container-fluid" >
                        <div className='row' style={{paddingTop: 'calc(1.5rem + 8px)', marginLeft: '20px'}}>
                            <div className=''>
                                <DatePickerTab startDate={this.state.startDate} endDate={this.state.endDate} onDatesChange={({ startDate, endDate }) => this.setState({
                                  ...this.state,
                                  startDate,
                                  endDate
                                })} className='d-flex justify-content-center' />
                            </div>
                            <div className='pl-3' style={{minWidth: '300px'}}>
                                <SearchInput placeholder='Search by location' value={this.state.searchText} onChange={(e) => this.setState({
                                    ...this.state,
                                    searchText: e.target.value
                                })} />
                            </div>
                            
                        </div>
                        <div className="row">
                            <div className='col-md-3 pt-2 mt-1'>
                                <Metrics />
                            </div>
                            <div className="col-md-9">
                                <div className="row">
                                    <GraphContainer />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    }
}

export default connect(state => ({
    authData: state.auth.authData,
    isPickleAvailable: state.auth.isPickleAvailable
}))(Anlaytics)