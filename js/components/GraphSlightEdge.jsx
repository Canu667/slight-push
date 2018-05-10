import React from 'react';

const GraphSlightEdge = () => {

    let vis = d3.select("#visualisation"),
        WIDTH = 1000,
        HEIGHT = 500,
        MARGINS = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 50
        },
        xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([0, 31]),
        yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([-31, 31]),
        xAxis = d3.svg.axis().scale(xScale),
        yAxis = d3.svg.axis().scale(yScale);


    vis.append("svg:g")
        .attr("class","axis")
        .attr("transform", "translate(0," + HEIGHT / 2 + ")")
        .call(xAxis);

    vis.append("svg:g")
        .attr("class","axis")
        .attr("transform", "translate(" + MARGINS.left + ",0)rotate(90)")
        .call(yAxis);

    const lineGen = d3.svg.line()
        .x(function (d) {
            return xScale(d.day);
        })
        .y(function (d) {
            return yScale(d.increment);
        });

    const area = d3.svg.area()
        .x(function(d) { return xScale(d.day); })
        .y0(HEIGHT / 2)
        .y1(function(d) { return yScale(d.increment); });

    const positive = [{
        "day": "0",
        "increment": "0"
    }, {
        "day": "31",
        "increment": "31"
    }];

    const negative = [{
        "day": "0",
        "increment": "0"
    }, {
        "day": "31",
        "increment": "-31"
    }];

    const userSlightEdgeTrack = [{
        "day": "0",
        "increment": "0"
    }, {
        "day": "1",
        "increment": "1"
    }, {
        "day": "2",
        "increment": "2"
    }, {
        "day": "3",
        "increment": "3"
    }, {
        "day": "4",
        "increment": "2"
    }, {
        "day": "5",
        "increment": "3"
    }, {
        "day": "6",
        "increment": "4"
    }, {
        "day": "7",
        "increment": "3"
    }, {
        "day": "8",
        "increment": "4"
    }, {
        "day": "9",
        "increment": "5"
    }, {
        "day": "10",
        "increment": "6"
    }, {
        "day": "11",
        "increment": "7"
    }, {
        "day": "12",
        "increment": "8"
    }, {
        "day": "13",
        "increment": "9"
    }, {
        "day": "14",
        "increment": "8"
    },{
        "day": "15",
        "increment": "9"
    }];


    vis.append('svg:path')
        .attr('d', lineGen(positive))
        .attr('stroke', 'green')
        .attr('stroke-width', 3)
        .attr('fill', 'none');

    vis.append('text')
        .attr('class', 'barsEndlineText')
        .attr('text-anchor', 'middle')
        .attr("x", 400)
        .attr("y", "150")
        .text('MAX')

    vis.append('svg:path')
        .attr('d', lineGen(negative))
        .attr('stroke', 'red')
        .attr('stroke-width', 3)
        .attr('fill', 'none');

    vis.append('svg:path')
        .attr('d', lineGen(userSlightEdgeTrack))
        .attr('stroke', 'purple')
        .attr('stroke-width', 3)
        .attr("class", "area")
        .attr("d", area(userSlightEdgeTrack))
        .attr('fill', 'none');

    return (
        <div className="container">

            <div className="jumbotron">
                <svg id="visualisation" width="1000" height="500"/>
            </div>

        </div>
    )
}

export default GraphSlightEdge;