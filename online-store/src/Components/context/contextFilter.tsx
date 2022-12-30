import React, { createContext } from "react";

interface IDataFilter {
    dataCategory: (string| undefined)[],
    dataBrand: (string| undefined)[],
}

interface IContextFilter {
    dataFilter: {
        dataCategory: (string|undefined)[],
        dataBrand: (string|undefined)[],
    }
    setDataFilter: React.Dispatch<React.SetStateAction<IDataFilter>>
}

export const defaultStateFilter: IContextFilter = {
    dataFilter: {
        dataCategory: [],
        dataBrand: [],
    },
    setDataFilter: ()=>{}
}

const ContextFilter = createContext<IContextFilter>(defaultStateFilter);

export default ContextFilter;