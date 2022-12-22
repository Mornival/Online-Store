import './mainFilterPositionItems.scss';
import { IProduct } from '../../types/types';
import {useContext} from 'react';
import contextProduct from '../context/contextProducts';

interface IProps {
    position: string|number|string[],
    products: IProduct[],
    classPosition:string
}

const MainFilterPositionItems = ({position, products,classPosition}:IProps) =>{
    const {dataProducts} = useContext(contextProduct);

    const maxPosition = products.filter(item => item[classPosition as keyof IProduct] === position);
    const maxPositionLength = maxPosition.length;

    const sortPosition = dataProducts.filter(item => item[classPosition as keyof IProduct] === position);
    const maxSortPositionLength = sortPosition.length;

    const idCheckbox = Math.random();

    const classLabel = maxSortPositionLength === 0 ? 'zero' : '';

    const onFilter = () => {
    }

    function categoryFiltered(products:IProduct[]){
        const allInputs:NodeListOf<HTMLInputElement> = document.querySelectorAll('.category__item input[type=checkbox]');
        const checkedInputs = Array.from(allInputs).filter(item => item.checked) as HTMLInputElement[];
        const checkedInputsValues = checkedInputs.map(item => item.nextElementSibling?.innerHTML);

        const filteredArr: IProduct[] = [];
        for (let filter of checkedInputsValues) {
            products.forEach(item => {
                if (item.category === filter) {
                    filteredArr.push(item);
                }
            })
        }
        return filteredArr;
    }

    return (
        <div className={`${classPosition}__item`}>
            <input onInput={onFilter} className={classLabel} id={`${idCheckbox}`} type="checkbox" />
            <label className={classLabel} htmlFor={`${idCheckbox}`}>{position}</label>
            <div className={`${classPosition}__item__count ${classLabel}`}>
                (<span className='count'>{maxSortPositionLength}</span>/<span className='from'>{maxPositionLength}</span>)
            </div>
        </div>
    );
}

export default MainFilterPositionItems;