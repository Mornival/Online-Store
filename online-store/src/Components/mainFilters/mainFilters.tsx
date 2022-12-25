import { ReactNode, useContext } from 'react';
import './mainFilters.scss';
import ContextFilter from '../context/contextFilter';
import ContextSlider from '../context/contextSlider';
import ContextSearchPanel from '../context/contextSearchPanel';
import ContextSort from '../context/contextSort';
import { defaultStateFilter } from '../context/contextFilter';
import { defaultStateSlider } from '../context/contextSlider';
import { defaultStateSearchPanel } from '../context/contextSearchPanel';
import { defaultStateSort } from '../context/contextSort';

const MainFilters = ({children}:{children: ReactNode}) => {
    const {setDataFilter} = useContext(ContextFilter);
    const {setDataSlider} = useContext(ContextSlider);
    const {setDataSearchPanel} = useContext(ContextSearchPanel);
    const {setDataSort} = useContext(ContextSort);
    const {dataFilter} = defaultStateFilter;
    const {dataSlider} = defaultStateSlider;
    const {dataSearchPanel} = defaultStateSearchPanel;
    const {dataSort} = defaultStateSort;
    function onUpdateFilter() {
        defaultStateElements();
        setDataFilter(dataFilter);
        setDataSlider(dataSlider);
        setDataSearchPanel(dataSearchPanel);
        setDataSort(dataSort);
    }

    function defaultStateElements() {
        const searchPanelInput = document.querySelector('.products__header__search input') as HTMLInputElement;
        const selectSort = document.querySelector('.default-select') as HTMLOptionElement;
        const categoryInputs = document.querySelectorAll('.category__item input') as NodeListOf<HTMLInputElement>;
        const brandInputs = document.querySelectorAll('.brand__item input') as NodeListOf<HTMLInputElement>;

        searchPanelInput.value = '';
        selectSort.selected = true;
        categoryInputs.forEach(item => { item.checked = false; });
        brandInputs.forEach(item => { item.checked = false; });
    }

    return (
        <div className='filters'>
            <div className="filters__buttons">
                <button onClick={onUpdateFilter} className='filters__buttons__reset'>
                    Reset Filters
                </button>
                <button  className='filters__buttons__copy-link'>
                    Copy Link
                </button>
            </div>
            {children}
        </div>
    );
}

export default MainFilters