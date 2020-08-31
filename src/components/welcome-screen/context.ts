import React,{ useReducer } from "react"

export interface ImemePage {
    url: string;
    mid: string;
}

export interface ItemplatePage {
    cid: string;
    categorieName: string;
    end: boolean;
}

export interface IinfoPage {
    pic: string;
    desc: string;
}

export interface IinitState {
    memePage: ImemePage[];
    templatePage: ItemplatePage[];
    infoPage: IinfoPage;
}

const initState: IinitState = {
    memePage: [],
    templatePage: [],
    infoPage: { pic: "", desc: ""}
}



const reducer = (state: IinitState, action: any) => {
    switch(action.type) {
        case "memePageData":
            return {
                ...state,
                memePage: [...action.payload]
            }
        case "templatePageData":
            return {
                ...state,
                templatePage: [...action.payload]
            }
        case "infoPageData": 
            return {
                ...state,
                infoPage: action.payload
            }
        default:
            return state
    }
}

interface Icontext {
    state: IinitState;
    dispatch: any
}

const Context = React.createContext({} as Icontext)

export {
    Context,
    reducer,
    initState
}