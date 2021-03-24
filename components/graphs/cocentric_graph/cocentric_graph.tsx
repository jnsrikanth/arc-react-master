import React from 'react';
import * as d3 from 'd3';
import "./CocentricGraph.module.css";
import { GraphLable } from '../../graph_lable/graph_lable';

// Function called for each path appended to increase scale and iterate.
const arcFunction = (d, i, bk, pathArc, elementPercentage) => {
    var beamWidth = 80;
    var beamDirection = d
    var pi = Math.PI;
    var elementConst = ( 360 / (100 / elementPercentage[i]))-40
    var startAngleForeground = (360 + (beamDirection + elementConst)) * (pi / 180);
    var endAngleForeground = (360 + (beamDirection - (beamWidth / 2))) * (pi / 180);
    var el = bk._groups[0][i]
    console.log(el)
    return d3.select(el)
        .transition()
        .duration(750)
        .attr("d", pathArc.startAngle(startAngleForeground), pathArc.endAngle(endAngleForeground))
        .attr("d", pathArc.innerRadius(8 * (i + 1)), pathArc.outerRadius(8 * (i + 1) + 8))
        .attr("transform", "scale(1." + i + ")");
}

const arcFunction2 = (d, i, bk, pathArc, elementPercentage) => {
    console.log(bk)

    var beamWidth = 280;
    var beamDirection = 180 - d;
    var pi = Math.PI;
    var elementConst = (220 - 360 / (100 / elementPercentage[i]))
    var startAngleForeground = (360 + (beamDirection + (beamWidth / 2))) * (pi / 180);
    var endAngleForeground = (360 + (beamDirection - (elementConst))) * (pi / 180);
    var el = bk._groups[0][i]
    console.log(el)
    return d3.select(el)
        .transition()
        .duration(750)
        .attr("d", pathArc.innerRadius(8 * (i + 1)), pathArc.outerRadius(8 * (i + 1) + 8))
        .attr("d", pathArc.startAngle(startAngleForeground), pathArc.endAngle(endAngleForeground))
        .attr("transform", "scale(1." + i + ")");
}


export class CocentricGraph extends React.Component<any> {

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
        this.createCocentricGraph()
    }

    updateDimensions = () => {
        const height = this.containerRef.current.clientHeight;
        const width = this.containerRef.current.clientWidth;

        this.setState({ width, height }, () => {
            this.createCocentricGraph()
            console.log("barHeight", this.state)
        });
    };

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    componentDidUpdate() {
        this.createCocentricGraph()
    }

    createCocentricGraph = () => {
        var { width, height } = this.state
        var curvePercent = [45, 45, 45, 45, 45, 45];
        var backgroundpath = [315, 315, 315, 315, 315, 315];
        var elementPercentage = this.props.elementPercentage;
        var colours = ["#C6352A", "#273593", "#6C319A", "#31685C", "#F4A833", "#266296"].reverse();

        var pathArc = d3.arc()
            .innerRadius((width))
            .outerRadius((width))

        var svg = d3.select(this.node)
            .attr("width", width)
            .attr("height", height);

        svg.selectAll("*").remove();

        var curves = svg.append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        var background = svg.append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        const bk = background.selectAll("path")
            .data(backgroundpath)
            .enter().append("path").attr('stroke', 'none')

        bk.each((d, i) => arcFunction2(d, i, bk, pathArc, elementPercentage))
            .style("fill", function (d) {
                return "rgb(51,51,51)"
            })
            .style("border-width", "0px")
            .style("opacity", "0.8")
            .style("z-index", "10")

        const ck = curves.selectAll("path")
            .data(curvePercent)
            .enter().append("path")

        ck.each((d, i) => arcFunction(d, i, ck, pathArc, elementPercentage))
            .style("fill", function (d, i) {
                return colours[i];
            })
            .style("border-width", "0px")
            .style("z-index", "100000")
            .attr("d", pathArc).on("mouseover", function (d, i) {
                console.log(d)
            });
    }

    render() {
        const { height, width } = this.state
        const {elementPercentage}= this.props
        return <div className="light-tabl mb-1s" >

            <h6>Top Activities Reported By Me


            </h6>
            <div style={{ width: "100%", height: "100%" }}>
                <div className={"graphContainer"}>
                    <div ref={this.containerRef} className={"cocentricContainer"}>
                        <svg
                            ref={node => this.node = node}
                            style={{marginTop:10}}
                            width={width}
                            height={height}>

                        </svg>

                    </div>

                    <div className={"lableCocentricContaierParent"}>
                        <div className={"lableCocentricContaier"}>
                            <GraphLable color={"#C6352A"} title={`${elementPercentage[elementPercentage.length-1]}% Mobile`} />
                        </div>
                        <div className={"lableCocentricContaier"}>
                            <GraphLable color={"#273593"} title={`${elementPercentage[elementPercentage.length-2]}% X-Location`} />
                        </div>
                        <div className={"lableCocentricContaier"}>
                            <GraphLable color={"#6C319A"} title={`${elementPercentage[elementPercentage.length-3]}% Keywords`} />
                        </div>
                        <div className={"lableCocentricContaier"}>
                            <GraphLable color={"#31685C"} title={`${elementPercentage[elementPercentage.length-4]}% Unkown`} />
                        </div>
                        <div className={"lableCocentricContaier"}>
                            <GraphLable color={"#F4A833"} title={`${elementPercentage[elementPercentage.length-5]}% Gestures`} />
                        </div>
                        <div className={"lableCocentricContaier"}>
                            <GraphLable color={"#266296"} title={`${elementPercentage[elementPercentage.length-6]}% Other`} />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    }
}