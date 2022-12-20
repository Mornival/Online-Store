import MainProductsItem from '../mainProductsItem/mainProductsItem';
import {useEffect, useState} from 'react';
import { dataProducts } from '../../data/data';
import './mainProducts.scss';
import bigMenu from './small.svg';
import smallMenu from './big.svg';

const MainProducts = () => {
    const {products, total} = dataProducts;
    const [widthCard, setWidthCard] = useState(350);
    function changeSize(size:number) {
        setWidthCard(size);
    }

    useEffect(()=>{
        const smallButton = document.querySelector('.small') as HTMLElement;
        const bigButton = document.querySelector('.big') as HTMLElement;
        widthCard === 260 ? smallButton.className = 'small active' : smallButton.className = 'small'; 
        widthCard === 350 ? bigButton.className = 'big active' : bigButton.className = 'big'; 
    });

    return (
        <div className="products">
            <div className="products__header">
                <select className='products__header__select' name="sorts" id="sorts-select">
                    <option value="">Sort options: </option>
                    <option value="price-ASC">Sort by price ASC</option>
                    <option value="prise-DESC">Sort by price DESC</option>
                    <option value="rating-ASC">Sort by rating ASC</option>
                    <option value="rating-DESC">Sort by rating DESC</option>
                    <option value="discount-ASC">Sort by discount ASC</option>
                    <option value="discount-DESC">Sort by discount DESC</option>
                </select>
                <div className="products__header__found">
                    Found: <span>{total}</span>
                </div>
                <div className='products__header__search'>
                    <input placeholder='Search product' type="text" />
                </div>
                <div className="products__header__buttons">
                    <button onClick={()=>changeSize(260)} className='small'>
                        <img src={smallMenu} alt="small-menu" />
                    </button>
                    <button onClick={()=>changeSize(350)}  className="big">
                        <img src={bigMenu} alt="big-menu" />
                    </button>
                </div>
            </div>
            <div className="products__items">
                {products.map(item => (
                    <MainProductsItem key={item.id}
                                      title={item.title}
                                      price={item.price}
                                      discountPercentage={item.discountPercentage}
                                      rating={item.rating}
                                      stock={item.stock}
                                      brand={item.brand}
                                      category={item.category}
                                      thumbnail={item.thumbnail}
                                      widthCard={widthCard}/>
                ))}
            </div>
        </div>
    );
}

export default MainProducts;