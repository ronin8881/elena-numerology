import CalculationResultsAbstract from './CalculationResults.abstract';
import {observer} from 'mobx-react';
import store from '../../store/observableStore';
import React from 'react';

const CalculationResultsObserver = observer(CalculationResultsAbstract);

function CalculationResultsConnected() {
    return (
        <CalculationResultsObserver store={store}/>
    );
}

export default CalculationResultsConnected;