import { useState,useEffect } from 'react';
import { IProduct } from '../../types/types';
import { defaultDataProducts } from '../../data/data';
import './mainFilterDualSlider.scss';

interface ISlider {
    title: string,
    minValue: number,
    maxValue: number
}

const MainFilterDualSlider = ({ title, minValue, maxValue }: ISlider) => {
    const { products } = defaultDataProducts;
    const [minSlider, setMinSlider] = useState(minValue);
    let minValueChange = title === 'Price' ? `$${minValue}.00` : minValue;
    let maxValueChange = title === 'Price' ? `$${maxValue}.00` : maxValue;

    const sliderFromInputs = document.querySelectorAll('.fromSlider') as NodeListOf<HTMLInputElement>;
    const sliderToInputs = document.querySelectorAll('.toSlider') as NodeListOf<HTMLInputElement>;
    sliderFromInputs.forEach(item => { item.value = '0'; })
    sliderToInputs.forEach(item => { item.value = '100'; })

    function onUpdateSlider(e: React.ChangeEvent<HTMLInputElement>) {
        const index: number = +e.target.value;
        const [element] = createAscArray().filter(item => item.id === index);
    }

    function createAscArray() {
        const priceAscArray = products.sort((a, b) => a.price - b.price);
        priceAscArray.forEach((item, i) => { item.id = i + 1; });
        return priceAscArray;
    }
  


    return (
        <div className='slider'>
            <h3 className="slider__title">{title}</h3>
            <hr />
            {maxValueChange === 0 || maxValueChange === '$0.00' ?
                <div className='not-found'>
                    Not found... &#9785;
                </div> :
                <div className="slider__items">
                    <div className="slider__items__from">{minValueChange}</div>
                    <div>&harr;</div>
                    <div className="slider__items__to">{maxValueChange}</div>
                </div>
            }
            <div className={`slider__controls ${title}`}>
                <input onChange={onUpdateSlider} className="fromSlider" name='from' type="range" min={1} max={100} />
                <input className="toSlider" name='to' type="range" min={1} max={100} />
            </div>
        </div>
    );
}

export default MainFilterDualSlider;