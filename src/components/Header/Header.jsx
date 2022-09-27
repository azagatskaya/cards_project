import React from 'react';
import {Link} from 'react-router-dom';
import styles from './Header.module.scss';

// import Authentication from '../Auth/Auth.jsx';

function Header({onReturnToHomePage}) {
    return (
        <header className={styles.header}>
            <div className={styles.header__wrapper}>
                <Link to="/" onClick={onReturnToHomePage}>
                    <div className={styles.logo}></div>
                </Link>
                <Link to="/" onClick={onReturnToHomePage}>
                    <div className={styles.header_link}>Home</div>
                </Link>
            </div>
            {/* <Authentication />*/}
        </header>
    );
}

export default Header;
