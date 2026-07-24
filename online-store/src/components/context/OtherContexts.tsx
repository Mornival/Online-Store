import React from 'react'
interface IModalContext {
    modal: boolean,
    setModal?: () => void;
}
interface IDescritionContext {
    open: boolean,
    setDescrition?: () => void;
}
interface IFavContext {
    favorites: number[],
    toggleFavorite: (id: number) => void,
}
interface ISearchFocusContext {
    searchTrigger: number,
    triggerSearch: () => void,
}
const defaultModal = {
    modal: false
}
const defaultDescription = {
    open: false
}
const defaultFav: IFavContext = {
    favorites: [],
    toggleFavorite: () => {},
}
const defaultSearchFocus: ISearchFocusContext = {
    searchTrigger: 0,
    triggerSearch: () => {},
}
let ModalContext = React.createContext<IModalContext>(defaultModal);
let DescriptionContext = React.createContext<IDescritionContext>(defaultDescription);
let FavContext = React.createContext<IFavContext>(defaultFav);
let SearchFocusContext = React.createContext<ISearchFocusContext>(defaultSearchFocus);
export default ModalContext;
export {defaultModal, DescriptionContext, defaultDescription, FavContext, defaultFav, SearchFocusContext, defaultSearchFocus}