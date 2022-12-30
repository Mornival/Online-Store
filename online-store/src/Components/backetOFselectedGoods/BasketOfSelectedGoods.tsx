import { useContext } from 'react';
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
    let { open } = useContext(DescriptionContext);
    const { dataCart } = useContext(ContextCart);
    const cart: ICart[] = dataCart;
    const selectedProducts: IProduct[] = cart.map(item => item.objProduct);
    return (
        <>
            {!open && selectedProducts &&
                <div className="basket-container">
                    <div className="basket-carts">
                        <div className="basket-carts__top">
                            <h2 className="basket-carts__top__item">Products in Cart</h2>
                            <p className="basket-carts__top__item">ITEMS:</p>
                            <div className="basket-carts__top__item">3</div>
                            <p className="basket-carts__top__item">PAGE:</p>
                            <div className="basket-carts__top__item">&lt;</div>
                            <p className="basket-carts__top__item">1</p>
                            <div className="basket-carts__top__item">&gt;</div>
                        </div>
                        {selectedProducts.map(product => <BasketGood product={product} key={product.id} />)}
                    </div>
                    <div className="summary">
                        <div className="summary__top"><h2>Summary</h2></div>
                        <BasketSummary prods={selectedProducts} />
                    </div>
                </div>}
            {open && <ProductDescription product={selectedProducts[0]} />}
            {!open && modal && <ProductModal />}
        </>
    )
}
export default BasketOfGoods