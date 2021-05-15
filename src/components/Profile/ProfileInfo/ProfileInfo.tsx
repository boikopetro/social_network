import React from 'react';
import styles from './ProfileInfo.module.css'

const ProfileInfo = () => {
    return (
        <div className={styles.profileBlock}>
            <div>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZnGKVh4G3LQ1VMuxdmKnxKcsplUeSx1EbDQ&usqp=CAU"/>
            </div>
            <div>
                ava+description
            </div>
        </div>
    )
}

export default ProfileInfo;