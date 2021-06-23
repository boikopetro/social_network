import React from 'react';
import Header from "./Head";
import {connect} from "react-redux";
import {getAuthUsersData} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";


type MapStateType = {
    isAuth: boolean
    login: string | null
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
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state: AppStateType): MapStateType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});

export default connect(mapStateToProps, {getAuthUsersData})(HeaderContainer);