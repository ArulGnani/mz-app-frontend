import React from 'react'
import { Layout } from '../layout/layout'
import pic from '../../asserts/monkey.png'
import './style/info-page.css'

export const InfoComp: React.FC = () => {
    return (
        <Layout body={

            <section id="info-page">
                <div id="logo-div">
                    <img src={pic} alt="random pic" id="logo"/>
                </div>
                <div>
                    <h3> About </h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, nobis.</p>
                </div>
                <div>
                    <h3> Contact </h3>
                    <ul>
                        <li> Lorem, ipsum. </li> <br/>
                        <li> Lorem, ipsum. </li>
                    </ul>
                </div>
                <div>
                    <button> support </button>
                    <hr />
                    <button> send feedback </button><br/>
                    <button> share this app </button><br/>
                    <button> send ur meme </button>
                </div>
            </section>

        }/>
    )
}
