import React from "react";
import { connect } from "react-redux";

// pages/Foo.ts
import dynamic from "next/dynamic";

const Chart = dynamic(
    () => import("../map-charts/pulse-map/pulse-map"),
    { ssr: false }
);

export const GraphContainer = (props) => {

    return <>
        <div className="col-md-12" style={{ width: '100% '}}>
            <div className="" style={{position: 'relative',
                left: '-10%',
                top: '25px',
                width: '108%',
                height: '82vh'}}>
                <Chart />
            </div>
        </div>
        <div className="clearfix"></div>
        {/*<div className="col-md-4 col-wrapper activity-graph-container">
            <CocentricGraph height={160} width={100} elementPercentage={[22, 19, 18, 16, 15, 10]}
            />
        </div>
        <div className="col-md-5 pl-0 pr-0 col-wrapper">
            <BarGraph height={400} width={300} data={bar_graph_data} />
        </div>
        <div className="col-md-3 col-wrapper">
            <div className="light-tabl mb-1s" style={{ minHeight: 200 }}>
                <h6>Conduct Risk

                </h6>
                <div className="conduct-list-wrapper">
                    <div className="list-view">
                        <span className="list-title">london FX3</span>
                        <span className="list-value">49%</span>
                    </div>
                    <div className="list-view">
                        <span className="list-title">new york FX2</span>
                        <span className="list-value">38%</span>
                    </div>
                    <div className="list-view">
                        <span className="list-title">london FX1</span>
                        <span className="list-value">13%</span>
                    </div>
                </div>

</div>
</div>*/}
    </>
};

export default connect(state => ({
    selectedStartDate: state.global.selectedDates.startDate,
    selectedEndDate: state.global.selectedDates.endDate
}))(GraphContainer);