import './mainHeader.scss';
import cartImage from './cart.png';
import logoImage from './packet.svg';
import { useContext, useEffect} from 'react';
import ContextCart from '../context/contextCart';
import { ICard } from '../../types/types';
import { Link } from 'react-router-dom';

const MainHeader = () => {
    const {dataCart , setDataCart} = useContext(ContextCart);
    let local: string|null = localStorage.getItem('dataCart');
    if (local !== null && dataCart.length === 0) {
        if(local.length > 2){
            setDataCart(JSON.parse(local));
        }
    }
    const sumCartTotal = dataCart.reduce(
        (accumulator: number, {objProduct}: ICard) => accumulator + objProduct.price,
        0
    );
    useEffect(() => {
        localStorage.setItem('dataCart',JSON.stringify(dataCart));
    },[dataCart])
    return (
        <header className='header'>
            <div className="container">
                    <div className='header__logo'>
                        <Link to='/'><img src={logoImage} alt="packet" /></Link>
                        <Link to='/'><h1>Online Store</h1></Link>
                    </div>
                <div className='header__total-cart'>
                    Cart total: <span>{`$${sumCartTotal}.00`}</span>
                </div>
                <Link to='/basket'>
                    <div className='header__cart'>
                        <img src={cartImage} alt="packet" />
                        <div className='header__cart__count'>{dataCart.length}</div>
                    </div>
                </Link>
            </div>
        </header>
    );
}

export default MainHeader;