import {dataProducts} from '../../data/data';
import MainFilterBrandItems from '../mainFilterBrandItems/mainFilterBrandItems';
import './mainFilterBrand.scss';

const MainFilterBrand = () => {
    const {products} = dataProducts;
    const brandUnique:Set<string> = new Set(products.map(item => item.brand));
    const brand:string[] = Array.from(brandUnique);
    return (
        <div className="brand">
            <h3 className="brand__title">Brand</h3>
            <hr />
           <div className="brand__items">
                {brand.map((item, i) => {
                    return (
                        <MainFilterBrandItems key={i}
                            brand={item}
                            index={i} />
                    );
                })}
           </div>
        </div>
    );
}

export default MainFilterBrand;