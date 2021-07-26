import React from "react";

/*type ProfileStatusType = {
    state: {
        editMode: boolean
    }
    activateEditMode: ()=> void
    deactivateEditMode: ()=> void
}*/

export type ProfileStatusPropsType = {
    //state: StateType
    updateStatus: (status: string) => void
    status: string
}

/*type StateType = {
    editMode: boolean
    status: string
}*/

class ProfileStatus extends React.Component<ProfileStatusPropsType> {

    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        });
    }
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateStatus(this.state.status);

    }
    onStatusChange = (e: any) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps: Readonly<ProfileStatusPropsType>, prevState: Readonly<{}>, snapshot?: any) {
       if(prevProps.status !== this.props.status) {
           this.setState({
               status: this.props.status
           })
       }


    }

    render() {
        return (
            <div>
                {
                    !this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status || "No status"}</span>
                    </div>
                }
                {
                    this.state.editMode &&
                    <div>
                        <input onChange={this.onStatusChange} onBlur={this.deactivateEditMode} value={this.state.status}
                               autoFocus/>
                    </div>
                }
            </div>
        )
    }


}

export default ProfileStatus;