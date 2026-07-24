import './mainFilterPositionItems.scss';
import { IProduct } from '../../types/types';
import {useContext} from 'react';
import contextProduct from '../context/contextProducts';

interface IProps {
    position: string|number|string[],
    products: IProduct[],
    classPosition:string,
    onUpdateFilterCategory:()=>void
    onUpdateFilterBrand:()=>void
}

const MainFilterPositionItems = ({position, products,classPosition,onUpdateFilterCategory,onUpdateFilterBrand}:IProps) =>{
    const {dataProducts} = useContext(contextProduct);

    const maxPosition = products.filter(item => item[classPosition as keyof IProduct] === position);
    const maxPositionLength = maxPosition.length;

    const sortPosition = dataProducts.filter(item => item[classPosition as keyof IProduct] === position);
    const maxSortPositionLength = sortPosition.length;

    const idCheckbox = Math.random();

    const classLabel = maxSortPositionLength === 0 ? 'zero' : '';

    const onFilterCategory = () => {
      onUpdateFilterCategory();
    }
    const onFilterBrand = () => {
      onUpdateFilterBrand();
    }

    return (
        <div className={`${classPosition}__item`}>
            <input onInput={classPosition==='category'?onFilterCategory:onFilterBrand} className={classLabel} id={`${idCheckbox}`} type="checkbox" />
            <label className={classLabel} htmlFor={`${idCheckbox}`}>{position}</label>
            <div className={`${classPosition}__item__count ${classLabel}`}>
                (<span className='count'>{maxSortPositionLength}</span>/<span className='from'>{maxPositionLength}</span>)
            </div>
        </div>
    );
}

export default MainFilterPositionItems;