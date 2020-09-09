import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useParams, useRouteMatch } from 'react-router-dom'
import { Layout } from '../layout/layout'
import { Template } from './template'


interface Itemplates {
    tid: string;
    url: string
}

export const Templates: React.FC = () => {
    const { cid } = useParams()
    const { url } = useRouteMatch()
    const [templates, setTemplates] = useState<Itemplates[]>([])
    const [loading, setLoading] = useState(false)
    const lid = useRef(0)

    const noTemplates = useRef(false)
    const observer = useRef<IntersectionObserver>()
    const lastTemplateRef = useCallback(node => {

        if (observer.current) observer.current.disconnect()
        
        observer.current = new IntersectionObserver(e => {

            if (e[0].isIntersecting && noTemplates.current === false) {
                console.log('get memes', noTemplates.current)
                LoadTemplates()
            }

        },{ threshold: 1 })

        if (node) observer.current.observe(node)
    }, [])

    useEffect(() => {
        if (cid !== null) {
            lid.current = 0
            LoadTemplates() 
        }
    }, [])

    const LoadTemplates = async() => {
        setLoading(true)

        console.log('lid', lid.current)

        await fetch(`http://localhost:5000/api/get/templates/${cid}/${lid.current}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)

                if (data.length === 0) {
                    noTemplates.current = true
                    alert("that all the templates we have right now!...")
                }  
                
                setTemplates(existringTemplates => [...existringTemplates, ...data])
                lid.current += 10
            })
            .catch((_) => {
                alert("error in fetching data, try again later.")
                return 
            })
            .finally(() => setLoading(false))
    }
    
    return (
        <Layout body= {
            <React.Fragment>

                { templates.map((template, tIdx) => {
                    return (
                        <div ref={ tIdx + 1 === templates.length ? lastTemplateRef : null }
                            key={tIdx}
                        >
                            <Template tid={template.tid} url={template.url}/>
                        </div>
                    )
                })}

                { loading ? <div id="loading"> loading... </div> : null }
 
            </React.Fragment>
        }/>
    )
} 