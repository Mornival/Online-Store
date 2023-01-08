import './ProductDescriptionPage.scss';
import { IProduct } from '../../types/types';
import React, { useState , useContext } from 'react';
import ModalContext from '../context/OtherContexts';
import { Link , useParams , Params} from 'react-router-dom';
import ContextCart from '../context/contextCart';
import { ICard } from '../../types/types';
interface goodDescription{
    products: IProduct[];
}
const dropGood = function(data: ICard[],idGood: number){
    return data.filter((v , i) => {
        if(idGood !== data[i].objProduct.id){
            return v;
        }
    });
}
function ProductDescription(goods: goodDescription){
    const id:Readonly<Params<string>> = useParams();
    let numberId: number = 0;
    let good: IProduct = goods.products[0];
    const [currentImageSrc, setCurrentImageSrc] = useState("");
    const { dataCart ,setDataCart} = useContext(ContextCart);
    let hasProductInCart: boolean = false;
    if(id.id){
         numberId = (+id.id);
    }
    for(let i: number = 0; i < goods.products.length; i++){
        if(numberId === goods.products[i].id){
            good = goods.products[i];
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
    const clickDrop = (e: React.MouseEvent) => {
        const arr: ICard[] = dropGood(dataCart,good.id);
        SetHasInCart(false);
        localStorage.setItem('dataCart',JSON.stringify(arr));
        setDataCart(arr);
    }
    const clickAdd = () => {
        const arr: ICard[] = [...dataCart];
        arr.push({objProduct: good})
        SetHasInCart(true);
        localStorage.setItem('dataCart',JSON.stringify(arr));
        setDataCart(arr);
    }
    const clickBuy = () => {
        if(!hasInCart){
            clickAdd();
        }
        if(setModal && !modal){
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
            <p className="description-top-p">{good.category}</p>
            <p className="description-top-p">&gt;&gt;&gt;</p>
            <p className="description-top-p">{good.brand}</p>
            <p className="description-top-p">&gt;&gt;&gt;</p>
            <p className="description-top-p">{good.title}</p>
        </div>
        <h2 className="description-name">{good.title}</h2>
        <div className="description-body">
            <div className="description-images">
                {good.images.map((v,i) => <img className="description-images__image" src={v} alt="good" key={i} onClick={clickImage}/>)}
            </div>
            <div className ="description-main-image"><img src={currentImageSrc || good.thumbnail}/></div>
            <div className="description-data">
                <div className="description-data__item">
                    <h2>Description</h2>
                    <p>{good.description}</p>
                </div>
                <div className="description-data__item">
                    <h2>Discount Percentage</h2>
                    <p>{good.discountPercentage}</p>
                </div>
                <div className="description-data__item">
                    <h2>Rating</h2>
                    <p>{good.rating}</p>
                </div>
                <div className="description-data__item">
                    <h2>Stock</h2>
                    <p>{good.stock}</p>
                </div>
                <div className="description-data__item">
                    <h2>Brand</h2>
                    <p>{good.brand}</p>
                </div>
                <div className="description-data__item">
                    <h2>Category</h2>
                    <p>{good.category}</p>
                </div>
            </div>
            <form className="description-buy">
                <h2>€{good.price}</h2>
                {hasInCart && <button className="description-button" type="button" onClick={clickDrop}>DROP FROM CART</button>}
                {!hasInCart && <button className="description-button" type="button" onClick={clickAdd}>ADD TO CART</button>}
                <Link to="/basket"><button className="description-button" type="button"  onClick={clickBuy}>BUY NOW</button></Link>
            </form>
        </div>
    </div>
    )
}
export {dropGood};
export default ProductDescription