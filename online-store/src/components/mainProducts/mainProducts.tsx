import MainProductsItem from '../mainProductsItem/mainProductsItem';
import { useEffect, useState, useRef, useCallback } from 'react';
import { defaultDataProducts } from '../../data/data';
import './mainProducts.scss';
import { useContext } from 'react';
import CustomDropdown from '../CustomDropdown/CustomDropdown';
import contextProducts from '../context/contextProducts';
import ContextFilter from '../context/contextFilter';
import ContextSlider from '../context/contextSlider';
import ContextSearchPanel from '../context/contextSearchPanel';
import ContextSort from '../context/contextSort';
import { SearchFocusContext } from '../context/OtherContexts';
import { FilterDrawerContext } from '../mainContent/mainContent';
import { useSearchParams } from 'react-router-dom';
import qs from 'qs';
import { searchProducts, updateBrand, updateCategory, sortProducts, updatePrice, updateStock } from './filteredFunctions';

const GridIcon = ({ cols }: { cols: number }) => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        {Array.from({ length: cols }).map((_, i) =>
            Array.from({ length: cols }).map((_, j) => (
                <rect
                    key={`${i}-${j}`}
                    x={1 + i * (16 / cols)}
                    y={1 + j * (16 / cols)}
                    width={14 / cols - 1}
                    height={14 / cols - 1}
                    rx="1.5"
                    fill="currentColor"
                />
            ))
        )}
    </svg>
);

const MainProducts = () => {
    const { products } = defaultDataProducts;
    const [cols, setCols] = useState(4);
    const { dataProducts, setDataProducts } = useContext(contextProducts);
    const { dataFilter } = useContext(ContextFilter);
    const { dataBrand, dataCategory } = dataFilter;
    const { dataSlider } = useContext(ContextSlider);
    const { setDataSearchPanel } = useContext(ContextSearchPanel);
    const { setDataSort } = useContext(ContextSort);
    const { searchTrigger } = useContext(SearchFocusContext);
    const { setOpen: setFiltersOpen } = useContext(FilterDrawerContext);

    const searchInputRef = useRef<HTMLInputElement>(null);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const suggestionsRef = useRef<HTMLDivElement>(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const colsQuery = searchParams.get('cols') || '4';
    const postQuery = searchParams.get('post') || '';
    const sortQuery = searchParams.get('sort') || 'price-ASC';
    const categoryQuery = searchParams.get('category')?.split('|') || [];
    const brandQuery = searchParams.get('brand')?.split('|') || [];
    const minPriceQuery = searchParams.get('minPrice') || '10';
    const maxPriceQuery = searchParams.get('maxPrice') || '1749';
    const minStockQuery = searchParams.get('minStock') || '2';
    const maxStockQuery = searchParams.get('maxStock') || '150';

    products.forEach((item, i) => { item.id = i + 1; });

    function changeSize(newCols: number): void {
        setCols(newCols);
        const queryString = window.location.search.substring(1);
        const queryObj = qs.parse(queryString);
        setSearchParams({
            ...queryObj, cols: `${newCols}`
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

        if (searchValue.trim().length >= 2) {
            const lower = searchValue.toLowerCase();
            const matches = products
                .map(p => p.title)
                .filter((title, i, arr) => arr.indexOf(title) === i)
                .filter(title => title.toLowerCase().includes(lower))
                .slice(0, 6);
            setSuggestions(matches);
            setShowSuggestions(matches.length > 0);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }

    const pickSuggestion = useCallback((title: string) => {
        setDataSearchPanel(title);
        setShowSuggestions(false);
        const queryString = window.location.search.substring(1);
        const queryObj = qs.parse(queryString);
        setSearchParams({ ...queryObj, post: title });
    }, [setDataSearchPanel, setSearchParams]);

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
        if (searchTrigger > 0 && searchInputRef.current) {
            searchInputRef.current.focus();
            searchInputRef.current.select();
        }
    }, [searchTrigger]);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
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
            <div className="products__toolbar">
                <button className="products__filter-btn" onClick={() => setFiltersOpen(true)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <line x1="4" y1="6" x2="20" y2="6"/>
                        <line x1="4" y1="12" x2="16" y2="12"/>
                        <line x1="4" y1="18" x2="12" y2="18"/>
                    </svg>
                    <span>Фильтры</span>
                </button>
                <CustomDropdown
                    options={[
                        { value: 'price-ASC', label: 'Цена ↑' },
                        { value: 'price-DESC', label: 'Цена ↓' },
                        { value: 'rating-ASC', label: 'Рейтинг ↑' },
                        { value: 'rating-DESC', label: 'Рейтинг ↓' },
                        { value: 'discount-ASC', label: 'Скидка ↑' },
                        { value: 'discount-DESC', label: 'Скидка ↓' },
                    ]}
                    value={sortQuery}
                    onChange={(val) => {
                        setDataSort(val);
                        const queryString = window.location.search.substring(1);
                        const queryObj = qs.parse(queryString);
                        setSearchParams({ ...queryObj, sort: val });
                    }}
                />
                <div className="products__header__found">
                    Найдено: <span>{visibleProducts().length}</span>
                </div>
                <div className='products__header__search' ref={suggestionsRef}>
                    <input
                        ref={searchInputRef}
                        value={postQuery}
                        onChange={onUpdateSearch}
                        onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
                        placeholder='Поиск товара...'
                        type="text"
                        autoComplete="off"
                    />
                    {showSuggestions && suggestions.length > 0 && (
                        <div className='products__header__suggestions'>
                            {suggestions.map((title, i) => (
                                <div
                                    key={i}
                                    className='products__header__suggestion'
                                    onMouseDown={() => pickSuggestion(title)}
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, opacity: 0.4 }}>
                                        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
                                        <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                    <span>{title}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="products__header__buttons">
                    <button
                        onClick={() => changeSize(3)}
                        className={`products__header__btn ${colsQuery === '3' ? 'products__header__btn--active' : ''}`}
                        title="3 колонки"
                    >
                        <GridIcon cols={3} />
                    </button>
                    <button
                        onClick={() => changeSize(4)}
                        className={`products__header__btn ${colsQuery === '4' ? 'products__header__btn--active' : ''}`}
                        title="4 колонки"
                    >
                        <GridIcon cols={4} />
                    </button>
                </div>
            </div>
            <div className={`products__items products__items--cols-${colsQuery}`}>
                {visibleProducts().length ?
                    visibleProducts().map(item => (
                        <MainProductsItem key={item.id}
                            objProduct={item}
                            idCard={item.id} />
                    )) :
                    <div className='not-found'>Товары не найдены</div>
                }
            </div>
        </div>
    );
}

export default MainProducts;
