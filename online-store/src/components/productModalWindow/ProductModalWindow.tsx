import React from 'react';
import './ProductModalWindow.scss'
import { useContext} from 'react';
import ModalContext from '../context/OtherContexts';


function ProductModal() {
    let {setModal} = useContext(ModalContext);
    const submitHandler = (event: React.FormEvent) =>{
        event.preventDefault();
        if(setModal) setModal();
    }
    const submitOutBody = (event: React.MouseEvent<HTMLDivElement>) =>{
        if(setModal) setModal();
    }
    return (
        <>
            <div onClick = {submitOutBody} className="modal-outbody"></div>
            <div className="modal-body">
                <form action="#" onSubmit={submitHandler}>
                    <h2>Personal Details</h2>
                    <input required className="input" type="text" placeholder="Name" />
                    <input required className="input" type="tel" placeholder="+375441234567" />
                    <input required className="input" type="text" placeholder="Minsk, Nikiforova, 9a" />
                    <input required className="input" type="email" placeholder="lolkek@gmail.com" />
                    <input required className="input card-number" type="text" placeholder="Card number" />
                    <input required className="input valid" type="text" placeholder="Valid Thru" />
                    <input required className="input cvv" type="text" placeholder="Code" />
                    <h2 className="modal-credit-h2">Credit card details</h2>
                    <div className="card-info">
                        <p className="p-valid">Valid Thru</p>
                        <p className="p-cvv">CVV</p>
                    </div>
                    <button type="submit">Confirm</button>
                </form>
            </div>
        </>)
}

export default ProductModal;