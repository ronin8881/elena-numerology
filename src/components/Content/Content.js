import PropTypes from "prop-types";
import React from 'react';
import {observer} from 'mobx-react';
import SetBirthDateForm from '../SetBirthDateForm/SetBirthDateForm.connected';
import CalculationResults from '../CalculationResults/CalculationResults.connected';
import {
    root
} from './Content.scss'

function Content(props) {
    const birthDate = props.store.birthDate;
    const children = (birthDate == null ? <SetBirthDateForm /> : <CalculationResults />);
    return (
        <div className={root}>
            {children}
        </div>
    );
}

Content.propTypes = {
    store: PropTypes.shape({
        birthDate: PropTypes.object,
        setBirthDate: PropTypes.func
    })
};

export default observer(Content);