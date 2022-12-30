import React from 'react'
interface IModalContext {
    modal: boolean,
    setModal?: () => void;
}
interface IDescritionContext {
    open: boolean,
    setDescrition?: () => void;
}
const defaultModal = {
    modal: false
}
const defaultDescription = {
    open: false
}
let ModalContext = React.createContext<IModalContext>(defaultModal);
let DescriptionContext = React.createContext<IDescritionContext>(defaultDescription);
export default ModalContext;
export {defaultModal,DescriptionContext, defaultDescription}