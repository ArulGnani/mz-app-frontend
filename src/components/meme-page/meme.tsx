import React from 'react'


interface Iprop {
    url: string,
    mid: string
}

export const Meme: React.FC<Iprop> = ({ url, mid }) => {
    return (
        <img 
            src={url} 
            alt="meme"
            key={mid}
            width="300px"
            height="200px"
        />
    )
}