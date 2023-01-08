import MainProductsItem from '../mainProductsItem/mainProductsItem';
import { useEffect, useState } from 'react';
import { defaultDataProducts } from '../../data/data';
import './mainProducts.scss';
import bigMenu from './small.svg';
import smallMenu from './big.svg';
import { useContext } from 'react';
import contextProducts from '../context/contextProducts';
import ContextFilter from '../context/contextFilter';
import ContextSlider from '../context/contextSlider';
import ContextSearchPanel from '../context/contextSearchPanel';
import ContextSort from '../context/contextSort';
import { useSearchParams } from 'react-router-dom';
import qs from 'qs';
import { searchProducts, updateBrand, updateCategory, sortProducts, updatePrice, updateStock } from './filteredFunctions';

const MainProducts = () => {
    const { products } = defaultDataProducts;
    const [ widthCard, setWidthCard] = useState(350);
    const { dataProducts, setDataProducts } = useContext(contextProducts);
    const { dataFilter } = useContext(ContextFilter);
    const { dataBrand, dataCategory } = dataFilter;
    const { dataSlider } = useContext(ContextSlider);
    const { setDataSearchPanel } = useContext(ContextSearchPanel);
    const { setDataSort } = useContext(ContextSort);

    const [searchParams, setSearchParams] = useSearchParams();
    const buttonQuery = searchParams.get('button') || '350';
    const postQuery = searchParams.get('post') || '';
    const sortQuery = searchParams.get('sort') || 'price-ASC';
    const categoryQuery = searchParams.get('category')?.split('|') || [];
    const brandQuery = searchParams.get('brand')?.split('|') || [];
    const minPriceQuery = searchParams.get('minPrice') || '10';
    const maxPriceQuery = searchParams.get('maxPrice') || '1749';
    const minStockQuery = searchParams.get('minStock') || '2';
    const maxStockQuery = searchParams.get('maxStock') || '150';

    products.forEach((item, i) => { item.id = i + 1; });
    
    function changeSize(size: number): void {
        setWidthCard(size);
        const queryString = window.location.search.substring(1);
        const queryObj = qs.parse(queryString);
        setSearchParams({
            ...queryObj, button: `${size}`
        });
    }

    function onUpdateSearch(e: React.ChangeEvent<HTMLInputElement>): void {
        const searchValue = (e.target as HTMLInputElement).value;
        setDataSearchPanel(searchValue);
        const queryString = window.location.search.substring(1);
        const queryObj = qs.parse(queryString);
        setSearchParams({
            ...queryObj, post: searchValue
        });
    }

    useEffect(() => {
        const smallButton = document.querySelector('.small') as HTMLElement;
        const bigButton = document.querySelector('.big') as HTMLElement;
        buttonQuery === '210' ? smallButton.className = 'small active' : smallButton.className = 'small';
        buttonQuery === '350' ? bigButton.className = 'big active' : bigButton.className = 'big';
    });

    function onUpdateSort(e: React.ChangeEvent<HTMLSelectElement>) {
        const whatSort: string = e.target.value;
        setDataSort(whatSort);
        const queryString = window.location.search.substring(1);
        const queryObj = qs.parse(queryString);
        setSearchParams({
            ...queryObj, sort: whatSort
        });
    }

    function changeDomStateOfSelectOptions() {
        const selectOptions = document.querySelectorAll('.products__header__select option') as NodeListOf<HTMLOptionElement>;
        selectOptions.forEach(item => {
            item.selected = false;
        })
        selectOptions.forEach(item => {
            if (item.value === sortQuery) {
                item.selected = true
            }
        })
    }

    function changeDomStateOfCategoryOrBrandItems(pos: string, queryPos: string[]): void {
        const categoryLabels = document.querySelectorAll(`.${pos}__item label`) as NodeListOf<HTMLLabelElement>;
        const categoryInputs = document.querySelectorAll(`.${pos}__item input`) as NodeListOf<HTMLInputElement>;

        categoryInputs.forEach(item => {
            item.checked = false;
        })

        queryPos.forEach(query => {
            categoryLabels.forEach(item => {
                if (item.innerHTML === query) {
                    (item.previousElementSibling as HTMLInputElement).checked = true;
                }
            })
        })
    }
    useEffect(() => {
        changeDomStateOfSelectOptions();
    }, [sortQuery]);
    useEffect(() => {
        changeDomStateOfCategoryOrBrandItems('category', categoryQuery);
    }, [categoryQuery]);
    useEffect(() => {
        changeDomStateOfCategoryOrBrandItems('brand', brandQuery);
    }, [brandQuery]);

    const visibleProducts = () => {
        const sliderQuery = {
            minPrice: +minPriceQuery,
            maxPrice: +maxPriceQuery,
            minStock: +minStockQuery,
            maxStock: +maxStockQuery
        }
        return updateStock
            (updatePrice
                (updateCategory
                    (updateBrand
                        (searchProducts
                            (sortProducts(products, sortQuery),
                                postQuery),
                            brandQuery),
                        categoryQuery),
                    sliderQuery),
                sliderQuery);
    }

    useEffect(() => {
        setDataProducts(dataProducts => visibleProducts());
    }, [window.location.search]);

    return (
        <div className="products">
            <div className="products__header">
                <select onChange={onUpdateSort} className='products__header__select' name="sorts" id="sorts-select">
                    <option className='default-select' value="price-ASC">Sort by price ASC</option>
                    <option value="price-DESC">Sort by price DESC</option>
                    <option value="rating-ASC">Sort by rating ASC</option>
                    <option value="rating-DESC">Sort by rating DESC</option>
                    <option value="discount-ASC">Sort by discount ASC</option>
                    <option value="discount-DESC">Sort by discount DESC</option>
                </select>
                <div className="products__header__found">
                    Found: <span>{visibleProducts().length}</span>
                </div>
                <div className='products__header__search'>
                    <input value={postQuery} onChange={onUpdateSearch} placeholder='Search product' type="text" />
                </div>
                <div className="products__header__buttons">
                    <button onClick={() => changeSize(210)} className='small'>
                        <img src={smallMenu} alt="small-menu" />
                    </button>
                    <button onClick={() => changeSize(350)} className="big">
                        <img src={bigMenu} alt="big-menu" />
                    </button>
                </div>
            </div>
            <div className="products__items">
                {visibleProducts().length ?
                    visibleProducts().map(item => (
                        <MainProductsItem key={item.id}
                            objProduct={item}
                            widthCard={+buttonQuery}
                            idCard={item.id} />
                    )) :
                    <div className='not-found'>No products found...	&#9785;</div>
                }
            </div>
        </div>
    );
}

export default MainProducts;