import './mainFooter.scss';
import { useEffect, useContext , useState } from 'react';
import ContextCart from '../context/contextCart';

interface IDataStyle  {
    [index:string]:string
}

const MainFooter = () => {
    const url = window.location.pathname;
    const [dataStyle, setDataStyle] = useState<IDataStyle>({});
    const {dataCart} = useContext(ContextCart);
    function changeDataStyle():void {
        const HREF = window.location.href;
        const goods = document.querySelectorAll(".good-body");
        if(HREF.includes('basket') && goods.length <= 6) {
            setDataStyle({
                'position':'absolute',
                'width': '100%',
                'bottom':'0'
            });
        } else {
            setDataStyle({});
        }
    }
    useEffect(()=>{
        changeDataStyle();
    },[dataCart,url]);
    
    return (
        <footer style={dataStyle} className='footer'>
            Online Store 2022 Grushevskiy & Eroshenko &copy;
        </footer>
    );
}

export default MainFooter;