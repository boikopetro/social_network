import React from "react";
import {Redirect} from "react-router-dom";
import {RootStateType} from "../redux/store";
import {connect} from "react-redux";
import {MapStatePropsTypeForRedirect} from "../components/Profile/ProfileContainer";

const mapStateToPropsForRedirect = (state: RootStateType): MapStatePropsTypeForRedirect => ({
    //@ts-ignore
    isAuth: state.auth.isAuth
});

export const withAuthRedirect = (Component: any) => {
    class RedirectComponent extends React.Component {
        render() {
            //@ts-ignore
            if (!this.props.isAuth) return <Redirect to={"/login"}/>
            return <Component {...this.props} />

        }
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);

    return ConnectedAuthRedirectComponent;
}
