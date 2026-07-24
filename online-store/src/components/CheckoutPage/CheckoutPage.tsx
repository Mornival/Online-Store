import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CheckoutPage.scss';
import ContextCart from '../context/contextCart';
import { ICard } from '../../types/types';
import { findSum } from '../basketSummary/findSum';

function CheckoutPage() {
    const navigate = useNavigate();
    const { dataCart, setDataCart } = useContext(ContextCart);
    const [orderDone, setOrderDone] = useState(false);

    const totalItems = dataCart.length;
    const totalSum = findSum(dataCart, 1);

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCvv, setCardCvv] = useState('');

    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const markTouched = (field: string) => setTouched(prev => ({ ...prev, [field]: true }));

    const formatCard = (val: string) => {
        const digits = val.replace(/\D/g, '').substring(0, 16);
        return digits.replace(/(.{4})/g, '$1 ').trim();
    };

    const formatExpiry = (val: string) => {
        const digits = val.replace(/\D/g, '').substring(0, 4);
        if (digits.length > 2) return digits.substring(0, 2) + ' / ' + digits.substring(2);
        return digits;
    };

    const isValid = name.trim().length > 2 &&
        phone.trim().length >= 6 &&
        email.includes('@') &&
        address.trim().length > 5 &&
        cardNumber.replace(/\s/g, '').length === 16 &&
        cardExpiry.replace(/\D/g, '').length === 4 &&
        cardCvv.length === 3;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isValid) return;
        setOrderDone(true);
        setTimeout(() => {
            localStorage.setItem('dataCart', '[]');
            setDataCart([]);
            navigate('/');
        }, 3000);
    };

    if (dataCart.length === 0 && !orderDone) {
        return (
            <div className="checkout-empty">
                <h2>Корзина пуста</h2>
                <Link to="/">Вернуться в каталог</Link>
            </div>
        );
    }

    if (orderDone) {
        return (
            <div className="checkout-done">
                <div className="checkout-done__icon">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </div>
                <h2>Заказ оформлен!</h2>
                <p>Ваш заказ обрабатывается. Спасибо за покупку!</p>
            </div>
        );
    }

    return (
        <div className="checkout">
            <div className="checkout__title-row">
                <h1 className="checkout__title">Оформление заказа</h1>
                <Link to="/basket" className="checkout__back">← Вернуться в корзину</Link>
            </div>

            <div className="checkout__layout">
                <form className="checkout__form" onSubmit={handleSubmit}>
                    {/* Contact info */}
                    <div className="checkout__section">
                        <h2 className="checkout__section-title">Контактные данные</h2>
                        <div className="checkout__fields">
                            <div className="checkout__field">
                                <label>Имя и фамилия</label>
                                <input
                                    type="text"
                                    placeholder="Иван Иванов"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    onBlur={() => markTouched('name')}
                                />
                                {touched.name && name.trim().length < 3 && <span className="checkout__error">Введите имя</span>}
                            </div>
                            <div className="checkout__field">
                                <label>Телефон</label>
                                <input
                                    type="tel"
                                    placeholder="+7 (999) 123-45-67"
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                    onBlur={() => markTouched('phone')}
                                />
                                {touched.phone && phone.trim().length < 6 && <span className="checkout__error">Введите телефон</span>}
                            </div>
                            <div className="checkout__field">
                                <label>Email</label>
                                <input
                                    type="email"
                                    placeholder="email@example.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    onBlur={() => markTouched('email')}
                                />
                                {touched.email && !email.includes('@') && <span className="checkout__error">Введите корректный email</span>}
                            </div>
                        </div>
                    </div>

                    {/* Delivery */}
                    <div className="checkout__section">
                        <h2 className="checkout__section-title">Доставка</h2>
                        <div className="checkout__fields">
                            <div className="checkout__field">
                                <label>Адрес доставки</label>
                                <input
                                    type="text"
                                    placeholder="Город, улица, дом, квартира"
                                    value={address}
                                    onChange={e => setAddress(e.target.value)}
                                    onBlur={() => markTouched('address')}
                                />
                                {touched.address && address.trim().length < 6 && <span className="checkout__error">Введите адрес</span>}
                            </div>
                        </div>
                        <div className="checkout__delivery-option">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                            <div>
                                <div className="checkout__delivery-title">Курьером завтра</div>
                                <div className="checkout__delivery-sub">Бесплатно</div>
                            </div>
                        </div>
                    </div>

                    {/* Payment */}
                    <div className="checkout__section">
                        <h2 className="checkout__section-title">Оплата</h2>
                        <div className="checkout__card">
                            <div className="checkout__card-visual">
                                <div className="checkout__card-num">{cardNumber || '•••• •••• •••• ••••'}</div>
                                <div className="checkout__card-bottom">
                                    <div>
                                        <div className="checkout__card-label">Держатель</div>
                                        <div className="checkout__card-holder">{name || 'ИМЯ ФАМИЛИЯ'}</div>
                                    </div>
                                    <div>
                                        <div className="checkout__card-label">Срок</div>
                                        <div className="checkout__card-exp">{cardExpiry || 'ММ / ГГ'}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="checkout__fields">
                            <div className="checkout__field">
                                <label>Номер карты</label>
                                <input
                                    type="text"
                                    placeholder="0000 0000 0000 0000"
                                    value={cardNumber}
                                    maxLength={19}
                                    onChange={e => setCardNumber(formatCard(e.target.value))}
                                    onBlur={() => markTouched('card')}
                                />
                                {touched.card && cardNumber.replace(/\s/g, '').length !== 16 && <span className="checkout__error">Введите 16 цифр</span>}
                            </div>
                            <div className="checkout__field-row">
                                <div className="checkout__field">
                                    <label>Срок</label>
                                    <input
                                        type="text"
                                        placeholder="ММ / ГГ"
                                        value={cardExpiry}
                                        maxLength={7}
                                        onChange={e => setCardExpiry(formatExpiry(e.target.value))}
                                        onBlur={() => markTouched('expiry')}
                                    />
                                </div>
                                <div className="checkout__field">
                                    <label>CVV</label>
                                    <input
                                        type="password"
                                        placeholder="•••"
                                        maxLength={3}
                                        value={cardCvv}
                                        onChange={e => setCardCvv(e.target.value.replace(/\D/g, '').substring(0, 3))}
                                        onBlur={() => markTouched('cvv')}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className={`checkout__submit ${isValid ? '' : 'checkout__submit--disabled'}`}>
                        Оплатить {totalSum.toLocaleString('ru-RU')} ₽
                    </button>
                </form>

                {/* Order summary sidebar */}
                <div className="checkout__summary">
                    <h2 className="checkout__summary-title">Ваш заказ</h2>
                    <div className="checkout__summary-items">
                        {(() => {
                            const seen = new Map<number, { product: typeof dataCart[0]['objProduct'], qty: number }>();
                            dataCart.forEach(item => {
                                const p = item.objProduct;
                                if (seen.has(p.id)) seen.get(p.id)!.qty++;
                                else seen.set(p.id, { product: p, qty: 1 });
                            });
                            return Array.from(seen.values()).map(({ product: p, qty }) => (
                                <div key={p.id} className="checkout__summary-item">
                                    <img
                                        src={p.thumbnail}
                                        alt={p.title}
                                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/60x60/e0e0e0/999?text=Нет+фото'; }}
                                    />
                                    <div className="checkout__summary-item-info">
                                        <span className="checkout__summary-item-title">{p.title}</span>
                                        <span className="checkout__summary-item-qty">{qty} шт.</span>
                                    </div>
                                    <span className="checkout__summary-item-price">
                                        {Math.round(p.price * (1 - p.discountPercentage / 100) * qty)} ₽
                                    </span>
                                </div>
                            ));
                        })()}
                    </div>
                    <div className="checkout__summary-total">
                        <span>Итого</span>
                        <span>{totalSum.toLocaleString('ru-RU')} ₽</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutPage;
