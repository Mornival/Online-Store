import React, { createContext} from "react";
import { IProduct } from "../../types/types";
import { dataProducts } from "../../data/data";

const {products} = dataProducts;

interface IContextSorts {
    dataSort: IProduct[],
    setDataSort: React.Dispatch<React.SetStateAction<IProduct[]>>
}

const defaultStateSorts: IContextSorts = {
    dataSort: [],
    setDataSort: ()=>{}
}

const ContextSorts = createContext<IContextSorts>(defaultStateSorts);

export default ContextSorts;