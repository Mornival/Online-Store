import { useContext } from 'react';
import './BasketOfSelectedGoods.scss';
import { IProduct } from '../../types/types';
import ProductModal from '../productModalWindow/ProductModalWindow';
import BasketGood from '../basketGood/BasketGood';
import BasketSummary from '../basketSummary/BasketSummary';
import ModalContext from '../context/OtherContexts';
import ContextCart from '../context/contextCart';
import { Link } from 'react-router-dom';

interface ICart {
    objProduct: IProduct;
}

function BasketOfGoods(): JSX.Element {
    const { modal } = useContext(ModalContext);
    const { dataCart } = useContext(ContextCart);
    const cart: ICart[] = dataCart;
    const selectedProducts: IProduct[] = cart.map(item => item.objProduct);

    // Count quantities
    const quantities: Record<number, number> = {};
    selectedProducts.forEach(p => {
        quantities[p.id] = (quantities[p.id] || 0) + 1;
    });

    // Unique products
    const uniqueProducts: IProduct[] = [];
    const seen = new Set<number>();
    selectedProducts.forEach(p => {
        if (!seen.has(p.id)) {
            seen.add(p.id);
            uniqueProducts.push(p);
        }
    });

    return (
        <>
            {uniqueProducts.length === 0 && (
                <div className="basket-empty">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5">
                        <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                        <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
                    </svg>
                    <h2>Корзина пуста</h2>
                    <p>Добавьте товары из каталога</p>
                    <Link to="/" className="basket-empty__btn">Перейти в каталог</Link>
                </div>
            )}

            {uniqueProducts.length > 0 && (
                <div className="basket">
                    <h1 className="basket__title">Корзина</h1>
                    <div className="basket__layout">
                        <div className="basket__list">
                            {uniqueProducts.map(product => (
                                <BasketGood
                                    key={product.id}
                                    product={product}
                                    quantity={quantities[product.id]}
                                />
                            ))}
                        </div>
                        <BasketSummary products={uniqueProducts} quantities={quantities} />
                    </div>
                </div>
            )}

            {modal && <ProductModal />}
        </>
    );
}

export default BasketOfGoods;
