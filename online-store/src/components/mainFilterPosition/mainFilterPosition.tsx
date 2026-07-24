import {useContext} from 'react';
import {defaultDataProducts} from '../../data/data';
import MainFilterPositionItems from '../mainFilterPositionItems/mainFilterPositionItems';
import './mainFilterPosition.scss';
import { IProduct } from '../../types/types';
import ContextFilter from '../context/contextFilter';
import { useSearchParams } from 'react-router-dom';
import qs from 'qs';


const MainFilterPosition = ({classPosition}:{classPosition:string}) => {
    const {products} = defaultDataProducts;
    const [searchParams, setSearchParams] = useSearchParams();
    const {dataFilter, setDataFilter} = useContext(ContextFilter);

    const positionUnique:Set<string|number|string[]> = new Set(products.map(item => item[classPosition as keyof IProduct]));
    const position:(string|number|string[])[] = Array.from(positionUnique);
    const title = classPosition.charAt(0).toUpperCase() + classPosition.slice(1);

    function onUpdateFilterCategory(){
        const allInputsCategory:NodeListOf<HTMLInputElement> = document.querySelectorAll('.category__item input[type=checkbox]');
        const checkedInputsCategory = Array.from(allInputsCategory).filter(item => item.checked) as HTMLInputElement[];
        const checkedInputsCategoryValues:(string|undefined)[] = checkedInputsCategory.map(item => item.nextElementSibling?.innerHTML);
        setDataFilter({
            ...dataFilter,
            dataCategory: [...checkedInputsCategoryValues]
        });
        const queryString = window.location.search.substring(1);
        const queryObj = qs.parse(queryString);
        setSearchParams({
            ...queryObj, category: [...checkedInputsCategoryValues].join('|') 
        });
    }

    function onUpdateFilterBrand(){
        const allInputsBrand:NodeListOf<HTMLInputElement> = document.querySelectorAll('.brand__item input[type=checkbox]');
        const checkedInputsBrand = Array.from(allInputsBrand).filter(item => item.checked) as HTMLInputElement[];
        const checkedInputsBrandValues:(string|undefined)[] = checkedInputsBrand.map(item => item.nextElementSibling?.innerHTML);
        setDataFilter({
            ...dataFilter,
            dataBrand: [...checkedInputsBrandValues]
        });
        const queryString = window.location.search.substring(1);
        const queryObj = qs.parse(queryString);
        setSearchParams({
            ...queryObj, brand: [...checkedInputsBrandValues].join('|') 
        });
    }

    return (
        <div className={classPosition}>
            <h3 className={`${classPosition}__title`}>{title}</h3>
            <hr />
           <div className={`${classPosition}__items`}>
                {position.map((item, i) => {
                    return (
                        <MainFilterPositionItems key={i}
                            position={item}
                            products={products}
                            classPosition={classPosition}
                            onUpdateFilterCategory={onUpdateFilterCategory}
                            onUpdateFilterBrand={onUpdateFilterBrand}/>
                    );
                })}
           </div>
        </div>
    );
}

export default MainFilterPosition;