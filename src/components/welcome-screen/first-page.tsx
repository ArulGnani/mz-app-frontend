import React, { useEffect, useReducer, useState } from 'react'
import './style/first-page.css'
import { reducer, initState } from './context'
import { Route, BrowserRouter, Redirect } from 'react-router-dom'

export const FirstPage: React.FC = () => {
    const [_, dispatch] = useReducer(reducer, initState)
    const [mainPage, toMainPage] = useState(false) 
        
    useEffect(() => {
        async function fetchData() {
            try {
                
                // meme-page-data
                await fetch("http://localhost:5000/api/get/latest/memes")
                    .then(res => res.json())
                    .then(data => {
                        dispatch({ 
                            type: "memePageData", 
                            payload: [...data] 
                        })
                    })
                    .catch(err => { throw err })
                        
                // tempalte-page-data
                await fetch("http://localhost:5000/api/main/categories")
                    .then(res => res.json())
                    .then(data => {
                        dispatch({ 
                            type: "templatePageData", 
                            payload: [...data] 
                        })    
                    })
                    .catch(err => { throw err })

                // info-page-data
                await fetch("http://localhost:5000/api/info")
                    .then(res => res.json())
                    .then(data => {
                        dispatch({ 
                            type: "infoPageData", 
                            payload: data 
                        })
                    })
                    .catch(err => { throw err })

                toMainPage(true)
            } catch(err) {
                alert("error in fetch data!..., pls try again later")
            }
        }
        fetchData()
    },[])

    if (mainPage) {
        return ( <Redirect to="/memes"/> )
    }

    return (
        <main>
            <BrowserRouter>
                <Route exact path="/">
                    <div className="logo"> logo </div>
                </Route>
            </BrowserRouter>
        </main>
    )
}
