import React, {PropTypes} from 'react';
import moment from 'moment';

const d3 = window.d3;
const WIDTH = 600;
const HEIGHT = 350;
const MARGINS = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 50
};
const GraphSlightEdge = ({startOfTheWeek, tasks, taskGroups}) => {
    d3.select("svg").remove();

    const vis = d3.select(".graph-container").append("svg").attr("width",WIDTH).attr("height", HEIGHT);

    const xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([0, 31]);
    const yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([-31, 31]);
    const xAxis = d3.svg.axis().scale(xScale);
    const yAxis = d3.svg.axis().scale(yScale);

    vis.append("svg:g")
        .attr("class", "axis")
        .attr("transform", `translate(0, ${HEIGHT / 2})`)
        .call(xAxis);

    const mLeft = MARGINS.left;
    vis.append("svg:g")
        .attr("class", "axis")
        .attr("transform", `translate(${mLeft},0)rotate(90)`)
        .call(yAxis);

    const lineGen = d3.svg.line()
        .x((d) => xScale(d.day))
        .y((d) => yScale(d.increment));

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
            if (startOfTheWeek.get('month') === currentDate.get('month')
            ) {
                const date = currentDate.get('date');
                previousArray[date] = tasks[timestamp];
            }
            return previousArray;
        }, {}
    );

    const graphIncrementGroups = {};
    Object.keys(taskGroups).forEach((taskGroup) => {
        graphIncrementGroups[taskGroup] = [];
        let increment = 1;
        /* eslint no-loop-func: [0] */
        for (let i = 0; i <= 30; i += 1) {
            let modifier = -1;
            if (progressInWeek[i]) {
                taskGroups[taskGroup].tasks.forEach((taskId) => {
                    if (progressInWeek[i][taskId]) {
                        const estimated = progressInWeek[i][taskId].estimated || 0;

                        const completedHashArray = progressInWeek[i][taskId].completed || [];
                        const done = Object.keys(completedHashArray).length;

                        if (done >= estimated) {
                            modifier = 1;
                        }
                    }
                });
            }

            increment += modifier;

            graphIncrementGroups[taskGroup].push({
                'day': i,
                'increment': increment
            });
        }
    });

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

    Object.keys(taskGroups).forEach((taskGroup) => {
        const id = `${taskGroup}-line`;
        vis.append('svg:path')
            .attr("id", id)
            .attr('d', lineGen(graphIncrementGroups[taskGroup]))
            .attr('stroke', taskGroups[taskGroup].color)
            .attr('stroke-width', 3)
            .attr('fill', 'none');
    });

    return (
        <div className="graph-container">
            <svg width="{WIDTH}" height="{HEIGHT}"/>
                <div className="legend">
                    {Object.keys(taskGroups).map(groupName => {
                        const groupColor = {
                            backgroundColor: taskGroups[groupName].color
                        };
                       return <div className="legend-label" style={groupColor}>{groupName}</div>;
                    })}
                </div>
        </div>
    )
}

GraphSlightEdge.defaultProps = {
    tasks: {},
    taskGroups: {
        'programming': {
            tasks: ['-LBpnbJ1_-gMJugb5whT', '-LBpreZ1QNhekUdkNyNd', '-LFD5IWCPjmHP6_1NdcB', '-LFD5IWCPjmHP6_1NdcB'],
            color: 'blue'
        },
        'deutsch': {
            tasks: ['-LBpn_ddwuQeu6bc4LPK', '-LFE9UiKlYXOrXM5Q54b'],
            color: 'green'
        },
        'weight': {
            tasks: ['-LFE9GqlKceeLK8T7yS_', '-LFE9-NKcc7cqxUUxAhB'],
            color: 'orange'
        },
        'aws': {
            tasks: ['-LFD5IWCPjmHP6_1NdcB'],
            color: 'yellow'
        }
    }
};

GraphSlightEdge.propTypes = {
    startOfTheWeek: PropTypes.func.isRequired,
    tasks: PropTypes.func.isRequired,
    taskGroups: PropTypes.func
};

export default GraphSlightEdge;