import React, { useState, useEffect, Fragment } from 'react'
import './style/meme.css'

interface Iprop {
    url: string;   
    mid: string;
}

export const Meme: React.FC<Iprop> = ({ url, mid }) => {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (open === true) {
            const updateViewCount = async () => {
                await fetch(`http://localhost:5000/api/update/meme/view/${mid}`, {
                    method: "PUT"                    
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.updated) return 
                        return 
                    })
                    .catch((_) => { return })
            }
            updateViewCount()
        }
    }, [open])

    const updateDownloadCount = async () => {
        await fetch(`http://localhost:5000/api/update/meme/downlaods/${mid}`, {
            method: "PUT"
        })
            .then(res => res.json())
            .then(data => {
                if (data.updated) return 
                return 
            })
            .catch((_) => { return })
    }

    if (open) {
        return (
            <div id="meme">
                <div id="inner">
                    <button onClick={() => setOpen(false)}> 
                        close 
                    </button>
                    <img 
                        src={url} alt="meme" key={mid}
                        id="popImg"
                    />
                    <button onClick={updateDownloadCount}> 
                        <a href={url} target="_self"> 
                            download 
                        </a> 
                    </button>    
                </div>
            </div>
        )
    }

    return (
        <React.Fragment> 
            <img 
                src={url} alt="meme" key={mid}
                width="300px" height="200px"
                onClick={() => setOpen(true)}
            />
        </React.Fragment>
    )
}
