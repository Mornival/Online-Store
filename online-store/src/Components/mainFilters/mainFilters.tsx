import { ReactNode } from 'react';
import './mainFilters.scss';

const MainFilters = ({children}:{children: ReactNode}) => {
    return (
        <div className='filters'>
            <div className="filters__buttons">
                <button className='filters__buttons__reset'>
                    Reset Filters
                </button>
                <button className='filters__buttons__copy-link'>
                    Copy Link
                </button>
            </div>
            {children}
        </div>
    );
}

export default MainFilters