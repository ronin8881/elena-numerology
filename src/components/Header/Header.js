import React from 'react';
import {
    header,
    title
} from './Header.scss';


function Header() {
    return (
        <div className={header}>
            <div className={title}>
                <div>Психолог нумеролог</div>
                <div>Елена Хлопцева</div>
            </div>
        </div>
    );
}

export default Header;