import React from 'react';
import {
    getWillY,
    getDestinyY,
    getYearsToday,
    getYValue
} from '../../helpers/CalcNumericData';
import PropTypes from "prop-types";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
    Label,
    ResponsiveContainer,
    ReferenceLine
} from 'recharts';
import {
    root,
    header,
    chartWrap
} from './Graphs.scss'

function Graphs({birthDate}) {
    const willY = getWillY(birthDate);
    const destinyY = getDestinyY(birthDate);
    const yearStep = 12;
    const yearsToday = getYearsToday(birthDate);

    const data = [];
    const xTicks = [];
    willY.forEach((willVal, idx) => {
        const x = idx * yearStep;
        if (x > 0) {
            xTicks.push(x);
        }
        data.push({
            x,
            will: willVal,
            destiny: destinyY[idx]
        });
        if (yearsToday > x && yearsToday < (idx + 1) * yearStep && idx < willY.length - 1) {
            xTicks.push(yearsToday);
            data.push({
                x: yearsToday,
                will: Number(getYValue(yearsToday, willY)),
                destiny: Number(getYValue(yearsToday, destinyY))
            });
        }
    });
    const yDomain = [0, 9];
    const yTicks = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const xDomain = [data[0].x, data[data.length - 1].x];
    console.log(xTicks, xDomain, data);

    return (
        <div className={root}>
            <div className={header}>
                Графики судьбы и воли
            </div>
            <div className={chartWrap}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{top: 20, bottom: 20, right: 40}}
                    >
                        <XAxis dataKey="x" type="number" ticks={xTicks} domain={xDomain}>
                            <Label value="Возраст" position="insideBottom" offset={-7}/>
                        </XAxis>
                        <YAxis domain={yDomain} ticks={yTicks}/>
                        <Tooltip/>
                        <CartesianGrid/>
                        <Legend layout="horizontal" verticalAlign="top" align="center" wrapperStyle={{top: 10}}/>
                        <ReferenceLine x={yearsToday} stroke="green" label="Возраст сегодня" ifOverflow={'extendDomain'}
                                       isFront={true}/>
                        <Line name="Воля" type="linear" dataKey="will" stroke="#f80202"/>
                        <Line name="Судьба" type="linear" dataKey="destiny" stroke="#026df8"/>

                    </LineChart>
                </ResponsiveContainer>

            </div>
        </div>
    );
}

Graphs.propTypes = {
    birthDate: PropTypes.object.isRequired,
};

export default Graphs;