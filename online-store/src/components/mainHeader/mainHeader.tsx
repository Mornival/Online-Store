import './mainHeader.scss';
import { useContext } from 'react';
import ContextCart from '../context/contextCart';
import { FavContext, SearchFocusContext } from '../context/OtherContexts';
import { ICard } from '../../types/types';
import { Link, useLocation } from 'react-router-dom';

const LogoIcon = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="8" fill="rgba(255,255,255,0.15)"/>
        <path d="M8 12L16 6L24 12V22L16 28L8 22V12Z" stroke="white" strokeWidth="1.8" strokeLinejoin="round" fill="none"/>
        <path d="M16 6V16M16 16L24 12M16 16L8 12" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M16 16V28" stroke="white" strokeWidth="1.5"/>
    </svg>
);

const CartIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 6H21" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const HeartIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.84 4.61C19.58 3.35 17.86 2.65 16.06 2.65C14.26 2.65 12.54 3.35 11.28 4.61L12 5.33L12.72 4.61C11.46 3.35 9.74 2.65 7.94 2.65C6.14 2.65 4.42 3.35 3.16 4.61C1.84 5.93 1.12 7.69 1.12 9.55C1.12 11.41 1.84 13.17 3.16 14.49L12 23.33L20.84 14.49C22.16 13.17 22.88 11.41 22.88 9.55C22.88 7.69 22.16 5.93 20.84 4.61Z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const SearchIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="11" cy="11" r="7" stroke="white" strokeWidth="1.8"/>
        <path d="M16.5 16.5L21 21" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
);

const MainHeader = () => {
    const {dataCart} = useContext(ContextCart);
    const { favorites } = useContext(FavContext);
    const { pathname } = useLocation();
    const { triggerSearch } = useContext(SearchFocusContext);

    const sumCartTotal = dataCart.reduce(
        (accumulator: number, {objProduct}: ICard) => accumulator + objProduct.price,
        0
    );

    return (
        <header className='header'>
            <div className="container">
                <div className='header__logo'>
                    <Link to='/' className='header__logo-link'>
                        <LogoIcon />
                        <span className='header__logo-text'>ShopHub</span>
                    </Link>
                </div>

                <nav className='header__nav'>
                    <Link to='/' className={`header__nav-link${pathname === '/' ? ' header__nav-link--active' : ''}`}>Каталог</Link>
                    <Link to='/promotions' className={`header__nav-link${pathname === '/promotions' ? ' header__nav-link--active' : ''}`}>Акции</Link>
                    <Link to='/delivery' className={`header__nav-link${pathname === '/delivery' ? ' header__nav-link--active' : ''}`}>Доставка</Link>
                </nav>

                <div className='header__actions'>
                    <Link to='/' className='header__action' onClick={() => triggerSearch()}>
                        <SearchIcon />
                    </Link>
                    <Link to='/favorites' className={`header__action header__action--fav${pathname === '/favorites' ? ' header__action--active' : ''}`}>
                        <HeartIcon />
                        {favorites.length > 0 && (
                            <span className='header__cart-badge'>{favorites.length}</span>
                        )}
                    </Link>
                    <Link to='/basket' className='header__action header__action--cart'>
                        <CartIcon />
                        {dataCart.length > 0 && (
                            <span className='header__cart-badge'>{dataCart.length}</span>
                        )}
                    </Link>
                    <div className='header__total'>
                        <span className='header__total-label'>Итого</span>
                        <span className='header__total-price'>{sumCartTotal.toLocaleString('ru-RU')} ₽</span>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default MainHeader;
