import { ReactNode, useContext, useState } from 'react';
import './mainFilters.scss';
import ContextFilter from '../context/contextFilter';
import ContextSlider from '../context/contextSlider';
import ContextSearchPanel from '../context/contextSearchPanel';
import ContextSort from '../context/contextSort';
import { defaultStateFilter } from '../context/contextFilter';
import { defaultStateSlider } from '../context/contextSlider';
import { defaultStateSearchPanel } from '../context/contextSearchPanel';
import { defaultStateSort } from '../context/contextSort';
import qs from 'qs';
import { useSearchParams } from 'react-router-dom';

const MainFilters = ({children}:{children: ReactNode}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const {setDataFilter} = useContext(ContextFilter);
    const {setDataSlider} = useContext(ContextSlider);
    const {setDataSearchPanel} = useContext(ContextSearchPanel);
    const {setDataSort} = useContext(ContextSort);
    const {dataFilter} = defaultStateFilter;
    const {dataSlider} = defaultStateSlider;
    const {dataSearchPanel} = defaultStateSearchPanel;
    const {dataSort} = defaultStateSort;
    const [copy, setCopy] = useState(false);
    function onUpdateFilter() {
        defaultStateElements();
        setDataFilter(dataFilter);
        setDataSlider(dataSlider);
        setDataSearchPanel(dataSearchPanel);
        setDataSort(dataSort);
        setSearchParams('')
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

    function CopyLink() {
        navigator.clipboard.writeText(window.location.href)
        .then(()=>{
            setCopy(prev=>!copy);
            setTimeout(()=> {
                setCopy(prev=>!prev)
            },1000);
        })
        .catch(err => {
            alert("Failed with copy")
        })
    }

    return (
        <div className='filters'>
            <div className="filters__buttons">
                <button onClick={onUpdateFilter} className='filters__buttons__reset'>
                    Reset Filters
                </button>
                <button onClick={CopyLink}  className='filters__buttons__copy-link'>
                    {copy? 'Copied..' : 'Copy Link'}
                </button>
            </div>
            {children}
        </div>
    );
}

export default MainFilters