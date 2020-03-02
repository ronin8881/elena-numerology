import PropTypes from "prop-types";
import React, {Component} from 'react';
import moment from 'moment';
import generateId from '../../helpers/IncId.js';
import Inputmask from 'inputmask';
import {
    root,
    dateInputLabel,
    header,
    form,
    dateInputWrap,
    dateInputLabelWrap,
    submitBtnWrap,
    submitBtn,
    dateInput
} from './SetBirthDateForm.scss';

class SetBirthDateFormAbstract extends Component {
    constructor(props) {
        super(props);
        this.dateFieldName = 'BirthDate';
        this.dateFieldId = generateId(this.dateFieldName);
        this.state = {
            dateIsCorrect: true,
            date: null
        };
    }

    componentDidMount() {
        Inputmask('datetime', {
            inputFormat: 'dd.mm.yyyy',
            placeholder: 'дд.мм.гггг',
            clearMaskOnLostFocus: false
        }).mask(`#${this.dateFieldId}`);
        const element = document.getElementById(this.dateFieldId);
        element && element.focus && element.focus();
    }

    onSubmit(event) {
        event.preventDefault();
        if (
            this.state.date != null
            &&
            this.state.dateIsCorrect === true
        ) {
            this.props.store.setBirthDate(this.state.date);
        }
    }

    onDateInput(event) {
        const momentDate = moment(event.target.value, 'DD.MM.YYYY', true);
        if (
            momentDate.isValid()
            &&
            momentDate.valueOf() >= moment().subtract(72, 'years').valueOf()
            &&
            momentDate.valueOf() <= moment().valueOf()
        ) {
            this.setState((state) => {
                return Object.assign({}, state, {
                    dateIsCorrect: true,
                    date: momentDate
                });
            })
        } else {
            this.setState((state) => {
                return Object.assign({}, state, {dateIsCorrect: false, date: null});
            });
        }
    }

    render() {
        const submitIsDisabled = this.state.dateIsCorrect !== true || this.state.date == null;
        return (
            <div className={root}>
                <div className={header}>Рассчет матрицы</div>
                <form className={form} onSubmit={(e) => this.onSubmit(e)}>
                    <div className={dateInputLabelWrap}>
                        <label className={dateInputLabel} htmlFor={this.dateFieldId}>
                            Дата рождения
                        </label>
                    </div>
                    <div className={dateInputWrap}>
                        <input className={dateInput} type="text"
                               name={this.dateFieldName}
                               id={this.dateFieldId}
                               onInput={(e) => this.onDateInput(e)}
                        />
                    </div>
                    <div className={submitBtnWrap}>
                        <button className={submitBtn} type="submit" disabled={submitIsDisabled}>
                            Рассчитать
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

SetBirthDateFormAbstract.propTypes = {
    store: PropTypes.shape({
        birthDate: PropTypes.object,
        setBirthDate: PropTypes.func
    })
};

export default SetBirthDateFormAbstract;