import React from 'react';
import PropTypes from 'prop-types';
import {
    getGenderDigits,
    getDestinyY,
    getWillY,
    getYValue,
    getYearsToday
} from '../../helpers/CalcNumericData';

import {
    root,
    digitsTable,
    lastDigit as lastDigitClass,
    yearsToday as yearsTodayClass,
    manDigits,
    womanDigits,
    destinyToday,
    willToday,
    row,
    cell,
    value,
    title,
    header
} from './DigitsTable.scss'

function DigitsTable({numericData, birthDate, mode = null}) {
    const {lastDigit, vector} = numericData;
    const yearsToday = getYearsToday(birthDate);
    const {man, woman} = getGenderDigits(vector);

    return (
        <div className={root} data-mode={String(mode || '').trim()}>
            <div className={header}/>
            <table className={digitsTable}>
                <tbody>
                    {mode !== 'graph-digits-today' ? (
                    <>
                        <tr className={`${row} ${yearsTodayClass}`}>
                            <td className={`${cell} ${title}`}>
                                Возраст сегодня
                            </td>
                            <td className={`${cell} ${title}`}>
                                {yearsToday}
                            </td>
                        </tr>
                        <tr className={`${row} ${manDigits}`}>
                            <td className={`${cell} ${title}`}>
                                Мужские цифры
                            </td>
                            <td className={`${cell} ${title}`}>
                                {man}
                            </td>
                        </tr>
                        <tr className={`${row} ${womanDigits}`}>
                            <td className={`${cell} ${title}`}>
                                Женские цифры
                            </td>
                            <td className={`${cell} ${title}`}>
                                {woman}
                            </td>
                        </tr>
                        <tr className={`${row} ${lastDigitClass}`}>
                            <td className={`${cell} ${title}`}>
                                Конечная цифра
                            </td>
                            <td className={`${cell} ${value}`}>
                                {lastDigit}
                            </td>
                        </tr>
                    </>
                    ) : (
                    <>
                        <tr className={`${row} ${destinyToday}`}>
                            <td className={`${cell} ${title}`}>
                                Судьба сегодня
                            </td>
                            <td className={`${cell} ${title}`}>
                                {getYValue(yearsToday, getDestinyY(birthDate))}
                            </td>
                        </tr>
                        <tr className={`${row} ${willToday}`}>
                            <td className={`${cell} ${title}`}>
                                Воля сегодня
                            </td>
                            <td className={`${cell} ${title}`}>
                                {getYValue(yearsToday, getWillY(birthDate))}
                            </td>
                        </tr>
                    </>
                    )}
                </tbody>
            </table>
        </div>
    );
}

DigitsTable.propTypes = {
    numericData: PropTypes.object.isRequired,
    birthDate: PropTypes.object.isRequired,
    mode: PropTypes.oneOf([null, 'graph-digits-today']),
};

export default DigitsTable;