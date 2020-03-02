import {observable, action, configure} from 'mobx'

configure({enforceActions: 'always'});

const observableStore = observable({
    birthDate: null,
    setBirthDate(newBirthDate) {
        this.birthDate = newBirthDate;
    }
}, {
    setBirthDate: action
});

export default observableStore;