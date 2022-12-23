import { useState } from 'react';
import MainHeader from './Components/mainHeader/mainHeader';
import MainContent from './Components/mainContent/mainContent';
import MainFilters from './Components/mainFilters/mainFilters';
import MainFilterDualSlider from './Components/mainFilterDualSlider/mainFilterDualSlider';
import MainFilterPosition from './Components/mainFilterPosition/mainFilterPosition';
import MainProducts from './Components/mainProducts/mainProducts';
import MainFooter from './Components/mainFooter/mainFooter';
import { defaultDataProducts } from './data/data';
import { ICard, IProduct, IDataFilter } from './types/types';
import './App.scss';

import ContextCart from './Components/context/contextCart';
import contextProducts from './Components/context/contextProducts';
import ContextFilter from './Components/context/contextFilter';

function App() {
  const { products } = defaultDataProducts;
  const [dataCart, setDataCart] = useState<ICard[]>([]);
  const [dataProducts, setDataProducts] = useState<IProduct[]>([...products]);
  const [dataFilter, setDataFilter] = useState<IDataFilter>({dataCategory:[], dataBrand: []});

  const prices: number[] = dataProducts.map(item => item.price);
  const stocks: number[] = dataProducts.map(item => item.stock);

  const [minPrice, maxPrice]: number[] = prices.length ? [Math.min(...prices), Math.max(...prices)]:[0,0];
  const [minStock, maxStock]: number[] = stocks.length ? [Math.min(...stocks), Math.max(...stocks)]:[0,0];

  return (
    <ContextCart.Provider value={{
      dataCart,
      setDataCart
    }}>
      <contextProducts.Provider value={{
        dataProducts,
        setDataProducts
      }}>
        <ContextFilter.Provider value={{
          dataFilter,
          setDataFilter
        }}>
        <MainHeader />
          <MainContent>
            <MainFilters>
              <MainFilterPosition classPosition={'category'} />
              <MainFilterPosition classPosition={'brand'} />
              <MainFilterDualSlider title={'Price'}
                minValue={minPrice}
                maxValue={maxPrice} />
              <MainFilterDualSlider title={'Stock'}
                minValue={minStock}
                maxValue={maxStock} />
            </MainFilters>
            <MainProducts />
          </MainContent>
          <MainFooter />
        </ContextFilter.Provider>
      </contextProducts.Provider>
    </ContextCart.Provider>
  );
}

export default App;
