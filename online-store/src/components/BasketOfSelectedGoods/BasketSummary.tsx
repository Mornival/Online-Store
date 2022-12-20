import './BasketSummary.scss'
import { IProduct } from "../../types/OtherPagesTypes"

interface PropsProds{
    prods: IProduct[];
}
function BasketSummary(props: PropsProds){
    let prodsNumber: number = 0;
    let prodsAmount: number = 0;
    (props.prods.forEach((v) => {
        prodsNumber++;
        prodsAmount += v.price;
    }));
    console.log(prodsAmount);
    return(
        <div className = "summary-body">
            <h2>Products:<span>{prodsNumber}</span></h2>
            <h2>Total:<span>€{prodsAmount}</span></h2>
            <form>
                <input type = "text" placeholder="Enter promo code"/>
                <p>Promo for test: 'RS', 'EPM'</p>
                <button type = "button">BUY NOW</button>
            </form>
        </div>
    )
}

export default BasketSummary;