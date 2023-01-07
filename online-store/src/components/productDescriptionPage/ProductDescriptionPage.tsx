import './ProductDescriptionPage.scss';
import { IProduct } from '../../types/types';
import React, { useState , useContext } from 'react';
import ModalContext,{DescriptionContext} from '../context/OtherContexts';
import { Link , useParams } from 'react-router-dom';
import ContextCart from '../context/contextCart';
interface PropsDescription{
    products: IProduct[];
}
function ProductDescription(propss: PropsDescription){
    const id = useParams();
    let numberId: number = 0;
    let props: IProduct = propss.products[0];
    const [currentImageSrc, setCurrentImageSrc] = useState("");
    const { dataCart ,setDataCart} = useContext(ContextCart);
    let hasProductInCart: boolean = false;
    if(id.id){
         numberId = (+id.id);
    }
    for(let i: number = 0; i < propss.products.length; i++){
        if(numberId === propss.products[i].id){
            props = propss.products[i];
            break;
        }
    }

    dataCart.forEach((v) => {
        if(v.objProduct.id === numberId){
            hasProductInCart = true;
        }
    })
    const [hasInCart, SetHasInCart] = useState(hasProductInCart);
    let {modal, setModal} = useContext(ModalContext);
    let {open, setDescrition} = useContext(DescriptionContext);
    const clickDrop = (e: React.MouseEvent) => {
        const arr = dataCart.filter((v , i) => {
            if(props.id !== dataCart[i].objProduct.id){
                return v;
            }
        });
        SetHasInCart(false);
        setDataCart(arr);
    }
    const clickAdd = () => {
        const arr = [...dataCart];
        arr.push({objProduct: props})
        SetHasInCart(true);
        setDataCart(arr);
    }
    const clickBuy = () => {
        console.log(hasInCart);
        console.log('modal ' + modal);
        if(!hasInCart){
            clickAdd();
        }
        if(setModal && !modal){
            console.log("Ass we c an");
            setModal();
        }
    }
    const clickStore = () => {
        if(setModal && modal){
            setModal();
        }
    }
    const clickImage = (e: React.MouseEvent<HTMLImageElement>) =>{
        setCurrentImageSrc(e.currentTarget.currentSrc);
    }
    return(
    <div className="description-container">
        <div className="description-top">
            <p className="description-top-p"><Link to="/" onClick={clickStore}>store</Link></p>
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
                {props.images.map((v,i) => <img className="description-images__image" src={v} alt="good" key={i} onClick={clickImage}/>)}
            </div>
            <div className ="description-main-image"><img src={currentImageSrc || props.thumbnail}/></div>
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
                {hasInCart && <button className="description-button" type="button" onClick={clickDrop}>DROP FROM CART</button>}
                {!hasInCart && <button className="description-button" type="button" onClick={clickAdd}>ADD TO CART</button>}
                <Link to="/basket"><button className="description-button" type="button"  onClick={clickBuy}>BUY NOW</button></Link>
            </form>
        </div>
    </div>
    )
}

export default ProductDescription