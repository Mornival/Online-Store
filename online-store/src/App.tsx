import { useState } from 'react';
import MainHeader from './Components/mainHeader/mainHeader';
import MainContent from './Components/mainContent/mainContent';
import MainFilters from './Components/mainFilters/mainFilters';
import MainFilterDualSlider from './Components/mainFilterDualSlider/mainFilterDualSlider';
import MainFilterPosition from './Components/mainFilterPosition/mainFilterPosition';
import MainProducts from './Components/mainProducts/mainProducts';
import MainFooter from './Components/mainFooter/mainFooter';
import { defaultDataProducts } from './data/data';
import { ICard, IProduct, IDataFilter, IDataSlider } from './types/types';
import './App.scss';
import qs from 'qs';

import ContextCart from './Components/context/contextCart';
import contextProducts from './Components/context/contextProducts';
import ContextFilter from './Components/context/contextFilter';
import ContextSlider from './Components/context/contextSlider';
import ContextSearchPanel from './Components/context/contextSearchPanel';
import ContextSort from './Components/context/contextSort';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
const params = qs.parse(window.location.search.substring(1));

function App() {
  const { products } = defaultDataProducts;
  const [dataCart, setDataCart] = useState<ICard[]>([]);
  const [dataProducts, setDataProducts] = useState<IProduct[]>([...products]);
  const [dataFilter, setDataFilter] = useState<IDataFilter>({ dataCategory: [], dataBrand: [] });
  const [dataSlider, setDataSlider] = useState<IDataSlider>({
     minPrice: 10,
        maxPrice: 1749,
        minStock: 2,
        maxStock: 150
  });

  const [dataSearchPanel, setDataSearchPanel] = useState<string>('');
  const [dataSort, setDataSort] = useState<string>('price-ASC');

  const prices: number[] = dataProducts.map(item => item.price);
  const stocks: number[] = dataProducts.map(item => item.stock);

  const [minPrice, maxPrice]: number[] = prices.length ? [Math.min(...prices), Math.max(...prices)] : [0, 0];
  const [minStock, maxStock]: number[] = stocks.length ? [Math.min(...stocks), Math.max(...stocks)] : [0, 0];

  return (
    <ContextCart.Provider value={{ // context cart
      dataCart,
      setDataCart
    }}>
      <contextProducts.Provider value={{ // context filtered goods
        dataProducts,
        setDataProducts
      }}>
        <ContextFilter.Provider value={{ // context filter by category and brand
          dataFilter,
          setDataFilter
        }}>
          <ContextSlider.Provider value={{ // context filter by price and stock
            dataSlider,
            setDataSlider
          }}>
            <ContextSearchPanel.Provider value={{ // context search panel
              dataSearchPanel,
              setDataSearchPanel
            }}>
              <ContextSort.Provider value={{ // context sort bt price, rating, discount
                dataSort,
                setDataSort
              }}>

                <Router>
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
                  <Routes>
                    <Route path='/' element={<MainProducts />}/>
                  </Routes>
                </MainContent>
                <MainFooter />
                </Router>

              </ContextSort.Provider>
            </ContextSearchPanel.Provider>
          </ContextSlider.Provider>
        </ContextFilter.Provider>
      </contextProducts.Provider>
    </ContextCart.Provider>
  );
}

export default App;
