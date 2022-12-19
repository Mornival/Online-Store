import './mainHeader.scss';
import cartImage from './cart.png';
import logoImage from './packet.svg';

const MainHeader = () => {
    return (
        <header className='header'>
            <div className="container">
                <div className='header__logo'>
                    <a href="#"><img src={logoImage} alt="packet" /></a>
                    <a href="#"><h1>Online-Store</h1></a>
                </div>
                <div className='header__total-cart'>
                    Cart total: <span>$0</span>
                </div>
                <div className='header__cart'>
                    <img src={cartImage} alt="packet" />
                    <div className='header__cart__count'>0</div>
                </div>
            </div>
        </header>
    );
}

export default MainHeader;