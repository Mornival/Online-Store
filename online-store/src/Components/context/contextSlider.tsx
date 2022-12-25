import React, { createContext } from "react";

interface IDataSlider {
    minPrice: number,
    maxPrice: number,
    minStock: number,
    maxStock: number
}

interface IContextSlider {
    dataSlider: {
        minPrice: number,
        maxPrice: number,
        minStock: number,
        maxStock: number
    }
    setDataSlider: React.Dispatch<React.SetStateAction<IDataSlider>>
}

const defaultStateSlider: IContextSlider = {
    dataSlider: {
        minPrice: 10,
        maxPrice: 1749,
        minStock: 2,
        maxStock: 150
    },
    setDataSlider: ()=>{}
}

const ContextSlider = createContext<IContextSlider>(defaultStateSlider);

export default ContextSlider;