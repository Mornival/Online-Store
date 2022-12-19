import MainProductsItem from '../mainProductsItem/mainProductsItem';
import {useState} from 'react';
import { dataProducts } from '../../data/data';
import './mainProducts.scss';
import bigMenu from './small.svg';
import smallMenu from './big.svg';

const MainProducts = () => {
    const {products, total} = dataProducts;
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
                    <button className='small'>
                        <img src={smallMenu} alt="small-menu" />
                    </button>
                    <button  className='big'>
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
                                      thumbnail={item.thumbnail}/>
                ))}
            </div>
        </div>
    );
}

export default MainProducts;