import './BasketSummary.scss'
import { useContext } from 'react';
import { IProduct } from '../../types/types';
import ModalContext from '../context/OtherContexts';
import contextCart from '../context/contextCart';

interface PropsProds{
    prods: IProduct[];
}
function BasketSummary(props: PropsProds){
    let prodsNumber: number = 0;
    let prodsAmount: number = 0;
    let { setModal } = useContext(ModalContext);
    const { dataCart } = useContext(contextCart);
    prodsNumber = dataCart.length;
    prodsAmount = dataCart.reduce((acum,cur) => acum + cur.objProduct.price,0)
    const clickButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(setModal){
            setModal();
        }
    }
    return(
        <>
        <div className = "summary-body">
            <h2>Products:<span>{prodsNumber}</span></h2>
            <h2>Total:<span>€{prodsAmount}</span></h2>
            <form>
                <input type = "text" placeholder="Enter promo code"/>
                <p>Promo for test: 'RS', 'EPM'</p>
                <button onClick={clickButton} type = "button">BUY NOW</button>
            </form>
        </div>
        </>
    )
}

export default BasketSummary;