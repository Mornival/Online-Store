import {dataProducts} from '../../data/data';
import MainFilterCategoryItems from '../mainFilterCategoryItems/mainFilterCategoryItems';
import './mainFilterCategory.scss';

const MainFilterCategory = () => {
    const {products} = dataProducts;
    const categoryUnique:Set<string> = new Set(products.map(item => item.category));
    const category:string[] = Array.from(categoryUnique);
    return (
        <div className="category">
            <h3 className="category__title">Category</h3>
            <hr />
            <div className='category__items'>
                {category.map((item, i) => {
                    return (
                        <MainFilterCategoryItems key={i}
                            category={item}
                            index={i} />
                    );
                })}
            </div>
        </div>
    );
}

export default MainFilterCategory;