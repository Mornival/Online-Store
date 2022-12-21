import React, { createContext } from "react";
import { ICard } from "../../types/types";

interface IContextProducts {
    dataCart: ICard[],
    setDataCart: React.Dispatch<React.SetStateAction<ICard[]>>
}

const defaultStateProducts: IContextProducts = {
    dataCart: [],
    setDataCart: ()=>{}
}

const ContextProducts = createContext<IContextProducts>(defaultStateProducts);

export default ContextProducts;