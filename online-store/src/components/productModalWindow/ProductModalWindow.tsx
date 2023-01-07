import React from 'react';
import './ProductModalWindow.scss'
import { useContext, useState, useEffect } from 'react';
import ContextCart from '../context/contextCart';
import ModalContext from '../context/OtherContexts';


function ProductModal() {
    let { setModal } = useContext(ModalContext);
    const { dataCart, setDataCart } = useContext(ContextCart);
    const submitHandler = (event: React.FormEvent) => {
        if (setModal && formValid) {
            console.log(formValid);
        }
    }
    const submitOutBody = (event: React.MouseEvent<HTMLDivElement>) => {
        if (setModal && !endShop) setModal();
    }
    const [endShop, setEndShop] = useState(false);
    const [name, setName] = useState('');
    const [nameDirty, setNameDirty] = useState(false);
    const [nameError, setNameError] = useState('Name cannot be empty!');
    const [adress, setAdress] = useState('');
    const [adressDirty, setAdressDirty] = useState(false);
    const [adressError, setAdressError] = useState('Adress cannot be empty!');
    const [telephone, setTelephone] = useState('');
    const [telephoneDirty, setTelephoneDirty] = useState(false);
    const [telephoneError, setTelephoneError] = useState('Phone cannot be empty!');
    const [email, setEmail] = useState('');
    const [emailDirty, setEmailDirty] = useState(false);
    const [emailError, setEmailError] = useState('Email cannot be empty!');
    const [cardNumber, setCardNumber] = useState('');
    const [cardNumberDirty, setCardNumberDirty] = useState(false);
    const [cardNumberError, setCardNumberError] = useState('Card Number cannot be empty!');
    const [validThru, setValidThru] = useState('');
    const [validThruDirty, setValidThruDirty] = useState(false);
    const [validThruError, setValidThruError] = useState('Valid THRU cannot be empty!');
    const [cvv, setCvv] = useState('');
    const [cvvDirty, setCvvDirty] = useState(false);
    const [cvvError, setCvvError] = useState('CVV cannot be empty!');
    const [formValid, setFormValid] = useState(false);
    const cvvHandler = (e: React.FormEvent<HTMLInputElement>) => {
        if (e.currentTarget.value.charCodeAt((e.currentTarget.value.length - 1)) < 48 ||
            e.currentTarget.value.charCodeAt((e.currentTarget.value.length - 1)) > 57) {
            e.currentTarget.value = e.currentTarget.value.substring(0, e.currentTarget.value.length - 1);
        }
        setCvv(e.currentTarget.value);
        const validThruReg: RegExp = /[0-9]{3}/;
        if (e.currentTarget.value.length === 0) {
            setCvvError('CVV cannot be empty!');
        } else if (!validThruReg.test(e.currentTarget.value.toString().toLowerCase())) {
            setCvvError('Incorrect CVV!');
        } else {
            setCvvError('');
        }
    }
    const validThruHandler = (e: React.FormEvent<HTMLInputElement>) => {
        if (e.currentTarget.selectionStart === e.currentTarget.value.length) {
            if (e.currentTarget.value.length === 5 && e.currentTarget.value[4] === ' ') {
                e.currentTarget.value = e.currentTarget.value.substring(0, 2);
            }
            if ((e.currentTarget.value.charCodeAt((e.currentTarget.value.length - 1)) < 48 ||
                e.currentTarget.value.charCodeAt((e.currentTarget.value.length - 1)) > 57)) {
                e.currentTarget.value = e.currentTarget.value.substring(0, e.currentTarget.value.length - 1);
            } else if (e.currentTarget.value[3] != '/' && e.currentTarget.value.length > 2) {
                let str: string = e.currentTarget.value.substring(0, 2);
                str += ' / ';
                str += e.currentTarget.value.substring(2, e.currentTarget.value.length);
                e.currentTarget.value = str;
            }
        } else {
            e.currentTarget.selectionStart = e.currentTarget.selectionEnd = e.currentTarget.value.length;
            e.currentTarget.value = validThru;
        }
        setValidThru(e.currentTarget.value);
        const validThruReg: RegExp = /^(0[1-9]|1[0-2])\W\W\W([0-9]{4}|[0-9]{2})$/;
        if (e.currentTarget.value.length === 0) {
            setValidThruError('Valid THRU cannot be empty!');
        } else if (!validThruReg.test(e.currentTarget.value.toString().toLowerCase())) {
            setValidThruError('Incorrect Valid THRU!');
        } else {
            setValidThruError('');
        }
    }
    const nameHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value);
        const nameReg: RegExp = /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/;
        if (e.currentTarget.value.length === 0) {
            setNameError('Name cannot be empty!');
        } else if (!nameReg.test(e.currentTarget.value.toString().toLowerCase())) {
            setNameError('Incorrect name!');
        } else {
            setNameError('');
        }
    }
    const cardNumberHandler = (e: React.FormEvent<HTMLInputElement>) => {
        if (e.currentTarget.selectionStart === e.currentTarget.value.length) {
            if ((e.currentTarget.value.charCodeAt((e.currentTarget.value.length - 1)) < 48 ||
                e.currentTarget.value.charCodeAt((e.currentTarget.value.length - 1)) > 57) &&
                e.currentTarget.value[e.currentTarget.value.length - 1] !== ' ') {
                e.currentTarget.value = e.currentTarget.value.substring(0, e.currentTarget.value.length - 1);
            } else if (cardNumber[cardNumber.length - 1] === ' ' &&
                       cardNumber.length > e.currentTarget.value.length) {
                e.currentTarget.value = e.currentTarget.value.substring(0, e.currentTarget.value.length - 1);
            }
            if (e.currentTarget.value.length > cardNumber.length) {
                if ((e.currentTarget.value.length % 5 === 4 && e.currentTarget.value.length > 6 || e.currentTarget.value.length === 4) &&
                    e.currentTarget.value.length != 19) {
                    e.currentTarget.value += ' ';
                }
            }
        } else {
            e.currentTarget.selectionStart = e.currentTarget.selectionEnd = e.currentTarget.value.length;
            e.currentTarget.value = cardNumber;
        }
        setCardNumber(e.currentTarget.value);
        const cardReg: RegExp = /[0-9]{4}\W[0-9]{4}\W[0-9]{4}\W[0-9]{4}/;
        const logoElem: HTMLImageElement | null = document.querySelector('.logo-image');
        if (logoElem) {
            if (e.currentTarget.value[0] === '2') {
                logoElem.src = "https://toplogos.ru/images/thumbs/preview-logo-mir.png";
            } else if (e.currentTarget.value[0] === '4') {
                logoElem.src = "https://toplogos.ru/images/thumbs/preview-logo-visa.pn";
            } else if (e.currentTarget.value[0] === '5') {
                logoElem.src = "https://toplogos.ru/images/thumbs/preview-logo-mastercard.png";
            } else {
                logoElem.src = "https://us.123rf.com/450wm/muslumstock/muslumstock1808/muslumstock180800818/106702932-id-card-icon-vector-isolated-on-white-background-for-your-web-and-mobile-app-design-id-card-logo-con.jpg?ver=6";
            }
        }
        if (e.currentTarget.value.length === 0) {
            setCardNumberError('Card number cannot be empty!');
        } else if (!cardReg.test(e.currentTarget.value.toString().toLowerCase())) {
            setCardNumberError('Incorrect card number!');
        } else {
            setCardNumberError('');
        }
    }
    const adressHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setAdress(e.currentTarget.value);
        const adressReg = /[a-z]{5,20}\W{1,3}[a-z]{5,20}\W{1,3}[a-z]{5,20}/;
        if (e.currentTarget.value.length === 0) {
            setAdressError('Adress cannot be empty!');
        } else if (!adressReg.test(e.currentTarget.value.toString().toLowerCase())) {
            setAdressError('Incorrect adress!');
        } else {
            setAdressError('');
        }
    }
    const emailHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value);
        const emReg = /^(([^<>()[\].,;:\s@']+(\.[^<>()[\].,;:\s@']+)*)|('.+'))@(([^<>()[\].,;:\s@']+\.)+[^<>()[\].,;:\s@']{2,})$/iu;
        if (e.currentTarget.value.length === 0) {
            setEmailError('Email cannot be empty!');
        } else if (!emReg.test(e.currentTarget.value.toString().toLowerCase())) {
            setEmailError('Incorrect email!');
        } else {
            setEmailError('');
        }
    }
    const telHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setTelephone(e.currentTarget.value);
        const telReg = /[+](\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/;
        if (e.currentTarget.value.length === 0) {
            setTelephoneError('Phone cannot be empty!');
        } else if (!telReg.test(e.currentTarget.value.toString().toLowerCase())) {
            setTelephoneError('Incorrect phone!');
        } else {
            setTelephoneError('');
        }
    }
    const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.currentTarget.name === 'email') {
            setEmailDirty(true);
        } else if (e.currentTarget.name === 'tel') {
            setTelephoneDirty(true);
        } else if (e.currentTarget.name === 'name') {
            setNameDirty(true);
        } else if (e.currentTarget.name === 'adress') {
            setAdressDirty(true);
        } else if (e.currentTarget.name === 'cardNumber') {
            setCardNumberDirty(true);
        } else if (e.currentTarget.name === 'validThru') {
            setValidThruDirty(true);
        } else if (e.currentTarget.name === 'cvv') {
            setCvvDirty(true);
        }
    }
    const endShopping = () => {
        if (setModal) {
            setModal();
            setEndShop(false);
            setDataCart([]);
        }
    }
    const clickConfirm = () => {
        setNameDirty(true);
        setTelephoneDirty(true);
        setAdressDirty(true);
        setEmailDirty(true);
        setCardNumberDirty(true);
        setValidThruDirty(true);
        setCvvDirty(true);
        if (formValid) {
            setEndShop(true);
            setTimeout(endShopping, 3000);
        }
    }
    useEffect(() => {
        if (emailError || telephoneError || nameError || adressError || cardNumberError || validThruError || cvvError) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [emailError, telephoneError, nameError, adressError, cardNumberError, validThruError, cvvError]);
    return (
        <>
            <div onClick={submitOutBody} className='modal-outbody'></div>
            {!endShop && <div className='modal-body'>
                <form action='#' onSubmit={submitHandler}>
                    <h2>Personal Details</h2>
                    <p>firstname and surname</p>
                    <div className='input-block'>
                        <input required onInput={e => nameHandler(e)} onBlur={e => blurHandler(e)} name='name' value={name} className='input' type='text' placeholder='Firstname Surname' />
                        {(nameDirty && nameError) && <p className='error-message'>{nameError}</p>}
                    </div>
                    <p>phone</p>
                    <div className='input-block'>
                        <input required onInput={e => telHandler(e)} onBlur={e => blurHandler(e)} name='tel' maxLength={13} minLength={9} value={telephone} className='input' type='tel' placeholder='+375441234567' />
                        {(telephoneDirty && telephoneError) && <p className='error-message'>{telephoneError}</p>}
                    </div>
                    <p>delivery adress</p>
                    <div className='input-block'>
                        <input required onInput={e => adressHandler(e)} onBlur={e => blurHandler(e)} name='adress' value={adress} className='input' type='text' placeholder='Belarus, Minsk, Nikiforova' />
                        {(adressDirty && adressError) && <p className='error-message'>{adressError}</p>}
                    </div>
                    <p>email</p>
                    <div className='input-block'>
                        <input required onInput={e => emailHandler(e)} onBlur={e => blurHandler(e)} name='email' value={email} className='input' type='email' placeholder='lolkek@gmail.com' />
                        {(emailDirty && emailError) && <p className='error-message'>{emailError}</p>}
                    </div>
                    <input required onInput={e => cardNumberHandler(e)} onBlur={e => blurHandler(e)} name='cardNumber' maxLength={19} value={cardNumber} className='input card-number' type='text' placeholder='Card number' />
                    <input required onInput={e => validThruHandler(e)} onBlur={e => blurHandler(e)} name='validThru' maxLength={7} value={validThru} className='input valid' type='text' placeholder='Valid Thru' />
                    <input required onInput={e => cvvHandler(e)} onBlur={e => blurHandler(e)} name='cvv' maxLength={3} value={cvv} className='input cvv' type='text' placeholder='Code' />
                    <h2 className='modal-credit-h2'>Credit card details</h2>
                    <div className='card-info'>
                        <p className='p-valid'>Valid Thru</p>
                        <p className='p-cvv'>CVV</p>
                        <div className='card-logo'>
                            <img className="logo-image" src="https://us.123rf.com/450wm/muslumstock/muslumstock1808/muslumstock180800818/106702932-id-card-icon-vector-isolated-on-white-background-for-your-web-and-mobile-app-design-id-card-logo-con.jpg?ver=6" />
                        </div>
                    </div>
                    {(cardNumberDirty && cardNumberError) && <p className='error-message-block'>{cardNumberError}</p>}
                    {(validThruDirty && validThruError) && <p className='error-message-block'>{validThruError}</p>}
                    {(cvvDirty && cvvError) && <p className='error-message-block'>{cvvError}</p>}
                    <button onClick={clickConfirm} type='button'>Confirm</button>
                </form>
            </div>}
            {endShop &&
                <div className="end-shop-div">
                    <h2 className="end-shop-h2">Yor order is being processed...</h2>
                </div>}
        </>)
}

export default ProductModal;