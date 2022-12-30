import './ProductDescriptionPage.scss';
import { IProduct } from '../../types/types';
import React, { useState , useContext } from 'react';
import ModalContext,{DescriptionContext} from '../context/OtherContexts';
import { Link , useParams } from 'react-router-dom';
interface PropsDescription{
    products: IProduct[];
}
function ProductDescription(propss: PropsDescription){
    const stringOfId = useParams();
    let id: number = 0;
    let props: IProduct = propss.products[0];
    if(stringOfId.id){
        id = (+stringOfId.id);
    }
    for(let i: number = 0; i < propss.products.length; i++){
        if(id === propss.products[i].id){
            props = propss.products[i];
            break;
        }
    }
    console.log(props);
    // const [image, setImage] = useState(0);
    let {modal, setModal} = useContext(ModalContext);
    let {open, setDescrition} = useContext(DescriptionContext);
    const clickBuy = (e: React.MouseEvent) => {
        e.preventDefault();
        console.log(e);
        if(setModal && !modal){
            setModal();
        }
    }
    return(
    <div className="description-container">
        <div className="description-top">
            <p className="description-top-p"><Link to="/">store</Link></p>
            <p className="description-top-p">&gt;&gt;&gt;</p>
            <p className="description-top-p">{props.category}</p>
            <p className="description-top-p">&gt;&gt;&gt;</p>
            <p className="description-top-p">{props.brand}</p>
            <p className="description-top-p">&gt;&gt;&gt;</p>
            <p className="description-top-p">{props.title}</p>
        </div>
        <h2 className="description-name">{props.title}</h2>
        <div className="description-body">
            <div className="description-images">
                {props.images.map((v,i) => <img className="description-images__image"src={v} key={i}/>)}
            </div>
            <div className ="description-main-image"><img src={props.thumbnail}/></div>
            <div className="description-data">
                <div className="description-data__item">
                    <h2>Description</h2>
                    <p>{props.description}</p>
                </div>
                <div className="description-data__item">
                    <h2>Discount Percentage</h2>
                    <p>{props.discountPercentage}</p>
                </div>
                <div className="description-data__item">
                    <h2>Rating</h2>
                    <p>{props.rating}</p>
                </div>
                <div className="description-data__item">
                    <h2>Stock</h2>
                    <p>{props.stock}</p>
                </div>
                <div className="description-data__item">
                    <h2>Brand</h2>
                    <p>{props.brand}</p>
                </div>
                <div className="description-data__item">
                    <h2>Category</h2>
                    <p>{props.category}</p>
                </div>
            </div>
            <form className="description-buy">
                <h2>€{props.price}</h2>
                <button className="description-button" type="button">DROP FROM CART</button>
                <button className="description-button" type="button"  onClick={clickBuy}><Link to="/basket">BUY NOW</Link></button>
            </form>
        </div>
    </div>
    )
}

export default ProductDescription