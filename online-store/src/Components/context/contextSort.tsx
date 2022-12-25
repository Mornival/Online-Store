import React, { createContext } from "react";

interface IContextSort {
    dataSort: string,
    setDataSort: React.Dispatch<React.SetStateAction<string>>
}

export const defaultStateSort: IContextSort = {
    dataSort: 'price-ASC',
    setDataSort: ()=>{}
}

const ContextSort = createContext<IContextSort>(defaultStateSort);

export default ContextSort;