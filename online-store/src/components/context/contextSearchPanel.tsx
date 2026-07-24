import React, { createContext } from "react";

interface IContextSearchPanel {
    dataSearchPanel: string,
    setDataSearchPanel: React.Dispatch<React.SetStateAction<string>>
}

export const defaultStateSearchPanel: IContextSearchPanel = {
    dataSearchPanel: '',
    setDataSearchPanel: ()=>{}
}

const ContextSearchPanel = createContext<IContextSearchPanel>(defaultStateSearchPanel);

export default ContextSearchPanel;