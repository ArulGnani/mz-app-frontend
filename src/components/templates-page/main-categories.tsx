import React, { useEffect, useState } from 'react'
import { Redirect, useRouteMatch } from 'react-router-dom'

interface Icategories {
    cid: string;
    categorie_name: string;
    end: boolean
}

export const MainCategories: React.FC = () => {
    const [categories, setCategories] = useState<Icategories[]>([])
    const [renderTemplates, setRenderTemplates] = useState(false)
    const [renderSubCategories, setRenderSubCategories] = useState(false)  
    const [cid, setCid] = useState("")
    const [categorie, setCategorie] = useState("")
    const { url } = useRouteMatch()

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
            setCid(cid)
            setCategorie(categorie_name)
            setRenderTemplates(true)
        } else {
            // render sub-categories
        }
    }

    if (renderSubCategories) {
        return (
            <div> render sub categorie </div>
        )
    }

    if (renderTemplates) {
        return (
            <Redirect to={`${url}/${cid}/end`} />
        )
    }

    return (
        <main>
            { categories.map(item => {
                return (
                    <div onClick={() => choiceCategorie(item)} key={item.cid}>
                        <p>{ item.categorie_name }</p>
                    </div>
                )
            })}
        </main>
    )
}
