import './BasketSummary.scss'
import { useContext , useState} from 'react';
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
    const [coef, setCoef] = useState(1);
    const [addPromoBtn, setAddPromoBtn] = useState(false);
    const [deletePromoBtn, setDeletePromoBtn] = useState(false);
    let promocods: string[] = ['RS','EPM'];
    let findedPromocods: string[] = [];
    let usedPromocods: string[] = [];
    prodsNumber = dataCart.length;
    const findSum = () =>{
        prodsAmount = dataCart.reduce((acum,cur) => acum + cur.objProduct.price * coef,0)
    }
    findSum();
    const checkPromocode = (event: React.FormEvent<HTMLInputElement>) => {
        let currentCode: string = event.currentTarget.value;
        console.log(coef);
        let newCoef: number = 1;
        findedPromocods = [];
        promocods.forEach((v , i , a) => {
            console.log(currentCode.indexOf(v));
            if(currentCode.indexOf(v) >= 0){
                findedPromocods.push(v);
                newCoef -= 0.1;
            }
            if(i === a.length - 1){
                setCoef(newCoef);
                console.log(coef);
                findSum();
            }
        });
        if(findedPromocods.length > 0){
            setAddPromoBtn(true);
        }
        console.log(findedPromocods);
    }
    const addPromo = () =>{
        usedPromocods.push(findedPromocods[0]);
        findedPromocods.unshift();
        if(findedPromocods.length === 0){
            setAddPromoBtn(false);
        }
        setDeletePromoBtn(true);
    }
    const deletePromo = () =>{
        findedPromocods.push(usedPromocods[0]);
        usedPromocods.unshift();
        if(usedPromocods.length === 0){
            setDeletePromoBtn(false);
        }
        setAddPromoBtn(true);
    }
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
            <h2>Total:{coef < 1 && <span className='initial-sum'>€{(prodsAmount/coef).toFixed(2)}</span>}<span>€{prodsAmount.toFixed(2)}</span></h2>
            <form>
                <input type = "text" placeholder="Enter promo code" onInput={(event) => checkPromocode(event)}/>
                <p>Promo for test: 'RS', 'EPM'</p>
                {addPromoBtn && <button onClick={clickButton} type = "button">add promo</button>}
                {deletePromoBtn && <button onClick={clickButton} type = "button">delete promo</button>}
                <button onClick={clickButton} type = "button">BUY NOW</button>
            </form>
        </div>
        </>
    )
}

export default BasketSummary;