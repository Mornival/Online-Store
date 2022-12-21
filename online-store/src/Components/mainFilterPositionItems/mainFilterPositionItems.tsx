import './mainFilterPositionItems.scss';
import { IProduct } from '../../types/types';
import {useContext} from 'react';
import ContextSorts from '../context/contextSort';

interface IProps {
    position: string|number|string[],
    products: IProduct[],
    classPosition:string
}

const MainFilterPositionItems = ({position, products,classPosition}:IProps) =>{
    const {dataSort} = useContext(ContextSorts);
    const maxPosition = products.filter(item => item[classPosition as keyof IProduct] === position);
    const sortPosition = dataSort.filter(item => item[classPosition as keyof IProduct] === position);
    const maxPositionLength = maxPosition.length;
    const maxSortPositionLength = sortPosition.length;
    const idCheckbox = Math.random();

    const classInputAndLabel = maxSortPositionLength === 0 ? 'zero' : '';
    
    return (
        <div className={`${classPosition}__item`}>
            <input className={classInputAndLabel} id={`${idCheckbox}`} type="checkbox" />
            <label className={classInputAndLabel} htmlFor={`${idCheckbox}`}>{position}</label>
            <div className={`${classPosition}__item__count ${classInputAndLabel}`}>
                (<span className='count'>{maxSortPositionLength}</span>/<span className='from'>{maxPositionLength}</span>)
            </div>
        </div>
    );
}

export default MainFilterPositionItems;