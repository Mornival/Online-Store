import './mainFilterBrandItems.scss';

const MainFilterBrandItems = ({brand, index}:{brand:string, index:number}) =>{
    return (
        <div className="brand__item">
            <input id={`${index}b`}  type="checkbox" />
            <label htmlFor={`${index}b`}>{brand}</label>
            <div className='category__item__count'>
                (<span className='count'>5</span>/<span className='from'>5</span>)
            </div>
        </div>
    );
}

export default MainFilterBrandItems;