import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import './style/navbar.css'

export const NavBar: React.FC =  () => {
    const [memesPage, toMemesPage] = useState(false)
    const [templatesPage, toTemplatesPage] = useState(false)
    const [infoPage, toInfoPage] = useState(false)  

    if (memesPage) return ( <Redirect to="/"/> )

    if (templatesPage) return ( <Redirect to="/templates"/> )

    if (infoPage) return ( <Redirect to="/info"/> )

    return (
        <section>
            <nav>
                <ul>
                    <li onClick={() => toMemesPage(true)}> 
                        memes 
                    </li>
                    <li onClick={() => toTemplatesPage(true)}>
                        templates 
                    </li>
                    <li onClick={() => toInfoPage(true)}>
                        info     
                    </li> 
                </ul>
            </nav>
        </section>        
    )
}