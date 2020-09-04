import React, { useEffect, useState, useReducer } from 'react'
import './style/meme-comp.css'
import { reducer, initState, ImemePage } from '../welcome-screen/context'
import { Meme } from './meme'

export const MemeComp: React.FC = () => {
    const [state, dispatch] = useReducer(reducer, initState)
    const [memes, setMemes] = useState<ImemePage[]>([])

    useEffect(() => {
        if (window.performance.navigation.type === 1 || 
            window.performance.navigation.type === 0) {
            
            let lastReqTime = sessionStorage.getItem("lastReqTime")
            
            let nextReqTime = lastReqTime ? parseInt(lastReqTime) + 5 * 60000 : 0

            if (nextReqTime === null) getLatestMemes()

            if (new Date().getTime() > nextReqTime) {
                getLatestMemes()
            } else {
                alert("ur all caught up, try some time later.")
                let cachedMemes = sessionStorage.getItem("memes")
                
                if (cachedMemes !== null) {
                    setMemes([...JSON.parse(cachedMemes)])
                } else {
                    getLatestMemes()
                }
            }
        } else {
            setMemes([...state.memePage])
        }
    }, [])

    const getLatestMemes = async () => {
        await fetch("http://localhost:5000/api/get/latest/memes")
            .then(res => res.json())
            .then(data => {
                setMemes(existingMemes => [...existingMemes, ...data])
                
                sessionStorage.setItem("lastReqTime", new Date().getTime().toString())
                
                sessionStorage.setItem("memes", JSON.stringify([...memes, ...data]))
                
                dispatch({ 
                    type: "memePageData", 
                    payload: [...state.memePage, ...data] 
                })
            })
            .catch((_) => {
                alert("error while fetching data, try again later")
            })
    }

    const singleMeme = () => {
        console.log("meme div")
    }

    return (
        <section id="memes-comp">
            { memes.map(meme => {
                return (
                    <div key={meme.mid} onClick={singleMeme}>
                        <Meme url={meme.url} mid={meme.mid} 
                            key={meme.mid}
                        />
                    </div>
                )
            })}
        </section>
    )
}