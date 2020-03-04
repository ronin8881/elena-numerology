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
    ReferenceLine,
    ReferenceDot
} from 'recharts';
import {
    root,
    header,
    chartWrap,
    crossDotLabel
} from './Graphs.scss'
import moment from 'moment';

function Graphs({birthDate}) {
    const willY = getWillY(birthDate);
    const destinyY = getDestinyY(birthDate);
    const yearStep = 12;
    const yearsToday = getYearsToday(birthDate);

    const data = [];
    const xTicks = [];
    const graphsAreEqual = birthDate.format('DD.MM.YYYY').indexOf('0') === -1;
    const refDots = [];
    const yDomain = [0, 9];
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
        const x1 = idx * yearStep;
        const y1 = willVal;
        const x2 = (idx + 1) * yearStep;
        const y2 = willY[idx + 1];
        const x3 = x1;
        const y3 = destinyY[idx];
        const x4 = x2;
        const y4 = destinyY[idx + 1];
        const divider = (x4 * y1 - x4 * y2 + x3 * y2 - x3 * y1 + x1 * y3 - x1 * y4 - x2 * y3 + x2 * y4);
        if (
            idx < willY.length - 1
            &&
            !(willVal === destinyY[idx] && willY[idx + 1] === destinyY[idx + 1])
            &&
            divider !== 0
        ) {
            const rdX = Math.round(100 * (x4 * y1 * x2 - x4 * x1 * y2 + x3 * x1 * y2 - x3 * y1 * x2 + x1 * y3 * x4 - x1 * x3 * y4 - x2 * y3 * x4 + x2 * x3 * y4) / divider) / 100;
            if (rdX >= x1 && rdX <= x2) {
                let rdY = Number(getYValue(rdX, willY));
                if (
                    (refDots[refDots.length - 1] || {}).x !== rdX
                ) {
                    rdY = rdX !== (willY.length - 1) * yearStep ? rdY : willY[willY.length - 1];
                    refDots.push({
                        x: rdX,
                        y: rdY,
                        label: moment(birthDate).add(rdX, 'years').format('DD.MM.YYYY'),
                        offset: rdY >= (yDomain[1] - 0.5) || refDots.length % 2 !== 0 && rdY >= (yDomain[0] + 0.5) ? -15 : 15
                    });
                }
            }
        }
    });
    const yTicks = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const xDomain = [data[0].x, data[data.length - 1].x];

    return (
        <div className={root}>
            <div className={header}>
                Графики судьбы и воли
            </div>
            <div className={chartWrap}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{top: 20, bottom: 0, right: 40}}
                    >
                        <XAxis dataKey="x" type="number" ticks={xTicks} domain={xDomain}>
                            {/*<Label value="Возраст" position="insideBottom" offset={-7}/>*/}
                        </XAxis>
                        <YAxis domain={yDomain} ticks={yTicks}/>
                        <Tooltip/>
                        <CartesianGrid/>
                        <Legend layout="horizontal" verticalAlign="top" align="center" wrapperStyle={{top: 10}}/>
                        <ReferenceLine x={yearsToday} stroke="green" ifOverflow={'extendDomain'}
                                       isFront={true}/>
                        <Line name="Воля" type="linear" dataKey="will" stroke="#f80202"/>
                        <Line name="Судьба" type="linear" dataKey="destiny" stroke="#026df8"/>
                        {refDots.length > 0 ? (
                            refDots.map((dot, idx)=>(
                                <ReferenceDot key={idx} r={3} fill="black" stroke="black" x={dot.x} y={dot.y} isFront={true}>
                                    <Label className={crossDotLabel} value={dot.label} offset={dot.offset} position="insideBottom" />
                                </ReferenceDot>)
                            )
                        ): null}
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