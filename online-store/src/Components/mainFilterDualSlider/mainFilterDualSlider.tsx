import './mainFilterDualSlider.scss';

interface ISlider {
    title: string,
    minValue: number,
    maxValue: number
}

const MainFilterDualSlider = ({title,minValue,maxValue}:ISlider) => {
    let minValueChange = title === 'Price' ? `$${minValue}.00` : minValue;
    let maxValueChange = title === 'Price' ? `$${maxValue}.00` : maxValue;
    return (
        <div className='slider'>
            <h3 className="slider__title">{title}</h3>
            <hr />
            <div className="slider__items">
                <div className="slider__items__from">{minValueChange}</div>
                <div>&harr;</div>
                <div className="slider__items__to">{maxValueChange}</div>
            </div>
            <div className='slider__controls'>
                <input id="fromSlider" name='from' type="range"  min="0" max="100" />
                <input id="toSlider" name='to' type="range"  min="0" max="100" />
            </div>
        </div>
    );
}

export default MainFilterDualSlider;