import './ProductDescriptionPage.scss';
import { IProduct } from '../../types/types';
import React, { useState , useContext} from 'react';
import ModalContext,{DescriptionContext} from '../context/OtherContexts';
interface PropsDescription{
    product: IProduct;
}
function ProductDescription(props: PropsDescription){
    const [image, setImage] = useState(0);
    let {modal, setModal} = useContext(ModalContext);
    let {open, setDescrition} = useContext(DescriptionContext);
    const clickBuy = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log(e);
        if(open && setDescrition && setModal){
            setDescrition();
            setModal();
        }
    }
    const clickImage = (e: React.MouseEvent<HTMLImageElement>) => {
        e.preventDefault();
        console.log(e);
        if(open && setDescrition && setModal){
            setDescrition();
            setModal();
        }
    }
    return(
    <div className="description-container">
        <div className="description-top">
            <p className="description-top-p">store</p>
            <p className="description-top-p">&gt;&gt;&gt;</p>
            <p className="description-top-p">{props.product.category}</p>
            <p className="description-top-p">&gt;&gt;&gt;</p>
            <p className="description-top-p">{props.product.brand}</p>
            <p className="description-top-p">&gt;&gt;&gt;</p>
            <p className="description-top-p">{props.product.title}</p>
        </div>
        <h2 className="description-name">{props.product.title}</h2>
        <div className="description-body">
            <div className="description-images">
                {props.product.images.map((v,i) => <img className="description-images__image"src={v} key={i}/>)}
            </div>
            <div className ="description-main-image"><img src={props.product.images[image]}/></div>
            <div className="description-data">
                <div className="description-data__item">
                    <h2>Description</h2>
                    <p>{props.product.description}</p>
                </div>
                <div className="description-data__item">
                    <h2>Discount Percentage</h2>
                    <p>{props.product.discountPercentage}</p>
                </div>
                <div className="description-data__item">
                    <h2>Rating</h2>
                    <p>{props.product.rating}</p>
                </div>
                <div className="description-data__item">
                    <h2>Stock</h2>
                    <p>{props.product.stock}</p>
                </div>
                <div className="description-data__item">
                    <h2>Brand</h2>
                    <p>{props.product.brand}</p>
                </div>
                <div className="description-data__item">
                    <h2>Category</h2>
                    <p>{props.product.category}</p>
                </div>
            </div>
            <form className="description-buy">
                <h2>€{props.product.price}</h2>
                <button className="description-button" type="button">DROP FROM CART</button>
                <button className="description-button" type="button" onClick={clickBuy}>BUY NOW</button>
            </form>
        </div>
    </div>
    )
}

export default ProductDescription