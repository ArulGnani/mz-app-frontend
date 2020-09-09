import React, { useState, useEffect } from 'react'

interface Iprops {
    tid: string;
    url: string;
}

export const Template: React.FC<Iprops> = ({ tid, url }) => {
    const [openTempalte, setOpenTemplate] = useState(false)

    useEffect(() => {
        if (openTempalte === true) updateViewCount()
    }, [openTempalte])

    const updateViewCount = async () => {
        console.log("update view count")
        await fetch(`http://localhost:5000/api/update/tempalte/views/${tid}`, {
            method: "PUT"
        })
            .then(res => res.json())
            .then(data => {
                if (data.updated) return 
                return 
            })
            .catch((_) => { return })
    }

    const updateDownLoadCount = async () => {
        console.log("update download count")
        await fetch(`http://localhost:5000/api/update/tempalte/downloads/${tid}`, {
            method: "PUT"
        })
            .then(res => res.json())
            .then(data => {
                if (data.updated) return 
                return 
            })
            .catch((_) => { return })
    } 

    if (openTempalte) {
        return (
            <div id="meme">
                <div id="inner">
                    <button onClick={() => setOpenTemplate(false)}> 
                        close 
                    </button>
                    <img
                        src={url} alt="templates" 
                        width="300px" height="200px"
                    />
                    <button onClick={() => updateDownLoadCount()}>
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
                src={url} alt="templates" 
                width="300px" height="200px"
                onClick={() => setOpenTemplate(true)}
            />
        </React.Fragment>
    )
}