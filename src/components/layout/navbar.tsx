import React, { useState, useEffect } from 'react'
import { Redirect, useRouteMatch } from 'react-router-dom'
import './style/navbar.css'
import infoIcon from './asserts/info.png'

export const NavBar: React.FC =  () => {
    const [memesPage, toMemesPage] = useState(false)
    const [templatesPage, toTemplatesPage] = useState(false)
    const [infoPage, toInfoPage] = useState(false)  
    const { path } = useRouteMatch()

    if (memesPage && path !== "/") return ( <Redirect to="/"/> )

    if (templatesPage && path !== "/templates") return ( <Redirect to="/templates"/> )

    if (infoPage && path !== "/info") return ( <Redirect to="/info"/> )

    return (
        <section id="nav-comp">
            <nav>
                <ul>
                    <li onClick={() => toMemesPage(true)}> 
                        <p> meme </p> 
                    </li>
                    <li onClick={() => toTemplatesPage(true)}>
                        <p> templates </p> 
                    </li>
                    <li onClick={() => toInfoPage(true)}>
                        <img src={infoIcon} alt="info" />     
                    </li> 
                </ul>
            </nav>
        </section>        
    )
}