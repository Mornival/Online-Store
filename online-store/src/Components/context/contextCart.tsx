import React, { createContext } from "react";
import { ICard } from "../../types/types";

interface IContextCart {
    dataCart: ICard[],
    setDataCart: React.Dispatch<React.SetStateAction<ICard[]>>
}

const defaultStateCart: IContextCart = {
    dataCart: [],
    setDataCart: ()=>{}
}

const ContextCart = createContext<IContextCart>(defaultStateCart);

export default ContextCart;