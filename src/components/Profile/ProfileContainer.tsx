import React from 'react';
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {setUserProfileAC} from "../../redux/profile-reducer";
import {withRouter} from 'react-router-dom';


class ProfileContainer extends React.Component {
    componentDidMount() {
        //@ts-ignore
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = 1
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
            .then(response => {
                //@ts-ignore
                this.props.setUserProfileAC(response.data);
            });
    }

    render() {
        return (
            //@ts-ignore
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

const mapStateToProps = (state: any) => ({
    profile: state.profilePage.profile
})
//@ts-ignore
let WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, {setUserProfileAC})(WithUrlDataContainerComponent);