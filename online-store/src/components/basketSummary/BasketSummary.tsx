import './BasketSummary.scss';
import { useState } from 'react';
import { IProduct } from '../../types/types';
import contextCart from '../context/contextCart';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { findSum } from './findSum';
import { checkDiscount } from './checkDiscount';
import { ICard } from '../../types/types';

interface Props {
    products: IProduct[];
    quantities: Record<number, number>;
}

function BasketSummary({ products, quantities }: Props): JSX.Element {
    const navigate = useNavigate();
    const { dataCart } = useContext(contextCart);
    const [coef, setCoef] = useState(1);

    const totalItems = Object.values(quantities).reduce((a, b) => a + b, 0);
    const totalSum = findSum(dataCart, coef);
    const originalSum = coef < 1 ? totalSum / coef : totalSum;

    const [promoCode, setPromoCode] = useState('');
    const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
    const [promoError, setPromoError] = useState('');

    const promos: Record<string, number> = { RS: 0.1, EPM: 0.1 };

    const applyPromo = () => {
        const code = promoCode.trim().toUpperCase();
        if (promos[code] && code !== appliedPromo) {
            setAppliedPromo(code);
            setCoef(checkDiscount([code]));
            setPromoError('');
        } else if (code === appliedPromo) {
            setPromoError('Промокод уже применён');
        } else {
            setPromoError('Промокод не найден');
        }
    };

    const removePromo = () => {
        setAppliedPromo(null);
        setCoef(1);
        setPromoCode('');
        setPromoError('');
    };

    const checkout = (e: React.MouseEvent) => {
        e.preventDefault();
        navigate('/checkout');
    };

    return (
        <div className="summary">
            <h2 className="summary__title">Ваш заказ</h2>

            <div className="summary__rows">
                <div className="summary__row">
                    <span>Товаров</span>
                    <span>{totalItems} шт.</span>
                </div>
                <div className="summary__row">
                    <span>Продуктов</span>
                    <span>{products.length}</span>
                </div>
                {coef < 1 && (
                    <div className="summary__row summary__row--discount">
                        <span>Скидка</span>
                        <span>−{Math.round((1 - coef) * 100)}%</span>
                    </div>
                )}
            </div>

            <div className="summary__promo">
                <div className="summary__promo-input-wrap">
                    <input
                        type="text"
                        placeholder="Промокод"
                        value={promoCode}
                        onChange={(e) => { setPromoCode(e.target.value); setPromoError(''); }}
                        onKeyDown={(e) => e.key === 'Enter' && applyPromo()}
                    />
                    {promoCode && (
                        <button className="summary__promo-clear" onClick={() => { setPromoCode(''); setPromoError(''); }}>×</button>
                    )}
                </div>
                {promoCode && !appliedPromo && (
                    <button className="summary__promo-apply" onClick={applyPromo}>Применить</button>
                )}
                {promoError && <div className="summary__promo-error">{promoError}</div>}
                {appliedPromo && (
                    <div className="summary__promo-applied">
                        <span>{appliedPromo} −{Math.round((promos[appliedPromo] || 0) * 100)}%</span>
                        <button onClick={removePromo}>×</button>
                    </div>
                )}
            </div>

            <div className="summary__total">
                <span>Итого</span>
                <div className="summary__total-prices">
                    {coef < 1 && <span className="summary__total-old">{Math.round(originalSum).toLocaleString('ru-RU')} ₽</span>}
                    <span className="summary__total-new">{Math.round(totalSum).toLocaleString('ru-RU')} ₽</span>
                </div>
            </div>

            <button className="summary__checkout" onClick={checkout}>
                Оформить заказ
            </button>

            <div className="summary__delivery">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                <span>Доставка завтра, бесплатно</span>
            </div>
        </div>
    );
}

export default BasketSummary;
