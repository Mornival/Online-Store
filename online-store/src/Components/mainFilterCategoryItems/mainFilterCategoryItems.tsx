import './mainFilterCategoryItems.scss';

const MainFilterCategoryItems = ({category, index}:{category:string, index: number}) =>{
    return (
        <div className="category__item">
            <input id={`${index}`} type="checkbox" />
            <label htmlFor={`${index}`}>{category}</label>
            <div className='category__item__count'>
                (<span className='count'>5</span>/<span className='from'>5</span>)
            </div>
        </div>
    );
}

export default MainFilterCategoryItems;