import PropTypes from "prop-types";
import React from 'react';
import {calcNumericData} from './../../helpers/CalcNumericData';
import PsychoMatrix from './PsychoMatrix';
import DigitsTable from './DigitsTable';
import Graphs from './Graphs';
import {
    root,
    header,
    birthDate as birthDateClass,
    resetButtonWrap,
    resetBtn,
    headerWrap
} from './CalculationResults.scss';

function CalculationResultsAbstract({store}) {

    const {birthDate} = store;
    const numericData = calcNumericData(birthDate);
    return (
        <div className={root}>
            <div className={headerWrap}>
                <div className={header}>
                    Дата рождения
                </div>
                <div className={birthDateClass}>
                    {`${birthDate.format('DD.MM.YYYY')}г`}
                </div>
            </div>

            <DigitsTable numericData={numericData} birthDate={birthDate}/>

            <PsychoMatrix numericVector={numericData.vector}/>

            <Graphs birthDate={birthDate}/>

            <DigitsTable numericData={numericData} birthDate={birthDate} mode={'graph-digits-today'}/>

            <div className={resetButtonWrap}>
                <button className={resetBtn} type="button" onClick={() => store.setBirthDate(null)}>
                    Изменить дату рождения
                </button>
            </div>
        </div>
    );

}

CalculationResultsAbstract.propTypes = {
    store: PropTypes.shape({
        birthDate: PropTypes.object.isRequired,
        setBirthDate: PropTypes.func,
    })
};

export default CalculationResultsAbstract;