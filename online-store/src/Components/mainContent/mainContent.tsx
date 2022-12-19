import { ReactNode } from 'react';
import './mainContent.scss';

const MainContent = ({children}:{children: ReactNode}) => {
    return (
        <div className='content'>
            <div className="container">
                {children}
            </div>
        </div>
    );
}

export default MainContent;