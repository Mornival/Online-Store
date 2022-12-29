import React, { createContext } from "react";
import { IQuery } from "../../types/types";

interface IContextQuery {
    dataQuery: IQuery,
    setDataQuery: React.Dispatch<React.SetStateAction<IQuery>>
}

export const defaultStateQuery: IContextQuery = {
    dataQuery: {
        querySearchPanel: '',
        querySort: 'price-ASC',
        queryCategory: [],
        queryBrand: [],
        querySlider: {
            minPrice: 0,
            maxPrice: 0,
            minStock: 0,
            maxStock: 0
        }
    },
    setDataQuery: () => { }
}

const ContextQuery = createContext<IContextQuery>(defaultStateQuery);

export default ContextQuery;