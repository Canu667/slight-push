import React, { PropTypes } from 'react';
import moment from 'moment';

const d3 = window.d3;
const WIDTH = 600;
const HEIGHT = 180;
const MARGINS = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 50
};
const GraphSlightEdge = ({startOfTheWeek, tasks}) => {

    const vis = d3.select("#visualisation");

    const xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([0, 31]);
    const yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([-31, 31]);
    const xAxis = d3.svg.axis().scale(xScale);
    const yAxis = d3.svg.axis().scale(yScale);

    vis.append("svg:g")
        .attr("class", "axis")
        .attr("transform", `translate(0, ${HEIGHT/2})`)
        .call(xAxis);

    const mLeft = MARGINS.left;
    vis.append("svg:g")
         .attr("class", "axis")
        .attr("transform", `translate(${mLeft},0)rotate(90)`)
         .call(yAxis);

    const lineGen = d3.svg.line()
        .x((d) => xScale(d.day))
        .y((d) => yScale(d.increment));

    const area = d3.svg.area()
        .x((d) => xScale(d.day))
        .y0(HEIGHT / 2)
        .y1((d) => yScale(d.increment));

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

    /* eslint no-param-reassign: [0] */
    const progressInWeek = Object.keys(tasks).reduce((previousArray, timestamp) => {
            const currentDate = moment.unix(timestamp.substring(0, 10));
            if (startOfTheWeek.get('month') === currentDate.get('month')) {
                previousArray.push(currentDate.get('date'));
            }
        return previousArray;
        }, []
    );

    const userSlightEdgeTrack = [];
    let increment = 0;
    for(let i = 0; i <= 30; i += 1) {
        userSlightEdgeTrack.push({
            'day' : i,
            'increment' : increment
        });
        if (progressInWeek.indexOf(i) !== -1) {
            increment += 1;
        } else {
            increment -= 1;
        }
    }

    vis.append('svg:path')
        .attr('d', lineGen(positive))
        .attr('stroke', 'green')
        .attr('stroke-width', 3)
        .attr('fill', 'none');

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
        <div className="graph-container">
                <svg id="visualisation" width="{WIDTH}" height="{HEIGHT}"/>
        </div>
    )
}

GraphSlightEdge.defaultProps = {
    tasks: {}
};

GraphSlightEdge.propTypes = {
    startOfTheWeek: PropTypes.func.isRequired,
    tasks: PropTypes.func.isRequired,
};

export default GraphSlightEdge;