import {dataProducts} from '../../data/data';
import MainFilterPositionItems from '../mainFilterPositionItems/mainFilterPositionItems';
import './mainFilterPosition.scss';
import { IProduct } from '../../types/types';


const MainFilterPosition = ({classPosition}:{classPosition:string}) => {
    const {products} = dataProducts;
    const positionUnique:Set<string|number|string[]> = new Set(products.map(item => item[classPosition as keyof IProduct]));
    const position:(string|number|string[])[] = Array.from(positionUnique);
    const title = classPosition.charAt(0).toUpperCase() + classPosition.slice(1);
    return (
        <div className={classPosition}>
            <h3 className={`${classPosition}__title`}>{title}</h3>
            <hr />
           <div className={`${classPosition}__items`}>
                {position.map((item, i) => {
                    return (
                        <MainFilterPositionItems key={i}
                            position={item}
                            products={products}
                            classPosition={classPosition}/>
                    );
                })}
           </div>
        </div>
    );
}

export default MainFilterPosition;