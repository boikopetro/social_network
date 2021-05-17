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
/*import {AppStoreType} from "./redux/redux-store";*/
import DialogsContainer from "./components/Dialogs/Message/DialogsContainer";


/*type PropsType = {
    store: AppStoreType
}*/

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
            </div>
            <Footer/>
        </div>

    )
}
export default App;