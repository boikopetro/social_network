import React from 'react';
import './App.css';
import Header from "./components/Head/Head";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import News from "./components/News/News"
import Music from "./components/Music/Music";
import Profile from "./components/Profile/Profile";
import Settings from "./components/Settings/Settings";
import {Route} from 'react-router-dom';
import DialogsContainer from "./components/Dialogs/Message/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";

const App = () => {
    return (

        <div className="app-wrapper">
            <Header/>
            <Nav/>
            <div className="app-wrapper-content">
                <Route path='/profile'
                       render={() => <Profile/>}
                />

                <Route path='/dialogs'
                       render={() => <DialogsContainer/>}
                />
                <Route path='/news' component={News}/>
                <Route path='/music' component={Music}/>
                <Route path='/settings' component={Settings}/>
                <Route path='/users' render={() => <UsersContainer/>}/>
            </div>
            <Footer/>
        </div>
    )
}
export default App;