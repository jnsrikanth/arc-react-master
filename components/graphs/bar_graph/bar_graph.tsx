import React from 'react';
import * as d3 from 'd3';
import "./BarGraph.module.css";
import { BarGraphPropTypes } from './bar_graph_prop_type';
import { GraphLable } from '../../graph_lable/graph_lable';


function transitionStacked(y1Max, y, rect, x, width, data, barWidth) {
    y.domain([0, y1Max]);

    rect.transition()
        .duration(500)
        .delay((d, i) => i * 20)
        .attr("y", d => y(d[1]))
        .attr("height", d => y(d[0]) - y(d[1]))
        .transition()
        .attr("x", (d, i) => {
            return (x(data[i].date) - barWidth / 2)
        })
        .attr("width", barWidth);
}



export class BarGraph extends React.Component<BarGraphPropTypes> {
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
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
        this.updateDimensions()
        this.createBarGraph()
    }

    componentDidUpdate() {
        this.createBarGraph()
    }


    updateDimensions = () => {
        const height = this.containerRef.current.clientHeight;
        const width = this.containerRef.current.clientWidth;

        this.setState({ width, height }, () => {
            this.createBarGraph()
            console.log("barHeight", this.state)
        });
    };

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }


    createBarGraph = () => {
        const { data } = this.props
        const { height, width } = this.state
        var layersName = ["escalated", "reported"];
        data.forEach(d => {
            layersName.forEach(c => { d[c] = +d[c] })
        })

        const margin = ({ top: 20, right: 20, bottom: 30, left: 30 })
        const svg = d3.select(this.node)
        svg.selectAll("*").remove();

        var barWidth = (20)

        svg.style("overflow", "visible");
        var n = layersName.length;
        //  var m = data.length;

        var yz = layersName.map((d) => data.map(c => c[d]))
        var y01z = d3.stack()
            .keys(d3.range(n))
            (d3.transpose(yz)) // stacked yzmodule
            .map((d, i) => d.map(([y0, y1]) => [y0, y1, i]))
        console.log("y01z", y01z)
        var xz = d3.extent(data, function (d) { return d.date; })
        var x = d3.scaleTime().range([0, width]).domain(xz);

        var y1Max = d3.max(y01z, y => d3.max(y, d => d[1]))

        var y = d3.scaleLinear()
            .domain([0, y1Max])
            .range([height - margin.bottom, margin.top])
        var z = ["rgb(244,168,51)", "rgb(108,49,154)"]
        const rect = svg.selectAll("g")
            .data(y01z)
            .join("g")
            .attr("fill", (d, i) => z[i])
            .selectAll("rect")
            .data(d => d)
            .join("rect")
            .attr("x", (d, i) => x(data[i].date) - barWidth / 2)
            .attr("y", height - margin.bottom)

            .attr("width", barWidth)
            .attr("height", 0)


        svg.selectAll("g")
            .filter(function (d, i) { return i == 0 })
            .selectAll("rect")
            .attr("clip-path", "url(#round-corner)")

        var xAxis = svg => svg.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .attr("class", "xAxis")
            .call(d3.axisBottom(x).tickSizeOuter(0).tickPadding(5).tickFormat(d3.timeFormat("%b")))

        var yAxis = svg => svg.append("g")
            .classed('y', true)
            .attr("class", "yAxis")
            .call(d3.axisLeft(y).ticks(4).tickPadding(12))

        svg.append("g")
            .call(xAxis);

        svg.append("g")
            .call(yAxis);

        transitionStacked(y1Max, y, rect, x, width, data, barWidth)

    }

    render() {
        const { width } = this.state
        return <div className="light-tabl mb-1s">
            <h6>
                % Reported Vs Escalated

            </h6>

            <div style={{  width: "100%", paddingLeft: 48, paddingRight:40, marginTop:20 }}>
                <div ref={this.containerRef} style={{ height: "100%", width: "100%" }}>
                    <svg
                        ref={node => this.node = node}
                        width={width}
                    >


                    </svg>

                </div>
                <div className={"lableContainer"}>
                    <GraphLable color={"rgb(108,49,154)"} title={"Reported"} />
                    <GraphLable color={"rgb(244,168,51)"} title={"Escalated"} />
                </div>
            </div>
        </div>
    }
}