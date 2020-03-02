import React from 'react';
import PropTypes from 'prop-types';
import {
    root,
    header,
    matrix,
    row,
    cell,
    character,
    health,
    luck,
    energy,
    logic,
    debt,
    accuracy,
    work,
    memory
} from './PsychoMatrix.scss'

function PsychoMatrix(props) {
    const matrixValues = [];
    const numericVectorSorted = props.numericVector.sort();
    for (let i = 1; i <= 9; i++) {
        let value = '';
        while (numericVectorSorted.length > 0 && numericVectorSorted[0] === i) {
            value += String(i);
            numericVectorSorted.splice(0, 1);
        }
        matrixValues.push(value || '-');
    }
    return (
        <div className={root}>
            <div className={header}>
                Психоматрица
            </div>
            <table className={matrix} cellSpacing={0} cellPadding={0}>
                <tbody>
                <tr className={row}>
                    <td className={`${cell} ${character}`}>
                        {matrixValues[0]}
                    </td>
                    <td className={`${cell} ${health}`}>
                        {matrixValues[3]}
                    </td>
                    <td className={`${cell} ${luck}`}>
                        {matrixValues[6]}
                    </td>
                </tr>
                <tr className={row}>
                    <td className={`${cell} ${energy}`}>
                        {matrixValues[1]}
                    </td>
                    <td className={`${cell} ${logic}`}>
                        {matrixValues[4]}
                    </td>
                    <td className={`${cell} ${debt}`}>
                        {matrixValues[7]}
                    </td>
                </tr>
                <tr className={row}>
                    <td className={`${cell} ${accuracy}`}>
                        {matrixValues[2]}
                    </td>
                    <td className={`${cell} ${work}`}>
                        {matrixValues[5]}
                    </td>
                    <td className={`${cell} ${memory}`}>
                        {matrixValues[8]}
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

PsychoMatrix.propTypes = {
    numericVector: PropTypes.array.isRequired,
};

export default PsychoMatrix;