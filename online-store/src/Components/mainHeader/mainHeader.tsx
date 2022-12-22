import './mainHeader.scss';
import cartImage from './cart.png';
import logoImage from './packet.svg';
import { useContext} from 'react';
import ContextCart from '../context/contextCart';
import { ICard } from '../../types/types';

const MainHeader = () => {
    const {dataCart} = useContext(ContextCart);
    const sumCartTotal = dataCart.reduce(
        (accumulator: number, {objProduct}: ICard) => accumulator + objProduct.price,
        0
    );

    return (
        <header className='header'>
            <div className="container">
                <div className='header__logo'>
                    <a href="#"><img src={logoImage} alt="packet" /></a>
                    <a href="#"><h1>Online Store</h1></a>
                </div>
                <div className='header__total-cart'>
                    Cart total: <span>{`$${sumCartTotal}.00`}</span>
                </div>
                <div className='header__cart'>
                    <img src={cartImage} alt="packet" />
                    <div className='header__cart__count'>{dataCart.length}</div>
                </div>
            </div>
        </header>
    );
}

export default MainHeader;