import React, { useState, useEffect } from 'react'


interface Iprop {
    url: string;
    mid: string;
}

export const Meme: React.FC<Iprop> = ({ url, mid }) => {
    const [memeUrl, setMemeUrl] = useState("")
    const [memeId, setMemeId] = useState("")

    useEffect(() => {
        setMemeUrl(url)
        setMemeId(mid)
    }, [])

    const download = async () => {
        console.log(memeUrl, memeId)

        // download meme

        await updateDownloadCount()
    }


    return (
        <React.Fragment> 
            <img 
                src={url} alt="meme" key={mid}
                width="300px" height="200px"
            />
            <section>
                <button onClick={download}> 
                    download 
                </button>    
            </section>
        </React.Fragment>
    )
}

const updateDownloadCount = async () => {
    // update-download-count 
}