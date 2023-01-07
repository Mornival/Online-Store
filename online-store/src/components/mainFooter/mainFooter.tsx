import './mainFooter.scss';

const MainFooter = () => {
    // const path = window.location.pathname;

    // function resizeFooter() {
    //     const  footer = document.querySelector('.footer') as HTMLElement;

    //     if( window.innerHeight - 24  > document.body.scrollHeight) {
    //     const footer = document.querySelector('.footer') as HTMLElement;
    //     const page404 = document.querySelector('.page404-div') as HTMLElement;
    //     if (window.innerHeight - 24 > document.body.scrollHeight || !page404) {
    //         footer.style.position = `absolute`;
    //         footer.style.bottom = `0`;
    //     } else {
    //         footer.style.position = 'relative';
    //     }
    // }

    // window.onclick = () => {
    //     resizeFooter();
    //     setInterval(resizeFooter,500);
    // }
    
    //     let intervalId;
    //     clearInterval(intervalId);
    //     resizeFooter();
    //     intervalId = setInterval(resizeFooter, 100);
    // }

    return (
        <footer className='footer'>
            Online Store 2022 Grushevskiy & Eroshenko &copy;
        </footer>
    );
}

export default MainFooter;
