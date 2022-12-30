import React, { useContext , useState} from 'react';
import './BasketOfSelectedGoods.scss'
import { IProduct } from '../../types/types';
import ProductDescription from '../productDescriptionPage/ProductDescriptionPage';
import ProductModal from '../productModalWindow/ProductModalWindow';
import BasketGood from '../basketGood/BasketGood';
import BasketSummary from '../basketSummary/BasketSummary';
import ModalContext, { DescriptionContext } from '../context/OtherContexts';
import ContextCart from '../context/contextCart';
interface ICart {
    objProduct: IProduct
}

function BasketOfGoods() {
    let { modal } = useContext(ModalContext);
    const { dataCart } = useContext(ContextCart);
    const [numberInput, setNumberInput] = useState("3");
    const cart: ICart[] = dataCart;
    const selectedProducts: IProduct[] = cart.map(item => item.objProduct);
    let numbersOfGoods:{[index:number]:number};
    function uniqueObjByPos() {
        const unique:{[index:number]:number} = {};
        const uniquePos = selectedProducts.filter(item => {
            if (unique[item.id]) {
                unique[item.id]+=1;
                return false;
            }
            unique[item.id] = 1;
            return true;
        });
        numbersOfGoods = unique;
        return uniquePos;
    }
    let cartGoods:IProduct[] = uniqueObjByPos();
    let inputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        let numberInInput: string = event.target.value;
        if(+numberInInput || numberInInput.length === 0){
            let k: number = +numberInInput;
            if(k.toString().length === (numberInInput.length) && +k >= 1){
                setNumberInput(k.toString());
            }
            if(k === 0){
                event.target.value = "";
                setNumberInput("");
            }
        }
    }
    const createListOfGoods = () => {
        return cartGoods.map((product, index) => 
        <BasketGood product={product} 
                    productId={product.id}
                    id={index}
                    number={numbersOfGoods[product.id]}
                    key={index}/>
                )
    }
    return (
        <>{!selectedProducts.length && <div className = "empty-div"><h2 className = "empty-h2">Cart is empty</h2></div>}
            {!!selectedProducts.length &&
                <div className="basket-container">
                    <div className="basket-carts">
                        <div className="basket-carts__top">
                            <h2 className="basket-carts__top__item">Products in Cart</h2>
                            <p className="basket-carts__top__item">ITEMS:</p>
                            <input className="basket-carts__top__item" type="number" value={numberInput}  onChange={(event)=>inputChange(event)}/>
                            <p className="basket-carts__top__item">PAGE:</p>
                            <div className="basket-carts__top__item">&lt;</div>
                            <p className="basket-carts__top__item">1</p>
                            <div className="basket-carts__top__item">&gt;</div>
                        </div>
                        {createListOfGoods()}
                    </div>
                    <div className="summary">
                        <div className="summary__top"><h2>Summary</h2></div>
                        <BasketSummary prods={selectedProducts} />
                    </div>
                </div>}
            {!!selectedProducts.length && modal && <ProductModal/>}
        </>
    )
}
export default BasketOfGoods