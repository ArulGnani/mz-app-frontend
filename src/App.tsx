import React from 'react';
import { FirstPage } from './components/welcome-screen/first-page';
import './App.css'
import { BrowserRouter, Route } from 'react-router-dom';
import { MemesPage } from './components/meme-page/memes-page';
import { TemplatesComp } from './components/templates-page/templates-comp';
import { InfoComp } from './components/info-page/info-comp';

export const App: React.FC = () => {
    return (
        <BrowserRouter>
            {/* <Route exact path="/">
                <FirstPage />
            </Route> */}
            <Route exact path="/">
                <MemesPage />    
            </Route>
            <Route path="/templates">
                <TemplatesComp />
            </Route> 
            <Route path="/info">
                <InfoComp />
            </Route>   
        </BrowserRouter>
    )
}
