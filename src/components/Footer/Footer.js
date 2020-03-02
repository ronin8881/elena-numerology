import React from 'react';
import moment from 'moment';
import {
    root
} from './Footer.scss';

const curYear = moment().year();

function Footer() {
    return (
        <div className={root}>
            &copy; {curYear}
        </div>
    );
}

export default Footer;