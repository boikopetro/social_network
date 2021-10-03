import React from "react";
import "./App.css";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {BrowserRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Head/HeadContainer";
import Login from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import store, {AppStateType} from "./redux/redux-store";
import Preloader from "./components/common/Preloader/Preloader";
import {withSuspense} from "./hoc/withSuspense";


const DialogsContainer = React.lazy(() => import("./components/Dialogs/Message/DialogsContainer"))
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"))


type AppPropsType = {
    initializeApp: () => void
    initialized: boolean
}

class App extends React.Component<AppPropsType> {
    catchAllUnhandledErrors = (promiseRejectionEvent: PromiseRejectionEvent) => {
        alert(promiseRejectionEvent)
    }

    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        } else
            return (
                <div className="app-wrapper">
                    <HeaderContainer/>
                    <Nav/>
                    <div className="app-wrapper-content">
                        <Switch>
                            <Route exact path="/"
                                   render={() => <Redirect to={"/profile"}/>}/>
                            <Route path="/profile/:userId?"
                                   render={withSuspense(ProfileContainer)}/>
                            <Route path="/dialogs"
                                   render={withSuspense(DialogsContainer)}/>
                            <Route path="/news"
                                   render={withSuspense(News)}/>
                            <Route path="/music"
                                   render={withSuspense(Music)}/>
                            <Route path="/settings"
                                   render={withSuspense(Settings)}/>
                            <Route path="/users"
                                   render={withSuspense(UsersContainer)}/>
                            <Route path="/login"
                                   render={withSuspense(Login)}/>
                            <Route path="*"
                                   render={() => <div>404 not found</div>}/>
                        </Switch>
                    </div>
                    <Footer/>
                </div>
            )
    }
}

const mapStateToProps = (state: AppStateType) => ({
        initialized: state.app.initialized
    }
)

const AppContainer = compose(
    withRouter,
    connect(mapStateToProps,
        {
            initializeApp
        }
    ))(App) as React.ComponentType

const SocialNetworkApp = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}


export default SocialNetworkApp;