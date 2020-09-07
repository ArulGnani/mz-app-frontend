import React, { 
    useEffect, useState, useReducer, 
    useRef, useCallback 
} from 'react'
import './style/meme-comp.css'
import { reducer, initState, ImemePage } from '../welcome-screen/context'
import { Meme } from './meme'


export const MemeComp: React.FC = () => {
    const [state, dispatch] = useReducer(reducer, initState)
    const [memes, setMemes] = useState<ImemePage[]>([])
    const [loading, setLoading] = useState(false)
    const end = useRef(false)
    
    const observer = useRef<IntersectionObserver>()
    const lastRef = useCallback(node => {

        if (observer.current) observer.current.disconnect()
        
        observer.current = new IntersectionObserver(e => {

            if (e[0].isIntersecting && end.current === false) {
                console.log('get memes', end)
                getMemes()
            }

        },{ threshold: 1 })

        if (node) observer.current.observe(node)

    }, [])

    const getMemes = async () => {
        setLoading(true)

        let lid = sessionStorage.getItem("lid") ? sessionStorage.getItem("lid") : null
        let nxt = lid === null ? memes.length + 1 : parseInt(lid)

        console.log(nxt)
        await fetch(`http://localhost:5000/api/get/memes/${nxt}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setLoading(false)

                if (data.length === 0) {
                    end.current = true
                    alert("ur all caught up, try again later for new memes")
                }

                setMemes(existingMemes => [...existingMemes, ...data])

                sessionStorage.setItem("lid", nxt + data.length)
            })
            .catch((_) => alert("error while fetching data."))
    }


    useEffect(() => {
        if (window.performance.navigation.type === 1 || 
            window.performance.navigation.type === 0) {
            
            let lastReqTime = sessionStorage.getItem("lastReqTime")
            
            let nextReqTime = lastReqTime ? parseInt(lastReqTime) + 10 * 60000 : 0

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

    useEffect(() => {
        sessionStorage.setItem("memes", JSON.stringify([...memes]))
    }, [memes])

    const getLatestMemes = async () => {
        await fetch("http://localhost:5000/api/get/latest/memes")
            .then(res => res.json())
            .then(data => {
                setMemes(existingMemes => [...existingMemes, ...data])
                
                sessionStorage.setItem("lastReqTime", new Date().getTime().toString())
                sessionStorage.setItem("lid", data.length)
                
                dispatch({ 
                    type: "memePageData", 
                    payload: [...state.memePage, ...data] 
                })
            })
            .catch((_) => {
                alert("error while fetching data, try again later")
            })
    }


    return (
        <section id="memes-comp">
            { memes.map((meme, idx) => {
                return (
                    <div ref={idx + 1 === memes.length ? lastRef : null} 
                        key={meme.mid}>
                        <Meme url={meme.url} mid={meme.mid} 
                            key={meme.mid}
                        />
                    </div>
                ) 
            })}
            { loading ? <div id="loading"> loading... </div> : null }
        </section>
    )
}