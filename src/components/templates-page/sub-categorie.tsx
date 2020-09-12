import React, { useEffect, useState } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { Layout } from '../layout/layout'

interface Icategories {
    cid: string;
    categorie_name: string;
    end: boolean
}

export const SubCategorie: React.FC = () => {
    const { pid } = useParams()
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState<Icategories[]>([])
    const [renderTemplates, setRenderTemplates] = useState(false)
    const [renderSubCategories, setRenderSubCategories] = useState(false)
    const [cid, setCid] = useState("")

    useEffect(() => { loadAllCategories() }, [])

    const loadAllCategories = async () => {
        setLoading(true)
        await fetch(`http://localhost:5000/api/sub/categories/${pid}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                
                setCategories(existingCategories => [...existingCategories, ...data])

            })
            .catch((_) => { alert("error while fetchin data, try again later")} )
            .finally(() => setLoading(false))
    }

    const openCategories = ({ cid, end}: Icategories): void => {
        if (end) { 
            console.log("render tempaltes")
            setCid(cid)
            setRenderTemplates(true)
        } else {
            // render sub catergorie of this cid
            console.log("render sub-categories") 
            setRenderSubCategories(true)
        }
    }

    if (renderTemplates) {
        return (
            <Redirect to={`/templates/${cid}/end`}/>
        )
    }

    if (renderSubCategories) {
        return (
            <Redirect to={`/templates/${cid}`} />
        )
    }

    return (
        <Layout body={
            <section id="sub-categorie">
                { loading ? <p id="loading"> loading... </p> : null }

                { categories.map(categorie => {
                    return (
                        <div onClick={() => openCategories(categorie)}
                            key={categorie.cid} id="main-categorie">
                            <p>{ categorie.categorie_name }</p>
                        </div>
                    )
                }) }

            </section>
        }/>
    )
}
