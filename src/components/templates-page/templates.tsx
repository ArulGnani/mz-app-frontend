import React, { useEffect } from 'react'
import { useParams, useRouteMatch } from 'react-router-dom'

export const Templates: React.FC = () => {
    const { categoris, cid } = useParams()
    const { url } = useRouteMatch()
    
    useEffect(() => {
        console.log(categoris, cid, url)

    }, [])
    
    return (
        <div>
            <p>templates component</p>
        </div>
    )
} 