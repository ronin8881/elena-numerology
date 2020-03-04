import React from 'react';
import {
    header,
    title
} from './Header.scss';


function Header() {
    return (
        <div className={header}>
            <div className={title}>
                <div>Елена Хлопцева</div>
                <div>Психолог нумеролог</div>
            </div>
        </div>
    );
}

export default Header;