import MainHeader from './Components/mainHeader/mainHeader';
import MainContent from './Components/mainContent/mainContent';
import MainFilters from './Components/mainFilters/mainFilters';
import MainFilterCategory from './Components/mainFilterCategory/mainFilterCategory';
import MainFilterBrand from './Components/mainFilterBrand/mainFilterBrand';
import MainFilterDualSlider from './Components/mainFilterDualSlider/mainFilterDualSlider';
import MainProducts from './Components/mainProducts/mainProducts';
import MainFooter from './Components/mainFooter/mainFooter';
import { dataProducts } from './data/data';
import './App.scss';

function App() {
  const {products} = dataProducts;
  const prices:number[] = products.map(item => item.price);
  const stocks:number[] = products.map(item => item.stock);

  const [minPrice, maxPrice]:number[] = [Math.min(...prices),Math.max(...prices)];
  const [minStock, maxStock]:number[] = [Math.min(...stocks),Math.max(...stocks)];

  return (
    <>
      <MainHeader />
      <MainContent>
        <MainFilters>
          <MainFilterCategory />
          <MainFilterBrand />
          <MainFilterDualSlider title={'Price'} 
                                minValue={minPrice}
                                maxValue={maxPrice}/>
          <MainFilterDualSlider title={'Stock'} 
                                minValue={minStock}
                                maxValue={maxStock}/>
        </MainFilters>
        <MainProducts />
      </MainContent>
      <MainFooter/>
    </>
  );
}

export default App;
