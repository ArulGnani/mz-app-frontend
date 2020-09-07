import React from 'react'
import { Layout } from '../layout/layout'
import { MainCategories } from './main-categories'

export const TemplatesPage: React.FC = () => {
    return (
        <Layout body= {
            <MainCategories />
        }/>
    )
}