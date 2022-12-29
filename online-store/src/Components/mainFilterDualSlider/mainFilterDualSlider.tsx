import { useState,useEffect, useContext} from 'react';
import { IProduct } from '../../types/types';
import { defaultDataProducts } from '../../data/data';
import ContextSlider from '../context/contextSlider';
import './mainFilterDualSlider.scss';

interface ISlider {
    title: string,
    minValue: number,
    maxValue: number
}

const MainFilterDualSlider = ({ title, minValue, maxValue }: ISlider) => {
    const minGap = 0;
    const { products } = defaultDataProducts;
    const pos:string|number|string[] = title.toLowerCase();
    const [minSlider, setMinSlider] = useState<string|number|string[]>(minValue);
    const [maxSlider, setMaxSlider] = useState<string|number|string[]>(maxValue);
    const [minSliderValue, setMinSliderValue] = useState(1);
    const [maxSliderValue, setMaxSliderValue] = useState(100);
    const {dataSlider,setDataSlider} = useContext(ContextSlider);


    function onUpdateSliderValue(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        e.stopPropagation();
        const classTarget = e.target.className;
        const index: number = +e.target.value;
        const [element]:IProduct[] = createAscArray().filter(item => item.id === index);
        if (classTarget === 'fromSlider'){
            if (maxSliderValue - +e.target.value <= minGap) {
                setMinSliderValue(prev=>maxSliderValue - minGap);
            } else{
                setMinSlider(prev=>element[pos as keyof IProduct]);
                setMinSliderValue(prev=>index);
            }
            if (maxSliderValue === +e.target.value) {
                setMinSlider(prev=>element[pos as keyof IProduct]);
                (e.target.nextElementSibling as HTMLInputElement).style.zIndex = '0';
                (e.target as HTMLInputElement).style.zIndex = '1';
            }
        } else {
            if (+e.target.value - minSliderValue <= minGap) {
                setMaxSliderValue(prev=>minSliderValue + minGap);
            } else {
                setMaxSlider(prev=>element[pos as keyof IProduct]);
                setMaxSliderValue(prev=>index);  
            }
            if (minSliderValue === +e.target.value) {
                setMaxSlider(prev=>element[pos as keyof IProduct]);
                (e.target.previousElementSibling as HTMLInputElement).style.zIndex = '0';
                (e.target as HTMLInputElement).style.zIndex = '1';
            }
        }

    }

    function onUpdateSliderFilters(){
        if (pos === 'price') {
            setDataSlider({
                ...dataSlider,
                minPrice: +minSlider,
                maxPrice: +maxSlider,
            });
        } else {
            setDataSlider({
                ...dataSlider,
                minStock: +minSlider,
                maxStock: +maxSlider,
            });
        }
    }

    function createAscArray() {
        const cloneProducts = [...products];
        const ascArray = cloneProducts.sort((a, b) => {
            const leftEl:string|number|string[] = a[pos as keyof IProduct];
            const rightEl:string|number|string[] = b[pos as keyof IProduct];
            return +leftEl - +rightEl;
        });
        ascArray.forEach((item, i) => { item.id = i + 1; });

        return ascArray;
    }

    
    // function uniqueObjByPos(){
    //     const flags = {};
    //     const uniquePos = products.filter(item => {
    //         if (flags[item[pos as keyof IProduct]]) {
    //             return false;
    //         }
    //         flags[item[pos as keyof IProduct]] = true;
    //         return true;
    //     });
    //     return uniquePos;
    // }

    function fillBetweenInputs(){
        return {
            'background' : `linear-gradient(
                to right, grey ${minSliderValue}%,
                #fff ${minSliderValue}%,
                #fff ${maxSliderValue}%,
                grey ${maxSliderValue}%
            )`
        }
    }

    useEffect(()=>{
        setMinSlider(prev=>minValue);
        setMaxSlider(prev=>maxValue);        
        const minEl = createAscArray().filter(item => item[pos as keyof IProduct] === minValue);
        const maxEl = createAscArray().filter(item => item[pos as keyof IProduct] === maxValue);
        if (minEl.length === 0 || maxEl.length === 0) {
            setMinSliderValue(1);
            setMaxSliderValue(100);
        } else {
            setMinSliderValue(minEl[0].id);
            setMaxSliderValue(maxEl[0].id);
        }
    },[minValue, maxValue]);



    return (
        <div onMouseUp={onUpdateSliderFilters} className='slider'> 
            <h3 className="slider__title">{title}</h3>
            <hr />
            {minSlider === 0 || maxSlider === 0?
                <div className='not-found'>
                    Not found... &#9785;
                </div> :
                <div className="slider__items"
                     style={{'justifyContent': minSlider===maxSlider ? 'center' : 'space-between'}}>
                    <div className={`slider__items__from`}
                         style={{'display': minSlider===maxSlider ? 'none' : 'block'}}
                         >{pos==='price'?`$${minSlider}.00`:minSlider}</div>
                    <div style={{'display': minSlider===maxSlider ? 'none' : 'block'}} >&harr;</div>
                    <div className={`slider__items__to`}>{pos==='price'?`$${maxSlider}.00`:maxSlider}</div>
                </div>
            }
            <div style={fillBetweenInputs()} className={`slider__controls ${pos}`}>
                <input value={minSliderValue}
                       onChange={onUpdateSliderValue}
                       className="fromSlider" 
                       name='from' type="range" 
                       min={1} max={100} />
                <input value={maxSliderValue} 
                       onChange={onUpdateSliderValue} 
                       className="toSlider" 
                       name='to' type="range" 
                       min={1} max={100} />
            </div>
        </div>
    );
}

export default MainFilterDualSlider;