import { IProduct } from "../../types/OtherPagesTypes"
import './BasketGood.scss'
interface PropsProduct{
    product: IProduct
}

function BasketGood(props: PropsProduct){
    return(
        <div className = "good-body">
            <div className="good-id">{props.product.id}</div>
            <div className = "good-image">
                <img src = {props.product.images[0]} alt = "good"/>
            </div>
            <div className = "good-info">
                <h2>{props.product.title}</h2>
                <p>{props.product.description}</p>
                <div className = "good-info__rat-dis">
                    <p>Rating: {props.product.rating}</p>
                    <p>Discount: {props.product.discountPercentage}%</p>
                </div>
            </div>
            <div className = "good-other-info">
                <h2 className = "good-other-info__h2">Stock: {props.product.stock}</h2>
                <div className="good-amount">
                    <div className = "good-amount__plus">+</div>
                    <h2 className = "good-amount__amount">1</h2>
                    <div className = "good-amount__minus">-</div>
                </div>
                <h2>€{props.product.price}</h2>
            </div>
        </div>
    )
}

export default BasketGood