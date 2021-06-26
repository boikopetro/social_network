import React, {ComponentType} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";

export type MapStatePropsTypeForRedirect = {
    isAuth: boolean
}

const mapStateToPropsForRedirect = (state: AppStateType): MapStatePropsTypeForRedirect => ({
    isAuth: state.auth.isAuth
});

export function withAuthRedirect<T>(Component: ComponentType<T>) {
    function RedirectComponent(props: MapStatePropsTypeForRedirect) {
        const {isAuth, ...restProps} = props;
        if (!isAuth) return <Redirect to={"/login"}/>
        return <Component {...restProps as T} />
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);

    return ConnectedAuthRedirectComponent;
}
