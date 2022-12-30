import React, { createContext} from "react";
import { IProduct } from "../../types/types";
import { defaultDataProducts } from "../../data/data";

const {products} = defaultDataProducts;

interface IContextProducts {
    dataProducts: IProduct[],
    setDataProducts: React.Dispatch<React.SetStateAction<IProduct[]>>
}

const defaultStateProducts: IContextProducts = {
    dataProducts: products,
    setDataProducts: ()=>{}
}

const contextProducts = createContext<IContextProducts>(defaultStateProducts);

export default contextProducts;