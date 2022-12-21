import { useState } from 'react';
import MainHeader from './Components/mainHeader/mainHeader';
import MainContent from './Components/mainContent/mainContent';
import MainFilters from './Components/mainFilters/mainFilters';
import MainFilterDualSlider from './Components/mainFilterDualSlider/mainFilterDualSlider';
import MainFilterPosition from './Components/mainFilterPosition/mainFilterPosition';
import MainProducts from './Components/mainProducts/mainProducts';
import MainFooter from './Components/mainFooter/mainFooter';
import { dataProducts } from './data/data';
import { ICard, IProduct } from './types/types';
import './App.scss';

import ContextProducts from './Components/context/contextProducts';
import ContextSorts from './Components/context/contextSort';

function App() {
  const { products } = dataProducts;
  const prices: number[] = products.map(item => item.price);
  const stocks: number[] = products.map(item => item.stock);

  const [minPrice, maxPrice]: number[] = [Math.min(...prices), Math.max(...prices)];
  const [minStock, maxStock]: number[] = [Math.min(...stocks), Math.max(...stocks)];

  const [dataCart, setDataCart] = useState<ICard[]>([]);
  const [dataSort, setDataSort] = useState<IProduct[]>([...products]);

  return (
    <ContextProducts.Provider value={{
      dataCart,
      setDataCart
    }}>
      <ContextSorts.Provider value={{
        dataSort,
        setDataSort
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
      </ContextSorts.Provider>
    </ContextProducts.Provider>
  );
}

export default App;
