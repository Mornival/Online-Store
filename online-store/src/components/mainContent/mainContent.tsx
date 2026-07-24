import { ReactNode, useState, useEffect, createContext } from 'react';
import './mainContent.scss';

export const FilterDrawerContext = createContext<{
    open: boolean;
    setOpen: (v: boolean) => void;
}>({ open: false, setOpen: () => {} });

const MainContent = ({renderFilters, children}:{renderFilters: () => ReactNode, children: ReactNode}) => {
    const [filtersOpen, setFiltersOpen] = useState(false);

    useEffect(() => {
        if (filtersOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [filtersOpen]);

    return (
        <FilterDrawerContext.Provider value={{ open: filtersOpen, setOpen: setFiltersOpen }}>
        <div className='content'>
            <div className="container">
                <div className="content__filters-desktop">
                    {renderFilters()}
                </div>
                {children}
            </div>

            {filtersOpen && <div className="content__overlay" onClick={() => setFiltersOpen(false)} />}

            <div className={`content__drawer ${filtersOpen ? 'content__drawer--open' : ''}`}>
                <div className="content__drawer-header">
                    <h3>Фильтры</h3>
                    <button className="content__drawer-close" onClick={() => setFiltersOpen(false)}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    </button>
                </div>
                <div className="content__drawer-body">
                    {renderFilters()}
                </div>
            </div>
        </div>
        </FilterDrawerContext.Provider>
    );
}

export default MainContent;