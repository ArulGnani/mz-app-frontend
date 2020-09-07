import React, { useEffect } from 'react'
import { useParams, useRouteMatch } from 'react-router-dom'


export const SubCategorie: React.FC = () => {
    const { cid } = useParams()
    const { url } = useRouteMatch() 

    useEffect(() => {
        console.log(cid, url)
    }, [])

    // render sub-categorie

    // templates

    return (
        <div>
            sub categorire
        </div>
    )
}
