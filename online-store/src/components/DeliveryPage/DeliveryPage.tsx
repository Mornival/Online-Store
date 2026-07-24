import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './DeliveryPage.scss';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const deliveryMethods = [
    {
        id: 'courier',
        title: 'Курьером',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M1 3H15V13H1V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M15 8H19L23 12V13H15V8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                <circle cx="5.5" cy="18.5" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="18.5" cy="18.5" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
        ),
        price: 'Бесплатно от 2 000 ₽',
        time: '1-3 дня',
        desc: 'Курьер доставит заказ прямо до двери. Оплата при получении наличными или картой.',
    },
    {
        id: 'pickup',
        title: 'Пункт выдачи',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M3 21V7L12 3L21 7V21H3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M9 21V14H15V21" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                <circle cx="12" cy="10" r="2" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
        ),
        price: 'Бесплатно',
        time: '1-5 дней',
        desc: 'Заберите заказ в ближайшем пункте выдачи. Хранение до 7 дней.',
    },
    {
        id: 'post',
        title: 'Почтой России',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M2 7L12 13L22 7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
        ),
        price: 'от 350 ₽',
        time: '5-14 дней',
        desc: 'Доставка в любой уголок России. Отслеживание по трек-номеру.',
    },
    {
        id: 'express',
        title: 'Экспресс',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
        ),
        price: 'от 490 ₽',
        time: 'В день заказа',
        desc: 'Срочная доставка в течение нескольких часов по Москве и СПб.',
    },
];

const pickupPoints = [
    { name: ' ShopHub Пункт — Тверская', address: 'ул. Тверская, 12', lat: 55.764, lng: 37.606 },
    { name: 'ShopHub Пункт — Арбат', address: 'ул. Арбат, 24', lat: 55.751, lng: 37.593 },
    { name: 'ShopHub Пункт — Пушкинская', address: 'ул. Пушкинская, 15', lat: 55.765, lng: 37.604 },
    { name: 'ShopHub Пункт — Бауманская', address: 'ул. Бауманская, 33', lat: 55.772, lng: 37.679 },
    { name: 'ShopHub Пункт — Марьино', address: 'ул. Люблинская, 72', lat: 55.650, lng: 37.744 },
    { name: 'ShopHub Пункт — Строгино', address: 'ул. Маршала Катукова, 18', lat: 55.804, lng: 37.403 },
    { name: 'ShopHub Пункт — Кузьминки', address: 'Волгоградский пр-т, 109', lat: 55.707, lng: 37.761 },
    { name: 'ShopHub Пункт — Митино', address: 'ул. Митинская, 36', lat: 55.842, lng: 37.363 },
];

const faqItems = [
    { q: 'Как отследить заказ?', a: 'После отправки заказа вы получите SMS и email с трек-номером. Отследить посылку можно на сайте Почты России или в личном кабинете ShopHub.' },
    { q: 'Можно ли изменить адрес доставки?', a: 'Да, вы можете изменить адрес до момента передачи заказа курьеру. Свяжитесь с нашей службой поддержки.' },
    { q: 'Что делать, если заказ повреждён?', a: 'При обнаружении повреждений при получении составьте акт с курьером и обратитесь в службу поддержки — мы заменим товар или вернём деньги.' },
    { q: 'Есть ли доставка в выходные?', a: 'Курьерская доставка работает ежедневно, включая выходные. Пункты выдачи работают по своему графику.' },
];

const DeliveryPage = () => {
    const [activeMethod, setActiveMethod] = useState('courier');
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const moscowCenter: [number, number] = [55.7558, 37.6173];

    return (
        <div className="delivery">
            <div className="container">
                <h1 className="delivery__title">Доставка и оплата</h1>

                <div className="delivery__methods">
                    {deliveryMethods.map(method => (
                        <div
                            key={method.id}
                            className={`delivery__method ${activeMethod === method.id ? 'delivery__method--active' : ''}`}
                            onClick={() => setActiveMethod(method.id)}
                        >
                            <div className="delivery__method-icon">{method.icon}</div>
                            <div className="delivery__method-info">
                                <h3 className="delivery__method-title">{method.title}</h3>
                                <span className="delivery__method-price">{method.price}</span>
                                <span className="delivery__method-time">{method.time}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="delivery__detail">
                    <div className="delivery__detail-text">
                        <h2>{deliveryMethods.find(m => m.id === activeMethod)?.title}</h2>
                        <p>{deliveryMethods.find(m => m.id === activeMethod)?.desc}</p>
                        <div className="delivery__detail-features">
                            <div className="delivery__feature">
                                <span className="delivery__feature-icon">✓</span>
                                <span>Бесплатная доставка от 2 000 ₽</span>
                            </div>
                            <div className="delivery__feature">
                                <span className="delivery__feature-icon">✓</span>
                                <span>Оплата при получении</span>
                            </div>
                            <div className="delivery__feature">
                                <span className="delivery__feature-icon">✓</span>
                                <span>Возврат в течение 14 дней</span>
                            </div>
                        </div>
                    </div>
                    <div className="delivery__detail-map">
                        <MapContainer
                            center={moscowCenter}
                            zoom={10}
                            className="delivery__map"
                            scrollWheelZoom={false}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Circle
                                center={moscowCenter}
                                radius={15000}
                                pathOptions={{
                                    color: '#cb11ab',
                                    fillColor: '#cb11ab',
                                    fillOpacity: 0.08,
                                    weight: 2,
                                    dashArray: '8 4',
                                }}
                            />
                            <Circle
                                center={moscowCenter}
                                radius={5000}
                                pathOptions={{
                                    color: '#cb11ab',
                                    fillColor: '#cb11ab',
                                    fillOpacity: 0.15,
                                    weight: 2,
                                }}
                            />
                            {pickupPoints.map((point, i) => (
                                <Marker key={i} position={[point.lat, point.lng]}>
                                    <Popup>
                                        <strong>{point.name}</strong><br />
                                        {point.address}
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </div>
                </div>

                <div className="delivery__zones">
                    <h2 className="delivery__section-title">Зоны доставки</h2>
                    <div className="delivery__zones-grid">
                        <div className="delivery__zone">
                            <div className="delivery__zone-badge delivery__zone-badge--fast">Москва</div>
                            <p className="delivery__zone-time">1-2 дня</p>
                            <p className="delivery__zone-price">Бесплатно от 2 000 ₽</p>
                        </div>
                        <div className="delivery__zone">
                            <div className="delivery__zone-badge delivery__zone-badge--fast">Московская обл.</div>
                            <p className="delivery__zone-time">2-3 дня</p>
                            <p className="delivery__zone-price">Бесплатно от 2 000 ₽</p>
                        </div>
                        <div className="delivery__zone">
                            <div className="delivery__zone-badge">Центральный ФО</div>
                            <p className="delivery__zone-time">2-5 дней</p>
                            <p className="delivery__zone-price">Бесплатно от 3 000 ₽</p>
                        </div>
                        <div className="delivery__zone">
                            <div className="delivery__zone-badge">Другие регионы</div>
                            <p className="delivery__zone-time">5-14 дней</p>
                            <p className="delivery__zone-price">от 350 ₽</p>
                        </div>
                    </div>
                </div>

                <div className="delivery__payment">
                    <h2 className="delivery__section-title">Способы оплаты</h2>
                    <div className="delivery__payment-grid">
                        <div className="delivery__payment-card">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                                <rect x="1" y="4" width="22" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                                <path d="M1 10H23" stroke="currentColor" strokeWidth="1.5"/>
                            </svg>
                            <span>Банковская карта</span>
                        </div>
                        <div className="delivery__payment-card">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                            <span>Наличными курьеру</span>
                        </div>
                        <div className="delivery__payment-card">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                            </svg>
                            <span>СБП / СберПэй</span>
                        </div>
                        <div className="delivery__payment-card">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                                <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                                <path d="M12 12H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
                            </svg>
                            <span>Рассрочка 0%</span>
                        </div>
                    </div>
                </div>

                <div className="delivery__faq">
                    <h2 className="delivery__section-title">Частые вопросы</h2>
                    <div className="delivery__faq-list">
                        {faqItems.map((item, i) => (
                            <div
                                key={i}
                                className={`delivery__faq-item ${openFaq === i ? 'delivery__faq-item--open' : ''}`}
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            >
                                <div className="delivery__faq-question">
                                    <span>{item.q}</span>
                                    <span className="delivery__faq-arrow">{openFaq === i ? '−' : '+'}</span>
                                </div>
                                <div className="delivery__faq-answer">
                                    <p>{item.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeliveryPage;
