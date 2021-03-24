import React, { useLayoutEffect, useRef } from 'react'
import { TRADERS_ROUTE } from '../../../utils/route_const';
import Router from 'next/router';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_continentsLow from "@amcharts/amcharts4-geodata/continentsLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

/* Chart code */ 
// Themes begin
//am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);
// Themes end


export const PulseMap = props => {
    const chartRef = useRef<am4maps.MapChart | null>(null);
    useLayoutEffect(() => {
        
        let chart = am4core.create("chartdiv", am4maps.MapChart);
        chartRef.current = chart
        // Set map definition
        chart.geodata = am4geodata_continentsLow;

        // Set projection
        chart.projection = new am4maps.projections.Miller();
        chart.seriesContainer.draggable = false;
        chart.seriesContainer.resizable = false;
        chart.maxZoomLevel = 1;
        chart.logo.disabled = true

        // Create map polygon series
        let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

        // Exclude Antartica
        polygonSeries.exclude = ["antarctica", 'IN'];

        // Make map load polygon (like country names) data from GeoJSON
        polygonSeries.useGeodata = true;

        // Configure series
        let polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.polygon.fillOpacity = 1;
        polygonTemplate.polygon.strokeOpacity = 0;
        polygonTemplate.polygon.fill = am4core.color('#d9d9d9')


        // Create hover state and set alternative fill color
        let hs = polygonTemplate.states.create("hover");
        hs.properties.fill = chart.colors.getIndex(0);

        // Add image series
        let imageSeries = chart.series.push(new am4maps.MapImageSeries());
        imageSeries.mapImages.template.propertyFields.longitude = "longitude";
        imageSeries.mapImages.template.propertyFields.latitude = "latitude";
        imageSeries.mapImages.template.tooltipText = "{title}";
        imageSeries.mapImages.template.propertyFields.url = "url";

        let circle = imageSeries.mapImages.template.createChild(am4core.Circle);
        circle.radius = 3;
        circle.propertyFields.fill = "color";

        let circle2 = imageSeries.mapImages.template.createChild(am4core.Circle);
        circle2.radius = 3;
        circle2.propertyFields.fill = "color";

        circle2.events.on("hit", function(event){
            if(event.target.dataItem instanceof am4core.DataItem) {
                const { dataContext }: { dataContext: any } = event.target.dataItem
                console.log(dataContext.title)
                if(dataContext.title === "Amsterdam")
                    Router.push(TRADERS_ROUTE)
            }
        })


        circle2.events.on("inited", function(event){
        animateBullet(event.target);
        })


        function animateBullet(circle) {
            let animation = circle.animate([{ property: "scale", from: 1, to: 5 }, { property: "opacity", from: 1, to: 0 }], 1000, am4core.ease.circleOut);
            animation.events.on("animationended", function(event){
            animateBullet(event.target.object);
            })
        }

        imageSeries.data = [
            {
                title: "Hong Kong",
                latitude: 22.3526632,
                longitude: 113.9876153,
                color: '#33cc33'
            },
            {
                title: "Singapore",
                latitude: 1.3139961,
                longitude: 103.7041645,
                color: '#33cc33'
            },
            {
                title: "Amsterdam",
                latitude: 52.3546449,
                longitude: 4.8339211,
                color: '#F9A825'
            },
            {
                title: "London",
                latitude: 51.5285582,
                longitude: -0.2416802,
                color: '#33cc33'
            },
            {
                title: "New York",
                latitude: 40.6971494,
                longitude: -74.2598614,
                color: '#33cc33'
            }
        ];
        return () => {
            chart.dispose();
        };
    }, [])
    return <>
        <div id='chartdiv' style={{ width: "100%", height: "100%" }}>Pulse Map</div>
    </>
}

export default PulseMap