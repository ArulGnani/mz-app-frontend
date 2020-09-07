import React, { useEffect, useState } from 'react'
import { useParams, useRouteMatch } from 'react-router-dom'
import { Layout } from '../layout/layout'


interface Itemplates {
    tid: string;
    url: string
}

export const Templates: React.FC = () => {
    const { cid } = useParams()
    const { url } = useRouteMatch()
    const [templates, setTemplates] = useState<Itemplates[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (cid !== null) {
            // LoadTemplates()
            // deside why tempaltes for client? 
        }
    }, [])

    
    const LoadTemplates = async() => {
        setLoading(true)
        await fetch(`http://localhost:5000/api/get/templates/${cid}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setTemplates(existringTemplates => [...existringTemplates, ...data])
            })
            .catch((_) => {
                alert("error in fetching data, try again later.")
                return 
            })
    }
    
    return (
        <Layout body= {
            <React.Fragment>
                
                { loading ? <p>loading...</p> : null }

                <p>render templates </p>
 
            </React.Fragment>
        }/>
    )
} 