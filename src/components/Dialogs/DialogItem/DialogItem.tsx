import React from "react";
import {NavLink} from "react-router-dom";
import styles from './../Dialogs.module.css'
import {DialogItemType} from "../../../redux/dialogs-reducer";



const DialogItem = (props: DialogItemType) => {
    const path = '/dialogs/' + props.id;
    return (
        <div className={styles.dialogUser}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}

export default DialogItem