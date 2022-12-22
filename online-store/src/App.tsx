import { useState } from 'react';
import MainHeader from './Components/mainHeader/mainHeader';
import MainContent from './Components/mainContent/mainContent';
import MainFilters from './Components/mainFilters/mainFilters';
import MainFilterDualSlider from './Components/mainFilterDualSlider/mainFilterDualSlider';
import MainFilterPosition from './Components/mainFilterPosition/mainFilterPosition';
import MainProducts from './Components/mainProducts/mainProducts';
import MainFooter from './Components/mainFooter/mainFooter';
import { defaultDataProducts } from './data/data';
import { ICard, IProduct } from './types/types';
import './App.scss';

import ContextCart from './Components/context/contextCart';
import contextProducts from './Components/context/contextProducts';

function App() {
  const { products } = defaultDataProducts;
  const prices: number[] = products.map(item => item.price);
  const stocks: number[] = products.map(item => item.stock);

  const [minPrice, maxPrice]: number[] = [Math.min(...prices), Math.max(...prices)];
  const [minStock, maxStock]: number[] = [Math.min(...stocks), Math.max(...stocks)];

  const [dataCart, setDataCart] = useState<ICard[]>([]);
  const [dataProducts, setDataProducts] = useState<IProduct[]>([...products]);
  const [dataCategory, setDataCategory] = useState<(product:IProduct[])=>IProduct[]>(products=>products);

  return (
    <ContextCart.Provider value={{
      dataCart,
      setDataCart
    }}>
      <contextProducts.Provider value={{
        dataProducts,
        setDataProducts
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
      </contextProducts.Provider>
    </ContextCart.Provider>
  );
}

export default App;
