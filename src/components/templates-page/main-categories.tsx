import React, { useEffect, useState, useRef } from 'react'
import { Redirect, useRouteMatch } from 'react-router-dom'
import './style/main-categories.css'

interface Icategories {
    cid: string;
    categorie_name: string;
    end: boolean
}

export const MainCategories: React.FC = () => {
    const [categories, setCategories] = useState<Icategories[]>([])
    const [renderTemplates, setRenderTemplates] = useState(false)
    const [renderSubCategories, setRenderSubCategories] = useState(false)  
    const { url } = useRouteMatch()
    const [categorieId, setCategorieId] = useState("")

    useEffect(() => {
        loadMainCategories()
    }, [])

    useEffect(() => {
        sessionStorage.setItem("categories", JSON.stringify([...categories]))
    }, [categories])

    const loadMainCategories = async () => {
        await fetch("http://localhost:5000/api/main/categories")
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.length === 0) {
                    alert("something went wrong!...")
                }
                setCategories(existingCategories => [...existingCategories, ...data])
            })
            .catch((_) => alert("error while fetching data, try some time later.."))
    }

    const choiceCategorie = ({ end, cid, categorie_name }: Icategories): void => {
        if (end === true) { 
            setCategorieId(cid)
            setRenderTemplates(true)
        } else {
            // categorieId.current = cid
            setCategorieId(cid)
            setRenderSubCategories(true)
        }
    }

    if (renderSubCategories) {
        return (
            <Redirect to={`/templates/${categorieId}`} />
        )
    }

    if (renderTemplates) {
        return (
            <Redirect to={`${url}/${categorieId}/end`} />
        )
    }

    return (
        <section id="temaplte-page">
            { categories.map(item => {
                return (
                    <div onClick={() => choiceCategorie(item)} 
                        key={item.cid} id="main-categorie">
                        <p>{ item.categorie_name }</p>
                    </div>
                )
            })}
        </section>
    )
}


