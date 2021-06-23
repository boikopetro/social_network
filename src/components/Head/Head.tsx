import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './Head.module.css'

type HeaderPropsType = {
    isAuth: boolean
    login: string | null
    getAuthUsersData: () => void
}

const Header = (props: HeaderPropsType) => {
    return (
        <header className={styles.header}>
            <img src="http://www.studiopozitiv.in.ua/wp-content/uploads/2013/01/minions.jpg" alt={"studiopozitiv"}/>
            <div className={styles.loginBlock}>
                {props.isAuth ? props.login : <NavLink to={"/login"}>Login</NavLink>}
            </div>
        </header>
    )
}
export default Header;