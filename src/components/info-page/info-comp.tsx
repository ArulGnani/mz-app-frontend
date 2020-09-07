import React from 'react'
import { Layout } from '../layout/layout'
import pic from '../../asserts/monkey.png'

export const InfoComp: React.FC = () => {
    return (
        <Layout body={
            <React.Fragment>

                <section>
                    <div>
                        <img src={pic} alt="random pic" 
                            width="100px" height="100px"/>
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
                    <button> support </button>
                    <hr />
                    <button> send feedback </button><br/>
                    <button> share this app </button><br/>
                    <button> send ur meme </button>
                </section>


            </React.Fragment>
        }/>
    )
}