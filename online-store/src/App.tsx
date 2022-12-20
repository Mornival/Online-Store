import MainHeader from './Components/mainHeader/mainHeader';
import MainContent from './Components/mainContent/mainContent';
import MainFilters from './Components/mainFilters/mainFilters';
import MainFilterCategory from './Components/mainFilterCategory/mainFilterCategory';
import MainFilterBrand from './Components/mainFilterBrand/mainFilterBrand';
import MainProducts from './Components/mainProducts/mainProducts';
import MainFooter from './Components/mainFooter/mainFooter';
import './App.scss';

function App() {
  return (
    <>
      <MainHeader />
      <MainContent>
        <MainFilters>
          <MainFilterCategory />
          <MainFilterBrand />
        </MainFilters>
        <MainProducts />
      </MainContent>
      <MainFooter/>
    </>
  );
}

export default App;
