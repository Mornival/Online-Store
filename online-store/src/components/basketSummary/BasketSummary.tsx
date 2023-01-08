import './BasketSummary.scss'
import { useContext , useState} from 'react';
import { ICard, IProduct } from '../../types/types';
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
    let promocods: string[] = ['RS','EPM'];
    const [findedPromocods, setFindedPromocods] = useState<string[]>([]);
    const [usedPromocods, setUsedPromocods] = useState<string[]>([]);
    prodsNumber = dataCart.length;
    const findSum = (data: ICard[]) =>{
        prodsAmount = data.reduce((acum,cur) => acum + cur.objProduct.price * coef,0)
    }
    findSum(dataCart);
    const checkPromocode = (event: React.FormEvent<HTMLInputElement>) => {
        let currentCode: string = event.currentTarget.value;
        let arr: string[] = [...findedPromocods];
        let arrb: string[] = [...usedPromocods];
        promocods.forEach((v) => {
            if(currentCode.indexOf(v) >= 0 && !arr.includes(v) && !arrb.includes(v)){
                arr.push(v);
            } else if(currentCode.indexOf(v) === -1 && arr.includes(v)){
                arr = arr.filter((vv) => {
                    if(vv === v){
                        return false
                    } else {
                        return true;
                    }
                });
            }
        });
        arr = arr.filter((v) => {
            if(arr.includes(v) && arrb.includes(v)){
                return false;
            } else {
                return true;
            }
        })
        if(arr.length != findedPromocods.length){
            setFindedPromocods(arr);
        }
    }
    const addPromo = () => {
        let arrUsed: string[] = [...usedPromocods];
        let arrFinded: string[] = [...findedPromocods];
        arrUsed.push(findedPromocods[0]);
        arrFinded.shift();
        setUsedPromocods([...arrUsed]);
        setFindedPromocods([...arrFinded]);
        checkDiscount(arrUsed);
    }
    const deletePromo = () => {
        let arrUsed: string[] = [...usedPromocods];
        arrUsed.shift();
        let inputPromo: HTMLInputElement|null = document.querySelector('.promo-input');
        if(inputPromo){
            inputPromo.value = '';
        }
        setUsedPromocods([...arrUsed]);
        checkDiscount(arrUsed);
    }
    const checkDiscount = (arrUsed: string[]) => {
        let discountCoef: number = 1;
        discountCoef = 1 - (arrUsed.length/10);
        setCoef(discountCoef)
    }
    const clickButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(setModal){
            setModal();
        }
    }
    const showUsedPromocods = () => {
        return usedPromocods.map((v) => {
            return <p>'{v}':10%</p>;
        })
    }
    return(
        <>
        <div className = "summary-body">
            <h2>Products:<span>{prodsNumber}</span></h2>
            <h2>Total:{coef < 1 && <span className='initial-sum'>€{(prodsAmount/coef).toFixed(2)}</span>}<span>€{prodsAmount.toFixed(2)}</span></h2>
            <form>
                <input type = "text" placeholder="Enter promo code" className="promo-input" onInput={(event) => checkPromocode(event)}/>
                <p>Promo for test: 'RS', 'EPM'</p>
                {findedPromocods.length > 0 && <button onClick={addPromo} type = "button">add promo</button>}
                {usedPromocods.length > 0 && <button onClick={deletePromo} type = "button">delete promo</button>}
                {usedPromocods.length > 0 && <p>Used promocods</p>}
                {usedPromocods.length > 0 && showUsedPromocods()}
                <button onClick={clickButton} type = "button">BUY NOW</button>
            </form>
        </div>
        </>
    )
}

export default BasketSummary;