import React from 'react';
import Header from './Header/Header.js';
import Footer from './Footer/Footer.js';
import Content from './Content/Content.js';
import store from '../store/observableStore.js';
import {root} from './App.scss';

function App () {
    return (
        <div className={root}>
            <Header/>
            <Content store={store}/>
            <Footer/>
        </div>
    );
}

export default App;