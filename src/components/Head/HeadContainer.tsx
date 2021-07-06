import React from 'react';
import Header from "./Head";
import {connect} from "react-redux";
import {getAuthUsersData, logout} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";


type MapStateType = {
    isAuth: boolean
    login: string | null
    //logout: any
}
type MapDispatchPropsType = {
    getAuthUsersData: () => void
}

type HeaderContainerType = MapStateType & MapDispatchPropsType

class HeaderContainer extends React.Component <HeaderContainerType> {
    componentDidMount() {
        this.props.getAuthUsersData()
    }

    render() {
        //@ts-ignore
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state: AppStateType): MapStateType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
 //   logout: state.auth.logout,
});

export default connect(mapStateToProps, {getAuthUsersData, logout})(HeaderContainer);