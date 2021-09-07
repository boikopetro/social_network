import React, {ChangeEvent, useEffect, useState} from "react";

const ProfileStatusWithHooks = (props: any) => {
    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(props.status)

    useEffect( () => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode &&
            <div>
                <span onDoubleClick={activateEditMode}>{props.status || "No status"}</span>
            </div>
            }
            {
                editMode &&
                <div>
                    <input onBlur={deactivateEditMode} onChange={onStatusChange} value={status} autoFocus/>
                </div>
            }
        </div>
    )
}


export default ProfileStatusWithHooks;