import React from 'react'
import Header from "./Head"
import {connect} from "react-redux"
import {logout} from "../../redux/auth-reducer"
import {AppStateType} from "../../redux/redux-store"


type MapStateType = {
    isAuth: boolean
    login: string | null
}
type MapDispatchPropsType = {
    getAuthUsersData: () => void
    logout: any
}

type HeaderContainerType = MapStateType & MapDispatchPropsType

class HeaderContainer extends React.Component <HeaderContainerType> {
    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state: AppStateType): MapStateType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
})

export default connect(mapStateToProps, {logout})(HeaderContainer)