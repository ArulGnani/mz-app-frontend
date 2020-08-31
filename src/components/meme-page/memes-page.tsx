import React from 'react'
import { Layout } from '../layout/layout'
import { MemeComp } from './memes-comp'

export const MemesPage: React.FC = () => {
    return (
        <Layout body={
            <MemeComp />
        }/>
    )
}
