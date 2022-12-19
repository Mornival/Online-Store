import './mainProductsItem.scss';

interface ICard {
    key?: number,
    title: string,
    price: number,
    discountPercentage: number,
    rating: number,
    stock: number,
    brand: string,
    category: string,
    thumbnail: string

}

const MainProductsItem = ({title,price,discountPercentage, rating, stock, brand, category, thumbnail}:ICard) => {
    return (
        <div style={{'backgroundImage': `url('${thumbnail}')`}} className="card">
            <div className="card__title">{title}</div>
            <div className="card__data">
                <div>Category:  <span>{category}</span></div>
                <div>Brand:  <span>{brand}</span></div>
                <div>Price:  <span>{price}</span></div>
                <div>Discount:  <span>{discountPercentage}</span></div>
                <div>Rating:  <span>{rating}</span></div>
                <div>Stock:  <span>{stock}</span></div>
            </div>
            <div className="card__buttons">
                <button>ADD TO CART</button>
                <button>DETAILS</button>
            </div>
        </div>
    );
}

export default MainProductsItem;

