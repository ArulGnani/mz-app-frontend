import React, { ReactNode } from 'react'
import { Header } from './header'
import { NavBar } from './navbar'
import "./style/layout.css"

type Iprops = {
    body: ReactNode
}

export const Layout: React.FC<Iprops> = ({ body }: Iprops) => {
    return (
        <main>
            <Header/>
                <section id="body">
                    { body }
                </section>
            <NavBar />
        </main>
    )
}