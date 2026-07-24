import { ReactNode } from 'react';
import './mainFilters.scss';
import { useSearchParams } from 'react-router-dom';

const MainFilters = ({children}:{children: ReactNode}) => {
    const [, setSearchParams] = useSearchParams();

    function onResetFilters() {
        setSearchParams('');

        // Reset search input
        const searchInput = document.querySelector('.products__header__search input') as HTMLInputElement;
        if (searchInput) searchInput.value = '';

        // Reset checkboxes
        document.querySelectorAll('.category__item input').forEach((el) => {
            (el as HTMLInputElement).checked = false;
        });
        document.querySelectorAll('.brand__item input').forEach((el) => {
            (el as HTMLInputElement).checked = false;
        });
    }

    return (
        <div className='filters'>
            <button onClick={onResetFilters} className='filters__reset'>
                Сбросить фильтры
            </button>
            {children}
        </div>
    );
}

export default MainFilters
