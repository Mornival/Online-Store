import React, { useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './BasketOfSelectedGoods.scss'
import { IProduct } from '../../types/types';
import ProductDescription from '../productDescriptionPage/ProductDescriptionPage';
import ProductModal from '../productModalWindow/ProductModalWindow';
import BasketGood from '../basketGood/BasketGood';
import BasketSummary from '../basketSummary/BasketSummary';
import ModalContext, { DescriptionContext } from '../context/OtherContexts';
import ContextCart from '../context/contextCart';
import qs from 'qs';
interface ICart {
    objProduct: IProduct
}

function BasketOfGoods() {
    let { modal } = useContext(ModalContext);
    const { dataCart , setDataCart} = useContext(ContextCart);
    const [searchParams, setSearchParams] = useSearchParams();
    let numberInput: string|null = searchParams.get('input');
    if(numberInput === null){
        numberInput = "";
    }
    // if(dataCart.length !== 0){
    //     localStorage.setItem('dataCart',JSON.stringify(dataCart));
    // }
    // if(dataCart.length === 0){
    //     let local: string|null = localStorage.getItem('dataCart');
    //     if(local !== null){
    //         console.log(JSON.parse(local));
    //         setDataCart(JSON.parse(local));
    //     }
    // }
    let numberPage: string = searchParams.get('page') || '1';
    const cart: ICart[] = dataCart;
    const selectedProducts: IProduct[] = cart.map(item => item.objProduct);
    let numbersOfGoods: { [index: number]: number };
    function uniqueObjByPos() {
        const unique: { [index: number]: number } = {};
        const uniquePos = selectedProducts.filter(item => {
            if (unique[item.id]) {
                unique[item.id] += 1;
                return false;
            }
            unique[item.id] = 1;
            return true;
        });
        numbersOfGoods = unique;
        return uniquePos;
    }
    let cartGoods: IProduct[] = uniqueObjByPos();
    let numberOfGoods: number = cartGoods.length;
    const inputChange = (event: React.FormEvent<HTMLInputElement>) => {
        let numberInInput: string = event.currentTarget.value;
        numberInInput = numberInInput.replace(/\D/g,'');
        let numberResult = (+numberInInput).toString();
        if(numberResult === "0"){
            numberResult = "";
        }
        searchParams.set('input',numberResult);
        pageChange();
        searchParams.set('page',numberPage);
        setSearchParams({ page: numberPage, input: numberResult});
    }
    const pageChangePlus = () => {
        let resultNumber:number = 0;
        if(numberInput === null || +numberInput === 0){
            resultNumber = numberOfGoods;
        } else {
            resultNumber = +numberInput;
        }
        if(+numberPage < Math.ceil(numberOfGoods/resultNumber)){
            numberPage = (+numberPage + 1).toString();
            const queryString = window.location.search.substring(1);
            const queryObj = qs.parse(queryString);
            searchParams.set('page',numberPage);
            setSearchParams({ ...queryObj, page: numberPage});
        }
    }
    const pageChange = () => {
        let resultNumber:number = 0;
        numberInput = searchParams.get('input');
        if(numberInput === null || +numberInput === 0){
            resultNumber = numberOfGoods;
        } else {
            resultNumber = +numberInput;
        }
        while(+numberPage !== 1 && +numberPage > Math.ceil(numberOfGoods/resultNumber)){
            numberPage = Math.ceil(numberOfGoods/resultNumber).toString();
        }
    }
    const pageChangeMinus = () => {
        if(+numberPage > 1){
            numberPage = (+numberPage - 1).toString();
            const queryString = window.location.search.substring(1);
            const queryObj = qs.parse(queryString);
            setSearchParams({ ...queryObj, page: numberPage});
            searchParams.set('page',numberPage);
        }
    }
    const createListOfGoods = () => {
        let numberItems: string = searchParams.get('input') || numberOfGoods.toString();
        return cartGoods.map((product, index) => {
            if(index + +numberItems >= +numberItems * (+numberPage * 1) && index < +numberItems * +numberPage){
                console.log(index);
                return <BasketGood product={product}
                productId={product.id}
                id={index}
                number={numbersOfGoods[product.id]}
                key={index} />
            }
        }
        )
    }
    return (
        <>{!selectedProducts.length && <div className="empty-div"><h2 className="empty-h2">Cart is empty</h2></div>}
            {!!selectedProducts.length &&
                <div className="basket-container">
                    <div className="basket-carts">
                        <div className="basket-carts__top">
                            <h2 className="basket-carts__top__item">Products in Cart</h2>
                            <p className="basket-carts__top__item">ITEMS:</p>
                            <input className="basket-carts__top__item" type="text" value={numberInput} onInput={(event) => inputChange(event)} />
                            <p className="basket-carts__top__item">PAGE:</p>
                            <div className="basket-carts__top__item" onClick={() => pageChangeMinus()}>&lt;</div>
                            <p className="basket-carts__top__item">{numberPage}</p>
                            <div className="basket-carts__top__item" onClick={() => pageChangePlus()}>&gt;</div>
                        </div>
                        {createListOfGoods()}
                    </div>
                    <div className="summary">
                        <div className="summary__top"><h2>Summary</h2></div>
                        <BasketSummary prods={selectedProducts} />
                    </div>
                </div>}
            {!!selectedProducts.length && modal && <ProductModal />}
        </>
    )
}
export default BasketOfGoods