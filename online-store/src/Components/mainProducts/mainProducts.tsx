import MainProductsItem from '../mainProductsItem/mainProductsItem';
import { useEffect, useState } from 'react';
import { defaultDataProducts } from '../../data/data';
import { IProduct, IDataSlider } from '../../types/types';
import './mainProducts.scss';
import bigMenu from './small.svg';
import smallMenu from './big.svg';
import { useContext } from 'react';
import contextProducts from '../context/contextProducts';
import ContextFilter from '../context/contextFilter';
import ContextSlider from '../context/contextSlider';
import ContextSearchPanel from '../context/contextSearchPanel';
import ContextSort from '../context/contextSort';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

const MainProducts = () => {
    const { products } = defaultDataProducts;
    const [widthCard, setWidthCard] = useState(350);
    const { setDataProducts } = useContext(contextProducts);
    const { dataFilter, setDataFilter } = useContext(ContextFilter);
    const { dataBrand, dataCategory } = dataFilter;
    const { dataSlider } = useContext(ContextSlider);
    const { dataSearchPanel, setDataSearchPanel } = useContext(ContextSearchPanel);
    const { dataSort, setDataSort } = useContext(ContextSort);

    const navigate = useNavigate();
    useEffect(()=>{
        if(window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const {dataSort:string} = params;
            setDataSort(dataSort);
            console.log(params);
        }
    },[]);

    useEffect(() => {
        const queryString = qs.stringify({
            dataBrand,
            dataCategory,
            dataSort,
            dataSearchPanel,
            dataSlider
        })
        navigate(`?${queryString}`);
    }, [dataBrand, dataCategory, dataSort, dataSearchPanel, dataSlider])

    function changeSize(size: number): void {
        setWidthCard(size);
    }

    function searchProducts(products: IProduct[], searchData: string): IProduct[] {
        if (searchData.length === 0) {
            return products;
        }

        return products.filter(item => {
            return item.category.toLowerCase().indexOf(searchData.toLowerCase()) > -1 ||
                item.brand.toLowerCase().indexOf(searchData.toLowerCase()) > -1 ||
                item.title.toLowerCase().indexOf(searchData.toLowerCase()) > -1 ||
                item.price.toString().indexOf(searchData) > -1 ||
                item.stock.toString().indexOf(searchData) > -1 ||
                item.rating.toString().indexOf(searchData) > -1 ||
                item.discountPercentage.toString().indexOf(searchData) > -1
        })
    }

    function onUpdateSearch(e: React.ChangeEvent<HTMLInputElement>): void {
        const searchValue = (e.target as HTMLInputElement).value;
        setDataSearchPanel(searchValue);
    }

    function updateCategory(products: IProduct[], checkedInputs: (string | undefined)[]): IProduct[] {
        if (checkedInputs.length === 0) {
            return products;
        }
        const filteredArr: IProduct[] = [];
        for (let filter of checkedInputs) {
            products.forEach(item => {
                if (item.category === filter) {
                    filteredArr.push(item);
                }
            })
        }
        return filteredArr;
    }
    function updateBrand(products: IProduct[], checkedInputs: (string | undefined)[]): IProduct[] {
        if (checkedInputs.length === 0) {
            return products;
        }
        const filteredArr: IProduct[] = [];
        for (let filter of checkedInputs) {
            products.forEach(item => {
                if (item.brand === filter) {
                    filteredArr.push(item);
                }
            })
        }
        return filteredArr;
    }

    function updatePrice(products: IProduct[], state: IDataSlider): IProduct[] {
        const { minPrice, maxPrice } = state;
        return products.filter(item => item.price >= minPrice && item.price <= maxPrice)
    }
    function updateStock(products: IProduct[], state: IDataSlider): IProduct[] {
        const { minStock, maxStock } = state;
        return products.filter(item => item.stock >= minStock && item.stock <= maxStock)
    }

    useEffect(() => {
        const smallButton = document.querySelector('.small') as HTMLElement;
        const bigButton = document.querySelector('.big') as HTMLElement;
        widthCard === 210 ? smallButton.className = 'small active' : smallButton.className = 'small';
        widthCard === 350 ? bigButton.className = 'big active' : bigButton.className = 'big';
    });

    function onUpdateSort(e: React.ChangeEvent<HTMLSelectElement>) {
        const whatSort: string = e.target.value;
        setDataSort(whatSort);
    }

    function sortProducts(products: IProduct[], kindOfSort: string): IProduct[] {
        const res = [...products];
        switch (kindOfSort) {
            case 'price-ASC':
                return res.sort((a, b) => a.price - b.price);
            case 'prise-DESC':
                return res.sort((a, b) => b.price - a.price);
            case 'rating-ASC':
                return res.sort((a, b) => a.rating - b.rating);
            case 'rating-DESC':
                return res.sort((a, b) => b.rating - a.rating);
            case 'discount-ASC':
                return res.sort((a, b) => a.discountPercentage - b.discountPercentage);
            case 'discount-DESC':
                return res.sort((a, b) => b.discountPercentage - a.discountPercentage);
            default:
                return res;
        }
    }

    const visibleProducts = () => {
        return updateStock(updatePrice(updateCategory(updateBrand(searchProducts(sortProducts(products, dataSort), dataSearchPanel), dataBrand), dataCategory), dataSlider), dataSlider);
    }

    useEffect(() => {
        setDataProducts(dataProducts => visibleProducts());
    }, [dataSearchPanel, dataFilter, dataSlider]);

    return (
        <div className="products">
            <div className="products__header">
                <select onChange={onUpdateSort} className='products__header__select' name="sorts" id="sorts-select">
                    <option className='default-select' value="price-ASC">Sort by price ASC</option>
                    <option value="prise-DESC">Sort by price DESC</option>
                    <option value="rating-ASC">Sort by rating ASC</option>
                    <option value="rating-DESC">Sort by rating DESC</option>
                    <option value="discount-ASC">Sort by discount ASC</option>
                    <option value="discount-DESC">Sort by discount DESC</option>
                </select>
                <div className="products__header__found">
                    Found: <span>{visibleProducts().length}</span>
                </div>
                <div className='products__header__search'>
                    <input onChange={onUpdateSearch} placeholder='Search product' type="text" />
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
                            widthCard={widthCard} />
                    )) :
                    <div className='not-found'>No products found...	&#9785;</div>
                }
            </div>
        </div>
    );
}

export default MainProducts;