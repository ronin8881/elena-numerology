import SetBirthDateFormAbstract from './SetBirthDateForm.abstract';
import {observer} from 'mobx-react';
import store from '../../store/observableStore';
import React from 'react';

const SetBirthDateFormObserver = observer(SetBirthDateFormAbstract);

function SetBirthDateFormConnected() {
    return (
        <SetBirthDateFormObserver store={store}/>
    );
}

export default SetBirthDateFormConnected;