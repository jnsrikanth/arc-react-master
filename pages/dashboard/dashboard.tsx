import React from 'react';

import { Navigator } from '../../components/navigator';
import { Search } from '../../components/search/search';
import GraphContainer from '../../components/graph-container/graph-container';
import VideoStats from '../../components/video-stats/video_status';
import DatePickerTab from '../../components/datepicker_tab/datepicker_tab';
import { connect } from "react-redux";


export class Dashboard extends React.Component<any> {


    state = {
        selected: "0",
    }


    renderSelected = () => {
        const { selected } = this.state
        switch (selected) {
            case "0":
                return <GraphContainer />
            case "1":
                return <VideoStats />
        }
        return <></>
    }

    render() {
        const { selected } = this.state

        return <body className="dark small-navigation">
            <Navigator onSelectTabOption={(selected) => { this.setState({ selected }) }} selected={selected} />
            <div id="main">
                <div className="main-content" style={{ paddingLeft: "2px !important", paddingTop: 0, paddingBottom: 0 }}>
                    <div className="container-fluid">
                        <div className="row">
                            <Search showTraders={selected != "0"} />
                            <div className="col-md-9">
                                <div className="row">
                                    <DatePickerTab />
                                    <div className="col-md-3 float-rignt text-right mt-3">
                                        <a onClick={() => { this.setState({ selected: '0' }) }} className={`tab-chart ${selected == "0" ? "active" : ""}`}><i className="nav-link-icon demo-icon icon-insert_chart_24px"></i></a>
                                        <a onClick={() => { this.setState({ selected: '1' }) }} className={`tab-chart ${selected == "1" ? "active" : ""}`}><i className="nav-link-icon demo-icon icon-notes_24px"></i></a>
                                    </div>
                                    <div className="clearfix"></div>
                                    {this.renderSelected()}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </body>
    }
}

export default connect(state => ({
    authData: state.auth.authData,
    isPickleAvailable: state.auth.isPickleAvailable
}))(Dashboard)