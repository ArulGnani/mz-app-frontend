import React from 'react';
import { FirstPage } from './components/welcome-screen/first-page';
import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { MemesPage } from './components/meme-page/memes-page';
import { TemplatesPage } from './components/templates-page/templates-page';
import { InfoComp } from './components/info-page/info-comp';
import { SubCategorie } from './components/templates-page/sub-categorie';
import { Templates } from './components/templates-page/templates-comp';

export const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                {/* <Route exact path="/">
                    <FirstPage />
                </Route> */}
                <Route exact path="/">
                    <MemesPage />    
                </Route>
                <Route exact path="/templates">
                    <TemplatesPage />
                </Route>
                <Route path="/templates/:cid/end">
                    <Templates />
                </Route>    
                <Route path="/categories/:cid">
                    <SubCategorie />
                </Route>
                <Route path="/info">
                    <InfoComp />
                </Route>
            </Switch>   
        </BrowserRouter>
    )
}
