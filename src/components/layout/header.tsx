import React from 'react'
import './style/header.css'

interface Iprops {
    content?: string
}

export const Header: React.FC<Iprops> = ({ content }: Iprops) => {
    return (
        <header>
            {/* { content !== null ? content : "mz-app" } */}
            mz-app
        </header>
    )
}