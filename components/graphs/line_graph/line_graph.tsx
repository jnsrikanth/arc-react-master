import React, { Component } from 'react'
import * as d3 from 'd3';
import './LineGraph.module.css'
import { LineGraphPropType } from './line_graph_prop_type';
import { GraphLable } from '../../graph_lable/graph_lable';



export class LineGraph extends Component<LineGraphPropType>{
    node: any
    containerRef: any
    state: {
        height: 0
        width: 0
    }
    constructor(props) {
        super(props)
        this.state = {
            height: props.height,
            width: props.width
        }
        this.containerRef = React.createRef()
        this.createLineGraph = this.createLineGraph.bind(this)
    }

    componentDidMount() {
        this.createLineGraph()
        window.addEventListener('resize', this.updateDimensions);
        this.updateDimensions()

    }

    componentDidUpdate() {
        this.createLineGraph()
    }

    updateDimensions = () => {
        const height = this.containerRef.current.clientHeight;
        const width = this.containerRef.current.clientWidth;



        this.setState({ width, height }, () => {
            this.createLineGraph()
            console.log(this.state)
        });
    };

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    createLineGraph() {

        const { data } = this.props
        const { height, width } = this.state
        const margin = ({ top: 20, right: 20, bottom: 30, left: 30 })


        const svg = d3.select(this.node)
        svg.selectAll("*").remove();
        svg.style("overflow", "visible");


        var x = d3.scaleTime().range([0, width]);
        var y0 = d3.scaleLinear().range([height, 0]);
        var y1 = d3.scaleLinear().range([height, 0]);

        var xAxis = d3.axisBottom(x)
            .tickSize(-height, 0)
            .ticks(5)
            .tickPadding(15)
            .tickFormat(d3.timeFormat("%b'%y"));

        var yAxisLeft = d3.axisLeft(y0).ticks(5).tickSize(-width, 0).tickPadding(10);

        var yAxisRight = d3.axisRight(y1).ticks(5);
        var valueLine = d3.line().x(function (d) { return x(d.date) }).y(function (d) { return y0(0); }).curve(d3.curveCatmullRom.alpha(0.5))
        var valueline1 = d3.line()
            .x(function (d) { return x(d.date); })
            .y(function (d) { return y0(d.audioVolume); })
            .curve(d3.curveCatmullRom.alpha(0.5));

        var valueline2 = d3.line()
            .x(function (d) { return x(d.date); })
            .y(function (d) { return y1(d.audioAlert); })
            .curve(d3.curveCatmullRom.alpha(0.5));

        var valueline3 = d3.line()
            .x(function (d) { return x(d.date); })
            .y(function (d) { return y0(d.videoVolume); })
            .curve(d3.curveCatmullRom.alpha(0.5));


        var valueline4 = d3.line()
            .x(function (d) { return x(d.date); })
            .y(function (d) { return y1(d.videoAlert); })
            .curve(d3.curveCatmullRom.alpha(0.5));

        svg.append("g").attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

        data.forEach(d => {
            d.audioAlert = +d.audioAlert
            d.audioVolume = +d.audioVolume
            d.videoAlert = +d.videoAlert
            d.videoVolume = +d.videoVolume
        })


        x.domain(d3.extent(data, function (d) { return d.date; }));

        y0.domain([0, d3.max(data, function (d) {
            return Math.max(Math.max(d.audioVolume), Math.max(d.videoVolume));
        })]);

        y1.domain([0, d3.max(data, function (d) {
            return Math.max(Math.max(d.audioAlert), Math.max(d.videoAlert));
        })]);

        svg.append("path")
            .style("stroke", "red")
            .attr("class", "line1")
            .attr("d", valueLine(data));

        svg.append("path")
            .style("stroke", "rgb(40,86,125)")
            .attr("class", "line2")
            .attr("d", valueLine(data));

        svg.append("path")
            .style("stroke", "green")
            .attr("class", "line3")
            .attr("d", valueLine(data));

        svg.append("path")
            .style("stroke", "yellow")
            .attr("class", "line4")
            .attr("d", valueLine(data));

        svg.append("g")
            .attr("class", "x axis grid")
            .attr("transform", "translate(0," + height + ")")
            .classed('x', true)
            .classed('grid', true)
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis grid")
            .style("fill", "steelblue")
            .classed('y', true)
            .classed('grid', true)
            .call(yAxisLeft);

        svg.append("g")
            .attr("class", "y axis grid")
            .attr("transform", "translate(" + width + " ,0)")
            .style("fill", "red")
            .call(yAxisRight);

        svg.selectAll(".line1")
            .transition()
            .duration(500)
            .ease(d3.easeLinear)
            .attr("d", valueline1(data));

        svg.selectAll(".line2")
            .transition()
            .duration(500)
            .ease(d3.easeLinear)
            .attr("d", valueline2(data));

        svg.selectAll(".line3")
            .transition()
            .duration(500)
            .ease(d3.easeLinear)
            .attr("d", valueline3(data));

        svg.selectAll(".line4")
            .transition()
            .duration(500)
            .ease(d3.easeLinear)
            .attr("d", valueline4(data));

    }

    render() {
        const { height, width } = this.state
        return <div className="light-tabl">
            <div className="row">
                <h6 style={{ marginLeft: 20 }}>Predicted Input and Impact
                </h6>

                <div className="col-md-12" style={{ padding: "20px 60px 40px" }}>
                    <div ref={this.containerRef} style={{ height: "100%", width: "100%" }}>
                        <svg ref={node => this.node = node}
                            width={width} height={height}>
                        </svg>
                    </div>
                </div>
                <div className={"lableContainerLine"}>
                    <div style={{ marginRight: 20 }}>
                        <GraphLable color={"red"} title={"Audio volume"} />
                    </div>
                    <div style={{ marginRight: 20 }}>

                        <GraphLable color={"rgb(40,86,125)"} title={"Audio alert"} />
                    </div>
                    <div style={{ marginRight: 20 }}>
                        <GraphLable color={"green"} title={"Video volume"} />
                    </div>
                    <div style={{ marginRight: 20 }}>
                        <GraphLable color={"yellow"} title={"Video alert"} />
                    </div>

                </div>
            </div>
        </div>
    }
}